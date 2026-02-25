export const CLAUDE_MD_TEMPLATE = `# CLAUDE.md

## Brain — Development Workflow

This project uses **Brain**, an agentic AI-first development workflow manager.
All development state lives in \`./_brain/\`. Work is organized into **milestones**
composed of sequential **stages**. Each stage is a spec file with tasks and
acceptance criteria that must be fully met before moving on.

### Starting a Session

- ALWAYS run \`brain status\` first to understand current progress.
- Read \`_brain/state.md\` for full context on what's active and what's been completed.
- Read the current stage spec file for detailed requirements before writing any code.

### Working on Stages

1. Read the current stage spec at \`_brain/milestones/<milestone>/<stage>.md\`
2. Complete all tasks listed in the spec
3. Verify all acceptance criteria are met
4. Run \`brain stage done\` to mark it complete and advance to the next stage

Do NOT skip stages or work on future stages. Each stage must be completed in order.

### Issues

Issues have two forms: **inbox items** (quick notes in \`_brain/issues.md\`) and
**researched issues** (full files in \`_brain/issues/\`).

#### Logging a quick issue
\`\`\`bash
brain issue add "Short description of the problem"
\`\`\`

#### Researching an issue
When asked to research an issue from the inbox:

1. Read the relevant inbox item from \`_brain/issues.md\`
2. Analyze the codebase to understand the root cause
3. Assign the next available issue number (check existing files in \`_brain/issues/\`)
4. Create \`_brain/issues/NNN_slug.md\` with this structure:

\`\`\`md
---
number: NNN
status: RESEARCHED
created: YYYY-MM-DD
---
# NNN: Title

## Original Report
The original inbox description

## Research Findings
- **Root cause:** What's actually going wrong
- **Affected files:** List of files involved
- **Suggested approach:** How to fix it

## Completion Summary
(filled in when fixed)
\`\`\`

5. Move the line from **Inbox** to **Researched** in \`_brain/issues.md\`, formatted as:
   \`- [NNN](issues/NNN_slug.md) Short description\`
6. Run \`brain issue check NNN\` to validate the file structure

#### Creating a fix stage
\`\`\`bash
brain issue stage NNN
\`\`\`
This creates a new stage in the current milestone to address the issue.

### Rules

Reference files in \`_brain/rules/\` for project-specific conventions and style guides.
Always consult relevant rule files before making changes in their domain.

### CLI Reference

| Command | Description |
|---|---|
| \`brain status\` | Show current milestone, stage, and issue counts |
| \`brain milestone new "Name"\` | Create a new milestone |
| \`brain milestone list\` | List all milestones and stages |
| \`brain stage new "Name"\` | Create a stage in the current milestone |
| \`brain stage done\` | Mark current stage complete, advance |
| \`brain issue add "msg"\` | Add a quick issue to the inbox |
| \`brain issue list\` | Show all issues |
| \`brain issue check NNN\` | Validate a researched issue file |
| \`brain issue stage NNN\` | Create a fix stage for an issue |
`;