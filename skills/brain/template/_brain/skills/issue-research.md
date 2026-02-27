---
description: Research a Brain inbox item into a full issue with root cause analysis
argument-hint: <which issue>
---

# Research an Issue

Research an issue from the inbox and create a full issue file. The user specifies which issue (by text match or description): $ARGUMENTS

## Steps

1. Read `_brain/issues.md` and find the matching inbox item. If ambiguous, ask the user to clarify which one.

2. Determine the next issue ID by scanning `_brain/issues/` for existing files and incrementing the highest ID.

3. Slugify the issue description for the filename.

4. **Analyze the codebase** to understand the problem:
   - Search for relevant files
   - Read the code to understand what's going wrong
   - Identify the root cause
   - List all affected files
   - Determine a suggested fix approach

5. Create `_brain/issues/{id}_{slug}.md` using the template at `_brain/templates/issue.md`. Fill in:
   - Frontmatter with the issue number, status `RESEARCHED`, and today's date
   - **Original Report** — the inbox description as-is
   - **Research Findings** — root cause, affected files, suggested approach (from your analysis)
   - Leave **Completion Summary** empty

6. Update `_brain/issues.md`:
   - Remove the line from `## Inbox`
   - Add to `## Researched`: `- [{id}](issues/{id}_{slug}.md) {description}`

7. Report your findings to the user with a summary of root cause and suggested approach.
