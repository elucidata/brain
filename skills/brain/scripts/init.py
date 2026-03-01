#!/usr/bin/env python3
"""Scaffold (or update) the _brain/ directory in a project."""

import argparse
import os
import shutil
import sys


def main():
    parser = argparse.ArgumentParser(description="Initialize Brain workflow in a project.")
    parser.add_argument("--force", "-f", action="store_true",
                        help="Update skills and CLAUDE.md Brain section even if already initialized")
    args = parser.parse_args()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    template_dir = os.path.normpath(os.path.join(script_dir, "..", "template"))
    template_brain = os.path.join(template_dir, "_brain")
    template_claude = os.path.join(template_dir, "CLAUDE.md")

    brain_dir = os.path.join(os.getcwd(), "_brain")
    claude_md = os.path.join(os.getcwd(), "CLAUDE.md")

    if not os.path.isdir(template_brain):
        print(f"Error: template directory not found at {template_brain}", file=sys.stderr)
        sys.exit(1)

    # Check if already initialized
    if os.path.isdir(brain_dir) and not args.force:
        print("Brain is already initialized. Use --force to update.")
        sys.exit(0)

    created = []
    updated = []
    skipped = []

    # Scaffold _brain/ from template/_brain/
    for dirpath, dirnames, filenames in os.walk(template_brain):
        rel_dir = os.path.relpath(dirpath, template_brain)
        target_dir = os.path.join(brain_dir, rel_dir) if rel_dir != "." else brain_dir

        if not os.path.isdir(target_dir):
            os.makedirs(target_dir)
            created.append(os.path.relpath(target_dir, os.getcwd()) + "/")

        for filename in filenames:
            src = os.path.join(dirpath, filename)
            rel_file = os.path.join(rel_dir, filename) if rel_dir != "." else filename
            dst = os.path.join(brain_dir, rel_file)

            # Skills are always overwritten (managed by Brain)
            is_skill = rel_file.startswith("skills" + os.sep) or rel_file.startswith("skills/")

            if is_skill:
                existed = os.path.exists(dst)
                shutil.copy2(src, dst)
                if existed:
                    updated.append("_brain/" + rel_file)
                else:
                    created.append("_brain/" + rel_file)
            elif not os.path.exists(dst):
                shutil.copy2(src, dst)
                created.append("_brain/" + rel_file)
            else:
                skipped.append("_brain/" + rel_file)

    # Remove .gitkeep files that are only needed in the template repo
    gitkeep = os.path.join(brain_dir, "milestones", ".gitkeep")
    if os.path.exists(gitkeep):
        os.remove(gitkeep)
        gitkeep_rel = "_brain/milestones/.gitkeep"
        created = [f for f in created if f != gitkeep_rel]
        updated = [f for f in updated if f != gitkeep_rel]

    # Handle CLAUDE.md with markers
    begin_marker = "<!-- BEGIN BRAIN -->"
    end_marker = "<!-- END BRAIN -->"

    brain_section = begin_marker + "\n"
    with open(template_claude, "r") as f:
        brain_section += f.read()
    if not brain_section.endswith("\n"):
        brain_section += "\n"
    brain_section += end_marker + "\n"

    if not os.path.exists(claude_md):
        with open(claude_md, "w") as f:
            f.write(brain_section)
        created.append("CLAUDE.md")
    else:
        with open(claude_md, "r") as f:
            content = f.read()

        if begin_marker in content and end_marker in content:
            # Replace existing section
            before = content[:content.index(begin_marker)]
            after = content[content.index(end_marker) + len(end_marker):]
            # Strip at most one newline after end marker
            if after.startswith("\n"):
                after = after[1:]
            new_content = before + brain_section + after
            with open(claude_md, "w") as f:
                f.write(new_content)
            updated.append("CLAUDE.md (Brain section)")
        else:
            # Append
            with open(claude_md, "a") as f:
                if not content.endswith("\n"):
                    f.write("\n")
                f.write("\n" + brain_section)
            updated.append("CLAUDE.md (appended Brain section)")

    # Print summary
    print("Brain initialized successfully!\n")
    if created:
        print("Created:")
        for item in created:
            print(f"  + {item}")
    if updated:
        print("Updated:")
        for item in updated:
            print(f"  ~ {item}")
    if skipped:
        print("Skipped (already exist):")
        for item in skipped:
            print(f"  - {item}")


if __name__ == "__main__":
    main()
