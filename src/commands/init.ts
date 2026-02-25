import { resolve } from "path";
import { existsSync } from "fs";
import { Command } from "commander";
import chalk from "chalk";
import { brainPath, brainExists, ensureDir, writeFile } from "../lib/fs.js";
import { initState } from "../lib/state.js";
import { initIssuesFile } from "../lib/issues.js";
import { CLAUDE_MD_TEMPLATE } from "../lib/templates.js";

export const initCommand = new Command("init")
  .description("Scaffold the _brain/ folder structure and CLAUDE.md")
  .option("--no-claude-md", "Skip generating CLAUDE.md")
  .action((opts) => {
    if (brainExists()) {
      console.log(chalk.yellow("⚠  _brain/ already exists. Skipping init."));
      return;
    }

    ensureDir(brainPath("issues"));
    ensureDir(brainPath("milestones"));
    ensureDir(brainPath("rules"));

    initState();
    initIssuesFile();

    writeFile(
      brainPath("rules", "README.md"),
      `# Rules\n\nAdd project-specific rules and style guides here.\nClaude will reference these when working on stages.\n`
    );

    const claudeMdPath = resolve(process.cwd(), "CLAUDE.md");
    let wroteClaudeMd = false;
    if (opts.claudeMd !== false) {
      if (existsSync(claudeMdPath)) {
        console.log(chalk.yellow("⚠  CLAUDE.md already exists. Skipping. You can add the Brain section manually."));
      } else {
        writeFile(claudeMdPath, CLAUDE_MD_TEMPLATE);
        wroteClaudeMd = true;
      }
    }

    console.log(chalk.green("✓ _brain/ initialized"));
    console.log();
    console.log("  Created:");
    console.log("    _brain/issues.md");
    console.log("    _brain/state.md");
    console.log("    _brain/issues/");
    console.log("    _brain/milestones/");
    console.log("    _brain/rules/");
    if (wroteClaudeMd) {
      console.log("    CLAUDE.md");
    }
    console.log();
    console.log(`  Next: run ${chalk.cyan('brain milestone new "Your first milestone"')} to get started.`);
  });