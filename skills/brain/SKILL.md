---
name: brain
description: Agentic AI-first development workflow manager. Use this skill whenever the user invokes `/brain` with any subcommand, or mentions brain workflow tasks like checking status, advancing stages, managing milestones, or tracking issues. Also trigger when the user references `_brain/` files, stage specs, or development workflow state.
---

# Brain — Workflow Dispatcher

You are the dispatcher for the **Brain** development workflow system. All development state lives in `./_brain/`.

## Routing

Parse the subcommand and any arguments from the user's input after `/brain`.

### Alias Table

These resolve instantly with no ambiguity:

| Alias | Resolves to    |
| ----- | -------------- |
| s     | status         |
| sd    | stage-done     |
| sn    | stage-new      |
| ia    | issue-add      |
| ir    | issue-research |
| is    | issue-stage    |
| mn    | milestone-new  |
| ml    | milestone-list |

### Command Table

If the input doesn't match an alias exactly, match it to the closest command below using intent and partial matching (e.g., "stat" → "status", "mile list" → "milestone-list").

| Subcommand     | Skill File                         | Description                                     |
| -------------- | ---------------------------------- | ----------------------------------------------- |
| init           | ./\_brain/skills/init.md           | Scaffold the `_brain/` folder structure         |
| status         | ./\_brain/skills/status.md         | Show current milestone, stage, and issue counts |
| milestone-new  | ./\_brain/skills/milestone-new.md  | Create a new milestone                          |
| milestone-list | ./\_brain/skills/milestone-list.md | List all milestones and stages                  |
| stage-new      | ./\_brain/skills/stage-new.md      | Create a stage in the current milestone         |
| stage-done     | ./\_brain/skills/stage-done.md     | Mark current stage complete and advance         |
| issue-add      | ./\_brain/skills/issue-add.md      | Add a quick issue to the inbox                  |
| issue-research | ./\_brain/skills/issue-research.md | Research an inbox item into a full issue        |
| issue-stage    | ./\_brain/skills/issue-stage.md    | Create a fix stage for researched issue(s)      |

### Dispatch Rules

1. **No subcommand given** → Run `status` (the most common starting action) and list available commands afterward.
2. **Exact alias match** → Resolve immediately per the alias table.
3. **Clear partial/fuzzy match** → Route to the matched command.
4. **Ambiguous match** → List the candidates and ask the user to clarify. For example, "st" could mean "status" or "stage-new" or "stage-done".
5. **No match** → Show the full command list and ask the user what they meant.

### Argument Forwarding

Everything after the resolved subcommand is passed as arguments to the skill file. For example:

- `/brain ia the login page crashes on mobile` → issue-add with description "the login page crashes on mobile"
- `/brain mn authentication` → milestone-new with name "authentication"
- `/brain is 3 7` → issue-stage with IDs "3 7"

## Execution

Read the matched skill file and follow its instructions exactly. Do not combine or skip steps from the skill file.
