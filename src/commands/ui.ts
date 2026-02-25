import { Command } from "commander";
import chalk from "chalk";
import { brainExists } from "../lib/fs.js";
import { launchTUI } from "../tui/app.js";

export const uiCommand = new Command("ui")
  .description("Launch the interactive TUI dashboard")
  .action(() => {
    if (!brainExists()) {
      console.log(chalk.red("✗ _brain/ not found. Run `brain init` first."));
      process.exit(1);
    }
    launchTUI();
  });