# Brain

An agentic, AI-first development workflow manager. Brain gives structure to AI-assisted coding sessions by organizing work into **milestones**, **stages**, and **issues** — all stored as plain Markdown files in a `_brain/` directory at the root of your project.

## Why Brain?

AI coding assistants like Claude Code are powerful but work best with clear, structured context. Brain solves this by providing:

- **Persistent project state** that survives across sessions — no re-explaining where you left off
- **Sequential stage specs** with tasks and acceptance criteria so the AI knows exactly what to build and when it's done
- **A lightweight issue tracker** that lives in your repo, not a separate tool
- **An interactive TUI dashboard** for a quick visual overview of progress

Everything is Markdown and YAML frontmatter. No database, no cloud service, no lock-in.

## Install

```bash
bun install
bun link
```

This makes the `brain` command available globally.

## Quick Start

```bash
# Scaffold the _brain/ directory in your project
brain init

# Create your first milestone and stage
brain milestone new "MVP"
brain stage new "Project scaffolding"

# Check progress at any time
brain status

# Launch the interactive dashboard
brain
```

`brain init` also generates a `CLAUDE.md` file that instructs Claude Code how to work with Brain — run `brain status` at session start, follow stages sequentially, log issues as they arise.

## Commands

| Command | Description |
|---|---|
| `brain` | Launch the TUI dashboard (or show help if not initialized) |
| `brain init` | Scaffold `_brain/` directory and `CLAUDE.md` |
| `brain status` | Print current milestone, stage, and issue summary |
| `brain milestone new "Name"` | Create a new milestone |
| `brain milestone list` | List all milestones and their stages |
| `brain stage new "Name"` | Add a stage to the current milestone |
| `brain stage done` | Mark current stage complete and advance |
| `brain issue add "description"` | Log a quick issue to the inbox |
| `brain issue list` | Show all issues |
| `brain issue check NNN` | Validate a researched issue file |
| `brain issue stage NNN [NNN...]` | Create a fix stage for one or more issues |

## Project Structure

After running `brain init`, your project gets a `_brain/` directory:

```
_brain/
  state.md              # Tracks current milestone and stage
  issues.md             # Inbox, researched, and won't-fix lists
  issues/               # Detailed researched issue files
  milestones/
    001_mvp/
      001-001_scaffolding.md    # Stage spec with tasks + acceptance criteria
      001-002_core-api.md
  rules/                # Project-specific conventions and style guides
```

## Issue Lifecycle

1. **Inbox** — Quick one-liner logged with `brain issue add`, stored in `_brain/issues.md`
2. **Researched** — Investigated and written up as a full file in `_brain/issues/NNN_slug.md` with root cause, affected files, and suggested fix
3. **Staged** — `brain issue stage NNN` creates a fix stage and marks the issue as staged
4. **Fixed** — Status updated after the fix stage is completed

## TUI Dashboard

Running `brain` with no arguments launches an interactive terminal UI with three tabs:

- **Dashboard** — Current milestone/stage, progress bar, issue counts
- **Milestones** — Browse milestones and drill into their stages
- **Issues** — View inbox items and researched issues with detail drill-in

Navigate with arrow keys or `h`/`j`/`k`/`l`. Press `q` to quit.

## Tech Stack

Bun, TypeScript, Commander, Ink + React, gray-matter, chalk.

## License

MIT
