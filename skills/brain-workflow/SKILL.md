---
name: brain-workflow
description: Brain development workflow overview. Reference for milestone/stage organization, directory layout, ID conventions, issue lifecycle, and stage lifecycle.
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
