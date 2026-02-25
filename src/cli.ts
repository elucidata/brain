#!/usr/bin/env bun
import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { milestoneCommand } from "./commands/milestone.js";
import { stageCommand } from "./commands/stage.js";
import { issueCommand } from "./commands/issue.js";
import { statusCommand } from "./commands/status.js";
import { uiCommand } from "./commands/ui.js";
import { brainExists } from "./lib/fs.js";

const program = new Command();

program
  .name("brain")
  .description("🧠 Agentic AI-first development workflow manager")
  .version("0.1.0");

// Default action (no subcommand) → launch TUI if brain exists, else show help
program.action(() => {
  if (brainExists()) {
    const { launchTUI } = require("./tui/app.js");
    launchTUI();
  } else {
    program.help();
  }
});

program.addCommand(initCommand);
program.addCommand(milestoneCommand);
program.addCommand(stageCommand);
program.addCommand(issueCommand);
program.addCommand(statusCommand);
program.addCommand(uiCommand);

program.parse();