---
description: Initialize the Brain workflow by scaffolding the _brain/ directory structure
---

# Initialize Brain

Create the `_brain/` directory structure for this project.

## Steps

1. Check if `_brain/` already exists. If it does, stop and report that Brain is already initialized.

2. Create these directories:
   - `_brain/issues/`
   - `_brain/milestones/`
   - `_brain/rules/`

3. Create `_brain/state.md` with no active milestone, following the template in the brain-file-formats skill.

4. Create `_brain/issues.md` with empty Inbox, Researched, and Won't Fix sections, following the template in the brain-file-formats skill.

5. Create `_brain/rules/README.md` with:

```md
# Rules

Add project-specific rules and style guides here.
Claude will reference these when working on stages.
```

6. Adjust `./CLAUDE.md`:

- If the `./CLAUDE.md` file does not exist, create it, and add the content from `./skills/brain-init/global.md`.

- If the `./CLAUDE.md` file already exists, append the content from `./skills/brain-init/global.md` to the end of the file.

- If `./CLAUDE.md` already contains the content from `./skills/brain-init/global.md`, do not add it again.

7. Report what was created and suggest running `/brain-milestone-new` next.
