---
description: Create a new Brain milestone
argument-hint: <name>
---

# Create New Milestone

Create a new milestone. The user provides a name: $ARGUMENTS

## Steps

1. Read `_brain/state.md` for current state.

2. Scan `_brain/milestones/` for existing milestone directories. Determine the next milestone ID by finding the highest existing ID and adding 1. Zero-pad to 3 digits.

3. Slugify the name: lowercase, replace spaces with hyphens, remove special characters.

4. Create directory: `_brain/milestones/{id}_{slug}/`

5. Create initial stage: `_brain/milestones/{id}_{slug}/001_requirements.md` using the template at `_brain/templates/milestone-requirements.md`

6. If `current_milestone` in state.md is null, update state.md to set this as the current milestone.

7. If `current_stage` in state.md is null, update state.md to set this to the new milestone's initial stage (requirements).

7. Report the milestone ID and path, and suggest creating stages with `/brain stage-new`.
