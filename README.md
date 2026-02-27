# Brain

An agentic, AI-first development workflow manager for [Claude Code](https://docs.anthropic.com/en/docs/claude-code). Brain organizes your work into **milestones** and sequential **stages**, with built-in issue tracking — all stored as plain markdown files in a `_brain/` directory.

## Why Brain?

AI coding assistants are powerful but can lose focus across long sessions. Brain gives Claude Code a structured workflow so it always knows what to work on, what's been done, and what's next. Every piece of state is a version-controllable markdown file.

## Quick Start

1. **Install** — Clone or copy this repo into your [Claude Code skill directory](https://docs.anthropic.com/en/docs/claude-code/skills).

2. **Initialize** — Open a project in Claude Code and run:
   ```
   /brain-init
   ```
   This scaffolds the `_brain/` directory and updates your `CLAUDE.md`.

3. **Create a milestone and stage:**
   ```
   /brain-milestone-new "User Authentication"
   /brain-stage-new "Set up auth middleware"
   ```

4. **Fill in the stage spec** with an objective, tasks, and acceptance criteria.

5. **Do the work**, then mark it done:
   ```
   /brain-stage-done
   ```

6. **Check progress anytime:**
   ```
   /brain-status
   ```

## Commands

| Command | Description |
|---|---|
| `/brain-init` | Scaffold the `_brain/` folder structure |
| `/brain-status` | Show current milestone, stage, and issue counts |
| `/brain-milestone-new <name>` | Create a new milestone |
| `/brain-milestone-list` | List all milestones and stages with status |
| `/brain-stage-new <name>` | Create a stage in the current milestone |
| `/brain-stage-done` | Mark current stage complete and advance |
| `/brain-issue-add <description>` | Add a quick issue to the inbox |
| `/brain-issue-research <issue>` | Research an inbox item into a full issue file |
| `/brain-issue-stage <id(s)>` | Create a fix stage for researched issue(s) |

## Core Concepts

### Milestones

Large goals or features. Each milestone is a directory under `_brain/milestones/` containing one or more stages.

### Stages

Sequential spec files within a milestone. Each stage has an objective, a task list, and acceptance criteria that must be fully met before moving on. Stages are completed in order — no skipping.

### Issues

A two-tier tracking system:

- **Inbox** — Quick one-line notes captured in `_brain/issues.md`
- **Researched** — Full issue files with root cause analysis, affected files, and a suggested fix approach
- Issues can be promoted into **fix stages** to address them systematically

### State

All progress is tracked in `_brain/state.md` — the current milestone, current stage, and a log of completed stages. Claude Code reads this at the start of every session to pick up where it left off.

## Directory Structure

After initialization, your project will contain:

```
_brain/
├── state.md              # Current progress pointer
├── issues.md             # Issue inbox and index
├── issues/               # Researched issue files
├── milestones/           # Milestone directories
│   └── 001_my-feature/
│       ├── 001-001_setup.md
│       └── 001-002_tests.md
└── rules/                # Project-specific conventions
```

## How It Works

Brain is a set of [Claude Code skills](https://docs.anthropic.com/en/docs/claude-code/skills) — markdown files that teach Claude Code new slash commands. There's no runtime, no dependencies, and no build step. Everything is plain text.

## License

MIT

