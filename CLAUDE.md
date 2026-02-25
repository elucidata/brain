# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Brain is a set of Claude Code skills (slash commands) that provide a milestone/stage-based development workflow. There is no runtime, no dependencies, and no build step — everything is plain markdown files defining skills.

## Repository Structure

- `skills/` — Each subdirectory is a skill (slash command) containing a `SKILL.md` that defines its behavior
- `skills/brain-init/global.md` — Template content appended to a project's `CLAUDE.md` when `/brain-init` runs
- `skills/brain-file-formats/SKILL.md` and `skills/brain-workflow/SKILL.md` — Non-invocable reference docs used by other skills

## How Skills Work

Each `SKILL.md` has YAML frontmatter (`description`, `argument-hint`) and a numbered step list that Claude Code follows when the skill is invoked. Skills operate on a `_brain/` directory in the target project (not in this repo).

## Key Conventions

- **IDs are zero-padded**: Milestones use 3-digit IDs (`001`, `002`), stages use composite IDs (`001-001`, `001-002`), issues use 3-digit IDs
- **Slugified names**: IDs are paired with slugs (`001_setup-auth`) — lowercase, hyphens, no special characters
- **YAML frontmatter**: All `_brain/` markdown files use YAML frontmatter for metadata (status, IDs, dates)
- **Sequential stages**: Stages within a milestone must be completed in order
- **Issue lifecycle**: Inbox → Researched → Staged → Fixed
- **State centralization**: `_brain/state.md` is the single source of truth for current progress

## Editing Skills

When modifying a skill, consult `brain-file-formats/SKILL.md` for the exact markdown templates that skills generate, and `brain-workflow/SKILL.md` for the overall workflow and ID conventions. Changes to file formats must be consistent across all skills that read or write those files.
