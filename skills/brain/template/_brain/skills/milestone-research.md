---
description: Research a milestone skeleton into a fully fleshed-out goals spec
argument-hint: [milestone-id]
---

# Research a Milestone

Flesh out a milestone's goals doc with summary, goals, non-goals, key decisions, and proposed stages. Optional milestone ID: $ARGUMENTS

## Steps

1. **Resolve the target milestone.**
   - If `$ARGUMENTS` contains a milestone ID (a number), zero-pad to 3 digits and glob `_brain/milestones/{id}_*/` to find the directory.
   - Otherwise read `_brain/state.md` for `current_milestone`.
   - If neither yields a milestone, stop and ask the user which milestone to research.

2. **Read the goals doc.**
   - Read `_brain/milestones/{milestone_dir}/_milestone-goals.md`.
   - If it doesn't exist, stop and report.

3. **Read related context.**
   - Read `_brain/ISSUES.md` for issues that may be addressed by this milestone.
   - Read any `_brain/rules/*.md` files relevant to the milestone's domain (e.g., `architecture.md` for data work, `design.md` for UI work, `business-rules.md` for workflow changes).
   - If the goals doc references other files or issues, read those too.

4. **Assess completeness.**
   - Check whether the goals doc already has substantive content (more than placeholders) in: **Summary**, **Goals**, **Non-Goals**, **Key Decisions**, **Proposed Stages**.
   - If all sections are filled with real content, tell the user the goals doc looks complete and ask if they want to revise or expand anything. Stop here unless they say yes.
   - If only some sections are filled, note which ones need work and proceed — preserve existing content.

5. **Interview the user (if needed).**
   - Only if the goals doc is a skeleton or has significant gaps *and* lacks a brain dump or sufficient notes, ask targeted questions using `AskUserQuestion`. Cover:
     - Primary objective / what "done" looks like for the milestone
     - Priority ordering of goals
     - Constraints, dependencies, or things explicitly out of scope
   - Keep it to 1–3 focused questions max. The user can skip — you'll research what you can.
   - If the goals doc contains a brain dump or enough context, skip the interview and work from what's there.

6. **Research the codebase.**
   - Using the milestone objective + user answers + brain dump context, explore the codebase with the Explore agent or direct Glob/Grep:
     - Find existing patterns, schemas, types, and code relevant to this milestone
     - Identify major areas of the codebase that will be touched
     - Understand current state of related features
     - Look for prior art or conventions that inform the stage breakdown

7. **Fill out the goals doc.**
   - Rewrite the goals doc using the format from `_brain/templates/milestone-goals.md`.
   - **Preserve** the original frontmatter `status:` value.
   - **Preserve** the `## Brain Dump` section if present — keep it above the template sections as a reference.
   - Fill in all template sections:
     - **Summary** — One paragraph describing what the milestone accomplishes
     - **Goals** — Bullet list of concrete deliverables
     - **Non-Goals** — What's explicitly deferred or out of scope
     - **Key Decisions** — Table of architectural/design decisions with rationale
     - **Proposed Stages** — Table with stage number, slug, and summary. Stages should be sequentially buildable (each depends only on prior stages). Aim for focused stages that can each be completed in a single session.
   - Preserve any existing content that is already good — integrate it, don't discard it.

8. **Report.**
   - Summarize what was filled in and any assumptions made.
   - Note any open questions or decisions that need user input.
   - Show the file path so the user can review.
