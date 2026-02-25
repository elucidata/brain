import { Command } from "commander";
import chalk from "chalk";
import { brainPath, brainExists, listDirs, listFiles } from "../lib/fs.js";
import { readState } from "../lib/state.js";
import { readIssuesFile } from "../lib/issues.js";

export const statusCommand = new Command("status")
  .description("Show current brain state")
  .action(() => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }

    const state = readState();
    const issues = readIssuesFile();

    const inboxCount = (issues.match(/^- (?!\[)/gm) || []).length;
    const researchedFiles = listFiles(brainPath("issues"), ".md");
    const milestones = listDirs(brainPath("milestones"));

    console.log(chalk.bold("\n🧠 Brain Status\n"));

    if (state.current_milestone) {
      const milDir = milestones.find((d) => d.startsWith(state.current_milestone!));
      const milName = milDir?.replace(/^\d+_/, "").replace(/-/g, " ") ?? "Unknown";
      console.log(`  Milestone: ${chalk.cyan(state.current_milestone)} — ${milName}`);

      if (state.current_stage && milDir) {
        const stages = listFiles(brainPath("milestones", milDir), ".md");
        const stageFile = stages.find((f) => f.startsWith(state.current_stage!));
        const stageName = stageFile
          ?.replace(/^\d+-\d+_/, "")
          .replace(/-/g, " ")
          .replace(/\.md$/, "") ?? "Unknown";
        const stageIdx = stages.findIndex((f) => f.startsWith(state.current_stage!));

        console.log(`  Stage:     ${chalk.cyan(state.current_stage)} — ${stageName}`);
        console.log(`  Progress:  ${chalk.dim(`${stageIdx + 1} of ${stages.length} stages`)}`);
      } else {
        console.log(`  Stage:     ${chalk.dim("none")}`);
      }
    } else {
      console.log(`  Milestone: ${chalk.dim("none")}`);
    }

    console.log();
    console.log(`  Milestones: ${milestones.length}`);
    console.log(`  Inbox:      ${inboxCount > 0 ? chalk.yellow(String(inboxCount)) : chalk.dim("0")} issue(s)`);
    console.log(`  Researched: ${researchedFiles.length} issue(s)`);
    console.log();
  });