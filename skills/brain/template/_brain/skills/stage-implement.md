---
description: Implement a stage
argument-hint: [stage-id]
---

# Implement a Stage

Code the requirements in a stage spec to completion. Optional stage ID: $ARGUMENTS

## Steps

1. **Resolve the target stage.**
   - If `$ARGUMENTS` contains a stage ID (a number), use it.
   - Otherwise read `_brain/state.md` for `current_stage`.
   - If neither yields a stage ID, stop and ask the user which stage to implement.

2. **Locate and read the stage file.**
   - Find the current milestone directory from `_brain/state.md` → `current_milestone`.
   - Glob `_brain/milestones/{milestone_dir}/{stage_id}_*.md` to find the file.
   - Read the full stage file contents.

3. **Read related context.**
   - Read the milestone's `_milestone-goals.md` if one exists in the milestone directory.
   - If the stage body references other files, read them too.
   - Read any `_brain/rules/*.md` files relevant to the stage's domain (e.g., UI → `design.md`, data → `architecture.md`).

4. **Validate spec readiness.**
   - The spec must have substantive content (more than placeholders) in: **Scope**, **Detailed Requirements**, **Acceptance Criteria**.
   - If any of these are missing or skeletal, stop and tell the user: "This spec isn't ready for implementation. Run `stage-research` first to flesh it out."

5. **Ask commit preference.**
   - Ask the user: commit after each requirement section, or defer all commits until `stage-done`?

6. **Plan mode.**
   - Enter plan mode. Explore the codebase to understand existing patterns, types, and code relevant to the spec.
   - Create an implementation plan that maps each Detailed Requirement section to concrete code changes.
   - Reference specific files, functions, and line numbers.
   - Get user approval before writing any code.

7. **Implement.**
   - Work through each requirement section from the spec, writing code.
   - Follow existing codebase patterns and conventions.
   - If per-task commits were chosen in step 5, commit after completing each section.
   - Do NOT mark the stage as done, nor remove it as current_stage from state.md.

8. **Verify.**
   - Run `pnpm check` and fix any issues.
   - Run relevant tests (`pnpm test` or targeted test files).
   - Walk through each **Acceptance Criterion** from the spec and report pass/fail with evidence (test output, manual check, code reference).

9. **Report.**
   - Summarize what was implemented and any deviations from the spec.
   - Show failing acceptance criteria, if any, with details.
   - Show the list of files created or modified.

10. **Stop for review.**
    - Do NOT auto-advance to the next stage.
    - Tell the user to run `stage-done` when they are satisfied with the implementation.
