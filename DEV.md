# Testing/Dev

The Brain skills live in `skills/brain/` and `skills/brain-info/` in this
repo. To test them with Claude Code, they need to be discoverable at
`~/.claude/skills/`. Symlinks let you test the live repo versions without
copying or manual syncing.

## Steps

1.  Create the global skills directory if it doesn't exist: `mkdir -p ~/.claude/skills`
2.  Symlink both skill directories: 
  - `ln -s /Users/mattm/Projects/Elucidata/brain-cli/skills/brain ~/.claude/skills/brain`
  - `ln -s /Users/mattm/Projects/Elucidata/brain-cli/skills/brain-info ~/.claude/skills/brain-info`
3.  Verify the links resolve correctly:
  - `ls -la ~/.claude/skills/`
  - `cat ~/.claude/skills/brain/SKILL.md | head -5`

## Testing

After linking, open a new Claude Code session in any project and run
`/brain init`. The dispatcher should resolve and the init script should
scaffold `./_brain/` in the target project folder.

## Teardown

To uninstall, remove the symlinks:
`rm ~/.claude/skills/brain ~/.claude/skills/brain-info`
