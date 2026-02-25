---
description: Create a new stage in the current Brain milestone
argument-hint: <name>
---

# Create New Stage

Create a new stage spec in the current milestone. The user provides a name: $ARGUMENTS

## Steps

1. Read `_brain/state.md` for the current milestone ID.
   - If no current milestone, stop and tell the user to create one first.

2. Find the current milestone's directory in `_brain/milestones/`.

3. Scan existing stage files in that directory. Determine the next stage ID: `{milestone_id}-{next_stage_number}`, zero-padded to 3 digits.

4. Slugify the name.

5. Create the stage file at `_brain/milestones/{milestone_dir}/{stage_id}_{slug}.md` using the stage spec template from brain-file-formats skill. Leave Objective, Tasks, and Acceptance Criteria with placeholder dashes for the user to fill in.

6. If `current_stage` in state.md is null, update state.md to set this as the current stage.

7. Report the stage ID and file path. Remind the user to fill in the Objective, Tasks, and Acceptance Criteria.
