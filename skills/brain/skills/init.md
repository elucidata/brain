# Init — Scaffold Brain Workflow

## Steps

1. If the user asked to "force", "update", "refresh", or "reinitialize", confirm before proceeding — this overwrites `_brain/skills/` and the CLAUDE.md Brain section.
2. Run the init script:
   - Default: `python3 <SKILL_DIR>/scripts/init.py`
   - Force/update: `python3 <SKILL_DIR>/scripts/init.py --force`
3. Show the script output.
4. On success, suggest: "Run `/brain milestone-new <name>` to create your first milestone."
5. On failure, show the error and ask the user to check their setup.
