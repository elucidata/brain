# Brain

An agentic, AI-first development workflow manager for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (or other agentic harnesses, but I only test with Claude Code). Brain organizes your work into **milestones** and sequential **stages**, with built-in issue tracking — all stored as plain markdown files in a `_brain/` directory.

## Why Brain?

AI coding assistants are powerful but can lose focus across long sessions. Brain gives Claude Code a structured workflow so it always knows what to work on, what's been done, and what's next. Every piece of state is a version-controllable markdown file.

**Flexible by design** — When you initialize Brain in a project, the sub-skill definitions are copied into your project's `_brain/skills/` directory. This means you can customize the workflow per project: tweak stage specs, add new commands, or adjust the process to fit how your team works. No two projects have to use Brain the same way.

## Quick Start

1. **Install** — Clone or copy this repo into your [Claude Code skill directory](https://docs.anthropic.com/en/docs/claude-code/skills).

2. **Initialize** — Open a project in Claude Code and run:
   ```
   /brain init
   ```
   This scaffolds the `_brain/` directory, copies the workflow skills into your project, and updates your `CLAUDE.md`.

3. **Create a milestone and stage:**
   ```
   /brain mn "User Authentication"
   /brain sn "Set up auth middleware"
   ```

4. **Research the stage** to build out a full spec with tasks and acceptance criteria:
   ```
   /brain sr
   ```

5. **Implement the stage:**
   ```
   /brain si
   ```

6. **Mark it done** and advance to the next stage:
   ```
   /brain sd
   ```

7. **Check progress anytime:**
   ```
   /brain s
   ```

## Commands

Brain uses a single `/brain` command with subcommands. Short aliases are available for speed:

| Subcommand | Alias | Description |
|---|---|---|
| `status` | `s` | Show current milestone, stage, and issue counts |
| `milestone-new <name>` | `mn` | Create a new milestone |
| `milestone-list` | `ml` | List all milestones and stages with status |
| `milestone-research` | `mr` | Research a milestone into a goals spec |
| `stage-new <name>` | `sn` | Create a stage in the current milestone |
| `stage-research` | `sr` | Research a stage into a full spec |
| `stage-implement` | `si` | Implement the current stage |
| `stage-done` | `sd` | Mark current stage complete and advance |
| `issue-add <description>` | `ia` | Add a quick issue to the inbox |
| `issue-stage <id(s)>` | `is` | Create a fix stage for issue(s) |
| `init` | — | Scaffold the `_brain/` folder structure |

Running `/brain` with no subcommand shows status and lists available commands.

## Core Concepts

### Milestones

Large goals or features. Each milestone is a directory under `_brain/milestones/` containing one or more stages.

### Stages

Sequential spec files within a milestone. Each stage has an objective, a task list, and acceptance criteria that must be fully met before moving on. Stages are completed in order — no skipping. The typical flow is: create a stage, research it into a full spec, implement it, then mark it done.

### Issues

A lightweight tracking system:

- **Inbox** — Quick one-line notes captured in `_brain/issues.md`
- Issues can be promoted into **fix stages** to address them systematically

### State

All progress is tracked in `_brain/state.md` — the current milestone, current stage, and a log of completed stages. Claude Code reads this at the start of every session to pick up where it left off.

## Directory Structure

After initialization, your project will contain:

```
_brain/
├── state.md              # Current progress pointer
├── issues.md             # Issue inbox
├── help.md               # Workflow reference
├── skills/               # Sub-skill definitions (customizable per project)
│   ├── status.md
│   ├── milestone-new.md
│   ├── stage-research.md
│   └── ...
├── milestones/           # Milestone directories
│   └── 001_my-feature/
│       ├── 001-001_setup.md
│       └── 001-002_tests.md
├── templates/            # Templates for milestones, stages, issues
└── rules/                # Project-specific conventions
```

## Architecture

Brain is a single [Claude Code skill](https://docs.anthropic.com/en/docs/claude-code/skills) that acts as a dispatcher. The top-level `/brain` command parses your subcommand, resolves aliases, and routes to the appropriate skill file. There's no runtime, no dependencies, and no build step — everything is plain markdown.

Only the `init` command runs from the installed skill location. All other sub-skills are read from the project's `_brain/skills/` directory, which means your workflow definitions travel with your project and can be version-controlled, shared, and customized independently.

## License

MIT
