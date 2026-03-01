---
description: Create a fix stage for one or more Brain issues
argument-hint: <issue ID(s)>
---

# Create Fix Stage for Issue(s)

Create a stage in the current milestone to fix one or more issues. Issue ID(s): $ARGUMENTS

## Steps

1. Read `_brain/state.md` for the current milestone.
   - If no active milestone, stop and report.

2. For each issue ID provided:
   - Find the matching item in `_brain/issues.md` by ID
   - Read its description
   - If no matching item exists, stop and report

3. Find the current milestone directory and determine the next stage ID.

4. Create a fix stage file using the template at `_brain/templates/stage.md`:
   - Populate `fixes` frontmatter with the issue IDs (e.g., `fixes: ["001", "003"]`)
   - Include a "Original Issue(s)" section that contains the original issue descriptions
   - Set the objective based on the issue descriptions, if you have enough to work with
   - Pre-fill tasks based on the issue descriptions
   - Set acceptance criteria based on verifying the fixes

5. Update the issues.md file to remove the issues

6. Report the new stage ID and path.
