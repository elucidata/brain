import { Command } from "commander";
import chalk from "chalk";
import { brainPath, brainExists, ensureDir, listDirs, listFiles } from "../lib/fs.js";
import { nextMilestoneId, slugify, parseIdPrefix } from "../lib/ids.js";
import { readState, writeState } from "../lib/state.js";

export const milestoneCommand = new Command("milestone")
  .description("Manage milestones");

milestoneCommand
  .command("new")
  .argument("<n>", "Milestone name")
  .description("Create a new milestone")
  .action((name: string) => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }

    const id = nextMilestoneId();
    const slug = slugify(name);
    const dirName = `${id}_${slug}`;
    const dirPath = brainPath("milestones", dirName);

    ensureDir(dirPath);

    const state = readState();
    if (!state.current_milestone) {
      state.current_milestone = id;
      writeState(state);
    }

    console.log(chalk.green(`✓ Created milestone ${id}: ${name}`));
    console.log(`  ${dirPath}`);
    console.log();
    console.log(`  Next: run ${chalk.cyan(`brain stage new "Your first stage"`)} to add stages.`);
  });

milestoneCommand
  .command("list")
  .description("List all milestones and their stages")
  .action(() => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }

    const state = readState();
    const dirs = listDirs(brainPath("milestones"));

    if (dirs.length === 0) {
      console.log(chalk.dim("No milestones yet. Run `brain milestone new` to create one."));
      return;
    }

    for (const dir of dirs) {
      const id = dir.split("_")[0];
      const name = dir.replace(/^\d+_/, "").replace(/-/g, " ");
      const isCurrent = id === state.current_milestone;
      const marker = isCurrent ? chalk.cyan(" ◀ current") : "";

      console.log(`${chalk.bold(id)} ${name}${marker}`);

      const stages = listFiles(brainPath("milestones", dir), ".md");
      for (const stage of stages) {
        const stageId = stage.split("_")[0];
        const stageName = stage.replace(/^\d+-\d+_/, "").replace(/-/g, " ").replace(/\.md$/, "");
        const isStageCurrent = stageId === state.current_stage;
        const stageMarker = isStageCurrent ? chalk.cyan(" ◀") : "";
        console.log(`  ${chalk.dim(stageId)} ${stageName}${stageMarker}`);
      }
      console.log();
    }
  });