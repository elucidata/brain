
## Brain — Development Workflow

This project uses **Brain**, an agentic AI-first development workflow manager. All development state lives in `./_brain/`. Work is organized into **milestones** composed of sequential **stages**. Each stage is a spec file with tasks and acceptance criteria that must be fully met before moving on.

### Starting a Session

- ALWAYS run `/brain-status` first to understand current progress.
- Read `_brain/state.md` for full context on what's active and what's been completed.
- Read the current stage spec file for detailed requirements before writing any code.

### Working on Stages

1. Read the current stage spec at `_brain/milestones/<milestone>/<stage>.md`
2. Complete all tasks listed in the spec
3. Verify all acceptance criteria are met
4. Run `/brain-stage-done` to mark it complete and advance to the next stage

Do NOT skip stages or work on future stages. Each stage must be completed in order.

### Issues

Issues have two forms: **inbox items** (quick notes in `_brain/issues.md`) and **researched issues** (full files in `_brain/issues/`).

- Log a quick issue: `/brain-issue-add <description>`
- Research an inbox item: `/brain-issue-research <which issue>`
- Create a fix stage: `/brain-issue-stage <issue ID(s)>`

### Commands Reference

| Command | Description |
|---|---|
| `/brain-init` | Scaffold the `_brain/` folder structure |
| `/brain-status` | Show current milestone, stage, and issue counts |
| `/brain-milestone-new <name>` | Create a new milestone |
| `/brain-milestone-list` | List all milestones and stages |
| `/brain-stage-new <name>` | Create a stage in the current milestone |
| `/brain-stage-done` | Mark current stage complete, advance |
| `/brain-issue-add <msg>` | Add a quick issue to the inbox |
| `/brain-issue-research <issue>` | Research an inbox item into a full issue |
| `/brain-issue-stage <id(s)>` | Create a fix stage for researched issue(s) |

### Rules

Reference files in `_brain/rules/` for project-specific conventions. Always consult relevant rule files before making changes in their domain.

