import { Command } from "commander";
import chalk from "chalk";
import { brainPath, brainExists, writeFile, listFiles, listDirs, readFile } from "../lib/fs.js";
import { nextStageId, slugify } from "../lib/ids.js";
import { readState, writeState } from "../lib/state.js";

export const stageCommand = new Command("stage")
  .description("Manage stages within the current milestone");

function currentMilestoneDir(milestoneId: string): string | null {
  const dirs = listDirs(brainPath("milestones"));
  return dirs.find((d) => d.startsWith(milestoneId)) ?? null;
}

stageCommand
  .command("new")
  .argument("<n>", "Stage name")
  .description("Create a new stage spec in the current milestone")
  .action((name: string) => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }

    const state = readState();
    if (!state.current_milestone) {
      console.log(chalk.red("✗ No active milestone. Run `brain milestone new` first."));
      process.exit(1);
    }

    const milDir = currentMilestoneDir(state.current_milestone);
    if (!milDir) {
      console.log(chalk.red(`✗ Milestone directory for ${state.current_milestone} not found.`));
      process.exit(1);
    }

    const stageId = nextStageId(milDir);
    const slug = slugify(name);
    const fileName = `${stageId}_${slug}.md`;
    const filePath = brainPath("milestones", milDir, fileName);

    const template = `---
id: "${stageId}"
status: pending
---
# ${name}

## Objective


## Tasks
-

## Acceptance Criteria
-

## Notes

`;

    writeFile(filePath, template);

    if (!state.current_stage) {
      state.current_stage = stageId;
      writeState(state);
    }

    console.log(chalk.green(`✓ Created stage ${stageId}: ${name}`));
    console.log(`  ${filePath}`);
  });

stageCommand
  .command("done")
  .description("Mark the current stage as complete and advance")
  .action(() => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }

    const state = readState();
    if (!state.current_stage) {
      console.log(chalk.red("✗ No active stage."));
      process.exit(1);
    }
    if (!state.current_milestone) {
      console.log(chalk.red("✗ No active milestone."));
      process.exit(1);
    }

    const milDir = currentMilestoneDir(state.current_milestone);
    if (!milDir) {
      console.log(chalk.red("✗ Milestone directory not found."));
      process.exit(1);
    }

    const completedStage = state.current_stage;
    const stages = listFiles(brainPath("milestones", milDir), ".md");
    const currentIdx = stages.findIndex((f) => f.startsWith(completedStage));

    let stateBody = readFile(brainPath("state.md"));

    const completedLine = `- ${completedStage} ✓`;
    if (stateBody.includes("## Completed Stages")) {
      stateBody = stateBody.replace(
        "## Completed Stages",
        `## Completed Stages\n${completedLine}`
      );
    }

    if (currentIdx >= 0 && currentIdx < stages.length - 1) {
      const nextFile = stages[currentIdx + 1];
      const nextId = nextFile.split("_")[0];
      state.current_stage = nextId;
      console.log(chalk.green(`✓ Stage ${completedStage} complete.`));
      console.log(`  Next stage: ${chalk.cyan(nextId)}`);
    } else {
      state.current_stage = null;
      console.log(chalk.green(`✓ Stage ${completedStage} complete.`));
      console.log(chalk.yellow(`  Milestone ${state.current_milestone} has no more stages.`));
    }

    writeState(state, stateBody);
  });