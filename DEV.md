# Testing/Dev

The Brain skill lives in `skills/brain/` in this
repo. To test with Claude Code, it needs to be discoverable at
`~/.claude/skills/`. Symlinks let you test the live repo version without
copying or manual syncing.

## Steps

1.  Create the global skills directory if it doesn't exist:

```bash
  mkdir -p ~/.claude/skills
```

2.  Symlink the skill directory: 

```bash
  ln -s /Users/mattm/Projects/Elucidata/brain-cli/skills/brain ~/.claude/skills/brain
```

3.  Verify the link resolved correctly:

```bash
  ls -la ~/.claude/skills/
  cat ~/.claude/skills/brain/SKILL.md | head -5
```

## Testing

After linking, open a new Claude Code session in any project and run
`/brain init`. The dispatcher should resolve and the init script should
scaffold `./_brain/` in the target project folder.

## Teardown

To uninstall, remove the symlinks:
`rm ~/.claude/skills/brain ~/.claude/skills/brain-info`
