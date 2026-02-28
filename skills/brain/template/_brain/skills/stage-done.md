---
description: Mark the current Brain stage as complete and advance to the next
---

# Complete Current Stage

Mark the current stage as done and advance to the next one.

## Steps

1. Read `_brain/state.md` for current milestone and stage.
   - If no active stage, stop and report there's nothing to complete.

2. Record the completed stage ID.

3. Find the milestone directory and list all stage files sorted by ID, skipping files starting with `_` (e.g., `_milestone-goals.md`).

4. Find the current stage's position in the list.

5. Add the completed stage to the `## Completed Stages` section of state.md as `- {stage_id} ✓`.

6. Update the stage document, setting the status to 'done'

7. If there are "Acceptance Criteria"
  - Validate that all the criteria have been addressed.
  - For each item, if it's a task item ("- [ ]") and it's passed the criteria check mark it as completed ("- [x]")
  - If any acceptance criteria are unmet, stop and report that there's work still pending.

8. If there is a next stage file after the current one:
  - Update `current_stage` in state.md frontmatter to the next stage ID.
  - Update the Active section body to reflect the new stage.
  - Report completion and the next stage.

9. If there are no more stages in this milestone:
  - Set `current_stage` to null.
  - Report that the milestone has no more stages. Suggest creating a new milestone or adding more stages.
