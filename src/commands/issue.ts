import { Command } from "commander";
import chalk from "chalk";
import matter from "gray-matter";
import { brainPath, brainExists, listFiles, listDirs, readMarkdown, writeFile } from "../lib/fs.js";
import { addToInbox, readIssuesFile } from "../lib/issues.js";
import { nextStageId } from "../lib/ids.js";
import { readState } from "../lib/state.js";

export const issueCommand = new Command("issue")
  .description("Manage issues");

issueCommand
  .command("add")
  .argument("<msg>", "Short issue description")
  .description("Add a quick issue to the inbox")
  .action((msg: string) => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }
    addToInbox(msg);
    console.log(chalk.green(`✓ Added to inbox: ${msg}`));
  });

issueCommand
  .command("list")
  .description("Show all issues")
  .action(() => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }
    console.log(readIssuesFile());
  });

issueCommand
  .command("check")
  .argument("<id>", "Issue ID (e.g. 001)")
  .description("Validate a researched issue file's structure")
  .action((id: string) => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }

    const files = listFiles(brainPath("issues"), ".md");
    const match = files.find((f) => f.startsWith(id));

    if (!match) {
      console.log(chalk.red(`✗ No issue file found for ID ${id}`));
      process.exit(1);
    }

    const filePath = brainPath("issues", match);
    const { data, content } = readMarkdown(filePath);
    const errors: string[] = [];

    if (!data.number) errors.push("Missing frontmatter: number");
    if (!data.status) errors.push("Missing frontmatter: status");
    if (!data.created) errors.push("Missing frontmatter: created");

    const validStatuses = ["RESEARCHED", "STAGED", "FIXED"];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push(`Invalid status "${data.status}". Expected: ${validStatuses.join(", ")}`);
    }

    if (!content.includes("## Original Report")) errors.push("Missing section: ## Original Report");
    if (!content.includes("## Research Findings")) errors.push("Missing section: ## Research Findings");

    if (errors.length > 0) {
      console.log(chalk.red(`✗ Issue ${id} has ${errors.length} problem(s):`));
      for (const e of errors) {
        console.log(chalk.red(`  - ${e}`));
      }
      process.exit(1);
    } else {
      console.log(chalk.green(`✓ Issue ${id} (${match}) is valid.`));
    }
  });

issueCommand
  .command("stage")
  .argument("<ids...>", "Issue ID(s) to create a fix stage for")
  .description("Create a stage to address one or more issues")
  .action((ids: string[]) => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }

    const summaries: string[] = [];
    for (const id of ids) {
      const files = listFiles(brainPath("issues"), ".md");
      const match = files.find((f) => f.startsWith(id));
      if (!match) {
        console.log(chalk.red(`✗ No issue file found for ID ${id}`));
        process.exit(1);
      }
      summaries.push(`${id}: ${match.replace(/^\d+_/, "").replace(/-/g, " ").replace(/\.md$/, "")}`);
    }

    const state = readState();
    if (!state.current_milestone) {
      console.log(chalk.red("✗ No active milestone."));
      process.exit(1);
    }

    const dirs = listDirs(brainPath("milestones"));
    const milDir = dirs.find((d: string) => d.startsWith(state.current_milestone!));
    if (!milDir) {
      console.log(chalk.red("✗ Milestone directory not found."));
      process.exit(1);
    }

    const name = ids.length === 1
      ? `fix-issue-${ids[0]}`
      : `fix-issues-${ids.join("-")}`;

    const stageId = nextStageId(milDir);
    const fileName = `${stageId}_${name}.md`;
    const filePath = brainPath("milestones", milDir, fileName);

    const issueRefs = ids.map((id) => `- Issue ${id}`).join("\n");

    const template = `---
id: "${stageId}"
status: pending
fixes: [${ids.map((id) => `"${id}"`).join(", ")}]
---
# Fix: ${summaries.join(", ")}

## Related Issues
${issueRefs}

## Objective
Address the issues listed above.

## Tasks
-

## Acceptance Criteria
- All related issues pass their fix verification
-

## Notes

`;

    writeFile(filePath, template);

    // Update issue statuses to STAGED
    for (const id of ids) {
      const files = listFiles(brainPath("issues"), ".md");
      const match = files.find((f: string) => f.startsWith(id));
      if (match) {
        const fp = brainPath("issues", match);
        const { data, content } = readMarkdown(fp);
        data.status = "STAGED";
        writeFile(fp, matter.stringify(content, data));
      }
    }

    console.log(chalk.green(`✓ Created fix stage ${stageId} for issue(s): ${ids.join(", ")}`));
    console.log(`  ${filePath}`);
  });