---
description: Create a fix stage for one or more researched Brain issues
argument-hint: <issue ID(s)>
---

# Create Fix Stage for Issue(s)

Create a stage in the current milestone to fix one or more researched issues. Issue ID(s): $ARGUMENTS

## Steps

1. Read `_brain/state.md` for the current milestone.
   - If no active milestone, stop and report.

2. For each issue ID provided:
   - Find the matching file in `_brain/issues/`
   - Read it to get the title and details
   - If the file doesn't exist, stop and report

3. Find the current milestone directory and determine the next stage ID.

4. Create a fix stage file using the template at `_brain/templates/fix-stage.md`:
   - Reference all related issues
   - Set the objective based on the issue findings
   - Pre-fill tasks based on the suggested approaches from the issue files
   - Set acceptance criteria based on verifying the fixes

5. Update each issue file's frontmatter status to `STAGED`.

6. Report the new stage ID and path.
