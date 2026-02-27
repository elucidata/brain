---
description: List all Brain milestones and their stages with status indicators
---

# List Milestones

List all milestones and their stages. Do NOT modify any files.

## Steps

1. Read `_brain/state.md` for current milestone and stage pointers.

2. List all directories in `_brain/milestones/`, sorted by ID.

3. For each milestone, list its stage files (sorted by ID).

4. Mark the current milestone and current stage with an indicator.

5. Format as:

```
001 milestone name ◀ current
  001 stage one ✓
  002 stage two ◀ active
  003 stage three

002 future milestone
  (no stages yet)
```

Mark completed stages (those listed in state.md's Completed Stages section) with ✓.
