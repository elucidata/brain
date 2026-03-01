---
description: Add a quick issue to the Brain inbox
argument-hint: <description>
---

# Add Issue to Inbox

Add a quick issue note to the inbox. Description: $ARGUMENTS

## Steps

1. Read `_brain/issues.md`.

2. Determine the next issue ID by scanning the doc for highest ID and incrementing it.

3. Append `- {issue_id}: {description}` to the `## Inbox` section, before the next `##` header.

3. Confirm: "Added to inbox: {description}"

This is meant for quick notes. Use `/brain issue-stage` to promote into a fix stage.
