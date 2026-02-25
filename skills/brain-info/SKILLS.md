---
name: brain-file-formats
description: Brain file format templates and conventions. Reference for all markdown file structures used in the _brain/ directory including state, issues, stages, and milestones.
user-invocable: false
---

# Brain Workflow

## Overview
This project uses a milestone/stage development workflow managed through markdown files in `_brain/`. This is an agentic AI-first framework — all development follows this structure.

## Process
1. Work is organized into **milestones** (big goals, features, or project phases)
2. Each milestone contains sequential **stages** (spec files with tasks + acceptance criteria)
3. Stages MUST be completed in order — never skip ahead
4. **Issues** are tracked separately and can be promoted into fix stages

## State
`_brain/state.md` tracks current progress (active milestone, active stage, completed stages). ALWAYS read it at the start of every session.

## Directory Layout
```
_brain/
  state.md                              # Current milestone/stage pointer + completed log
  issues.md                             # Issue inbox + index of researched issues
  issues/
    NNN_slug.md                         # Researched issue files
  milestones/
    NNN_name/                           # Milestone folders
      NNN-NNN_stage-name.md             # Stage spec files
  rules/                                # Project-specific conventions and style guides
```

## ID Conventions
- **Milestones:** 3-digit zero-padded (`001`, `002`, `003`)
- **Stages:** `{milestone_id}-{stage_id}` (`001-001`, `001-002`)
- **Issues:** 3-digit zero-padded (`001`, `002`)
- **Slugs:** lowercase, hyphens for spaces, no special characters
  - Example: "Core Services Setup" → `core-services-setup`

## Issue Lifecycle
Issues have two forms:
1. **Inbox items** — quick one-line notes in `_brain/issues.md` under `## Inbox`
2. **Researched issues** — full files in `_brain/issues/NNN_slug.md` with root cause analysis, affected files, and suggested approach

Flow: Inbox → Research → Researched file created → Optionally staged as a fix stage → Fixed

## Stage Lifecycle
1. Stage spec is created with objective, tasks, and acceptance criteria
2. Work is done to fulfill the tasks
3. ALL acceptance criteria are verified
4. Stage is marked done — pointer advances to next stage

## Rules
Files in `_brain/rules/` contain project-specific conventions (style guides, patterns, etc.). Always consult relevant rule files before making changes in their domain.


# Brain File Formats

All Brain files use markdown with YAML frontmatter. Follow these templates exactly.

## state.md

```md
---
current_milestone: "001"
current_stage: "001-002"
---
# Current State

## Active
- **Milestone:** 001 — Milestone Name
- **Stage:** 001-002 — Stage Name

## Completed Stages
- 001-001 ✓
```

When no milestone is active:
```md
---
current_milestone: null
current_stage: null
---
# Current State

No active milestone. Create one to get started.

## Completed Stages
```

## issues.md

```md
# Issues

## Inbox
- Short description of unresearched issue
- Another quick note about a bug

## Researched
- [001](issues/001_login-failure.md) Can't login to the homepage
- [002](issues/002_mobile-layout.md) Layout looks weird on mobile

## Won't Fix / By Design
- Dark mode contrast — intentional design choice
```

## Stage Spec (milestones/NNN_name/NNN-NNN_slug.md)

```md
---
id: "001-001"
status: pending
---
# Stage Name

## Objective
Clear description of what this stage accomplishes.

## Tasks
- Specific actionable task 1
- Specific actionable task 2
- Specific actionable task 3

## Acceptance Criteria
- Testable criterion 1
- Testable criterion 2
- Testable criterion 3

## Notes
Any additional context, references, or constraints.
```

Status values: `pending` | `done`

## Fix Stage (created from issues)

```md
---
id: "001-003"
status: pending
fixes: ["001"]
---
# Fix: 001 — Login failure

## Related Issues
- [Issue 001](../../issues/001_login-failure.md)

## Objective
Address the issues listed above.

## Tasks
-

## Acceptance Criteria
- All related issues pass their fix verification
-

## Notes

```

## Researched Issue (_brain/issues/NNN_slug.md)

```md
---
number: 001
status: RESEARCHED
created: 2025-02-24
---
# 001: Descriptive Title

## Original Report
The original inbox description, preserved as-is.

## Research Findings
- **Root cause:** What's actually going wrong and why
- **Affected files:** List of files involved with brief explanation
- **Suggested approach:** Recommended fix strategy

## Completion Summary
(filled in when the issue is fixed)
```

Issue status values: `RESEARCHED` | `STAGED` | `FIXED`
