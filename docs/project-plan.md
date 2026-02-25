## Brain CLI — Build Plan (v2)

### 1. Project Structure

```
brain/
  src/
    cli.ts                # Entry point, argument parsing
    commands/
      init.ts             # Scaffold _brain/ folder structure
      milestone.ts        # milestone new, milestone list
      stage.ts            # stage new, stage done
      issue.ts            # issue add, issue list, issue check
      status.ts           # Print current state
      ui.ts               # Launch TUI dashboard
    lib/
      fs.ts               # Read/write markdown files, frontmatter parsing
      state.ts            # Read/update _brain/state.md
      ids.ts              # Auto-incrementing ID generation (001, 002...)
      format.ts           # Markdown templating for milestones, stages
      issues.ts           # Parse/update issues.md sections
    tui/
      app.tsx             # Ink-based TUI root
      views/
        dashboard.tsx     # Overview: current milestone, stage, open issues
        milestones.tsx    # Browse milestones and their stages
        issues.tsx        # Issue list with drill-down
  package.json
  tsconfig.json
```

### 2. `_brain/` Folder Structure

```
_brain/
  issues/
    001_login-failure.md      # Researched issues only
    002_mobile-layout.md
  milestones/
    001_initial-setup/
      001-001_project-boilerplate.md
      001-002_core-services.md
    002_journaling/
      002-001_db-setup.md
      002-002_journal-crud.md
  rules/
    frontend-styleguide.md
  issues.md                   # Inbox + index of researched issues
  state.md                    # Current progress pointer
```

### 3. CLI Commands

| Command | Action |
|---|---|
| `brain` | Launch TUI dashboard |
| `brain init` | Scaffold `_brain/` folder hierarchy with empty templates |
| `brain status` | Print current milestone, stage, and open issue count |
| **Milestones** | |
| `brain milestone new "Name"` | Create next milestone folder with incremented ID |
| `brain milestone list` | List milestones and their stages |
| **Stages** | |
| `brain stage new "Name"` | Create a new stage spec under the current milestone |
| `brain stage done` | Mark current stage complete in `state.md`, advance pointer |
| **Issues** | |
| `brain issue add "Short description"` | Append a line to the Inbox section of `issues.md` |
| `brain issue list` | Print `issues.md` contents |
| `brain issue check NNN` | Validate a researched issue file has correct frontmatter and structure |

### 4. Issue Lifecycle

Issues have two forms — **unresearched** (a line in `issues.md`) and **researched** (a full file in `_brain/issues/`).

**`_brain/issues.md` format:**
```md
# Issues

## Inbox
- Can't login to the homepage
- Layout looks weird on mobile

## Researched
- [001](issues/001_login-failure.md) Can't login to the homepage

## Won't Fix / By Design
- Dark mode contrast — intentional design choice
```

**Flow:**
1. Human or Claude runs `brain issue add "Can't login"` → line added to Inbox
2. Human tells Claude Code to "research the login issue" → Claude reads the inbox item, investigates the codebase, creates `_brain/issues/001_login-failure.md`, moves the line from Inbox to Researched
3. Human or Claude runs `brain issue stage 001` → creates a stage under the current milestone to address the issue
4. Stage is completed → issue frontmatter status updated to `FIXED`

**Researched issue file format (`_brain/issues/NNN_slug.md`):**
```md
---
number: 001
status: RESEARCHED | STAGED | FIXED
created: 2025-02-24
---
# 001: Can't login to the homepage

## Original Report
Can't login to the homepage

## Research Findings
- **Root cause:** ...
- **Affected files:** ...
- **Suggested approach:** ...

## Completion Summary
(filled in when fixed)
```

### 5. State Tracking

**`_brain/state.md`:**
```md
---
current_milestone: 001
current_stage: 001-002
---
# Current State

## Active
- **Milestone:** 001 — Initial Setup
- **Stage:** 001-002 — Core Services

## Completed Stages
- 001-001 — Project Boilerplate ✓
```

`brain stage done` updates both the frontmatter pointers and the completed list, then advances `current_stage` to the next stage in the milestone.

### 6. TUI Dashboard (Ink)

Launched via `brain` (no args) or `brain ui`. Three navigable views:

- **Dashboard** — Current milestone/stage, stage completion progress bar, inbox issue count
- **Milestones** — Tree view of milestones → stages, status indicators
- **Issues** — Grouped list (Inbox / Researched / Staged), drill into researched issue details

Navigation: arrow keys + enter, tab to switch views, `q` to quit.

### 7. Claude Code Integration

**CLAUDE.md section:**
```md
## Brain — Development Workflow

Development state lives in `./_brain/`. Use the `brain` CLI for structured
operations and edit files directly for research tasks.

### Starting a Session
- ALWAYS run `brain status` first to understand current state.
- Read `_brain/state.md` for full context.

### Working on Stages
- Read the current stage spec file for requirements and acceptance criteria.
- When a stage is complete and meets acceptance criteria: `brain stage done`

### Issues
- Quick log: `brain issue add "description"`
- When asked to research an issue:
  1. Read the relevant inbox item from `_brain/issues.md`
  2. Analyze the codebase to understand the problem
  3. Create `_brain/issues/NNN_slug.md` with the researched issue template
  4. Move the line from Inbox to Researched in `_brain/issues.md`
  5. Run `brain issue check NNN` to validate the file
- To create a fix stage: `brain issue stage NNN`

### Rules
- Reference `_brain/rules/` for project-specific conventions.
- Each stage must be completed before moving to the next.
```

### 8. Tech Stack

- **Bun + TypeScript** — runtime and `bunx` support
- **Commander.js** — CLI argument parsing
- **Ink + React** — TUI rendering
- **gray-matter** — frontmatter parsing
- **chalk** — terminal colors for non-TUI output

