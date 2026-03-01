---
description: Show current Brain milestone, stage progress, and issue counts
---

# Brain Status

Read the current state of the Brain and report a summary. Do NOT modify any files.

## Steps

1. Read `_brain/state.md` for current milestone and stage.

2. If there is a current milestone, find its directory in `_brain/milestones/` and count the total stages, skipping `_`-prefixed files (e.g., `_milestone-goals.md`). Determine which stage number the current stage is (e.g., "3 of 7").

3. Read `_brain/issues.md` and count:
   - Inbox items (lines under `## Inbox` starting with `- ` that are NOT links)

4. Report in this format:

```
🧠 Brain Status

  Milestone: 001 — milestone name
  Stage:     003 — stage name
  Progress:  3 of 7 stages

  Inbox: 3 issue(s)
```
