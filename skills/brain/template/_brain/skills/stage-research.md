---
description: Research a stage skeleton into a fully fleshed-out spec
argument-hint: [stage-id]
---

# Research a Stage

Flesh out a stage spec with scope, files, detailed requirements, and acceptance criteria. Optional stage ID: $ARGUMENTS

## Steps

1. **Resolve the target stage.**
   - If `$ARGUMENTS` contains a stage ID (a number), use it.
   - Otherwise read `_brain/state.md` for `current_stage`.
   - If neither yields a stage ID, stop and ask the user which stage to research.

2. **Locate and read the stage file.**
   - Find the current milestone directory from `_brain/state.md` → `current_milestone`.
   - Glob `_brain/milestones/{milestone_dir}/{stage_id}_*.md` to find the file.
   - Read the full stage file contents.

3. **Read related context.**
   - Read the milestone's `_milestone-goals.md` if one exists in the milestone directory.
   - If the stage body references another file, read that file too.
   - Read any `_brain/rules/*.md` files relevant to the stage's domain (e.g., if the stage involves UI, read `design.md`; if it involves data, read `architecture.md`).

4. **Assess completeness.**
   - Check whether the stage already has substantive content (more than placeholders) in these sections: **Scope**, **Detailed Requirements**, **Acceptance Criteria**.
   - If all three are already filled out with real content, tell the user the spec looks complete and ask if they want you to revise or expand anything specific. Stop here unless they say yes.
   - If only some sections are filled, note which ones need work and proceed — preserve existing content.

5. **Interview the user (if needed).**
   - Only if the stage is a skeleton or has significant gaps, ask targeted questions using `AskUserQuestion`. Cover:
     - Primary objective / what "done" looks like
     - Key behaviors and user flows
     - Constraints or things explicitly out of scope
     - Edge cases or error handling expectations
   - Keep it to 1–3 focused questions max. The user can skip — you'll research what you can.
   - If the stage or referenced docs already contain enough context (a brain dump, notes, or partial spec), skip the interview entirely and work from what's there.

6. **Research the codebase.**
   - Using the stage objective + user answers + referenced doc context, explore the codebase with the Explore agent or direct Glob/Grep:
     - Find existing patterns, utilities, types, and code relevant to this stage
     - Identify files that will need modification
     - Identify new files that need to be created
     - Understand interfaces/contracts from completed upstream stages
     - Check for existing tests or test patterns to follow

7. **Fill out the stage spec.**
   - Rewrite the stage file using the format from `_brain/templates/stage.md`.
   - **Preserve** the original frontmatter `status:` value (should remain `pending`).
   - Fill in all sections:
     - **Scope** — In Scope / Out of Scope with specific deliverables
     - **Files** — New Files / Modified Files tables
     - **Interfaces & Contracts** — Exports and Imports with TypeScript signatures
     - **Detailed Requirements** — Numbered sections with route paths, logic, UI details
     - **Acceptance Criteria** — Checkboxes, each verifiable
     - If `fixes` frontmatter is non-empty, ensure acceptance criteria cover verifying each fix and the Tests table includes regression tests for the issues
     - **Tests** — Test file table with type and coverage description
   - Preserve any existing content that is already good — integrate it, don't discard it.
   - Keep the same stage number and title from the original file.

8. **Report.**
   - Summarize what was filled in and any assumptions made.
   - Note any open questions or decisions that need user input.
   - Show the file path so the user can review.
