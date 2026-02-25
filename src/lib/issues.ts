import { brainPath, readFile, writeFile } from "./fs.js";
import { existsSync } from "fs";

const ISSUES_PATH = () => brainPath("issues.md");

const INITIAL_ISSUES = `# Issues

## Inbox

## Researched

## Won't Fix / By Design
`;

export function initIssuesFile(): void {
  writeFile(ISSUES_PATH(), INITIAL_ISSUES);
}

export function readIssuesFile(): string {
  if (!existsSync(ISSUES_PATH())) return INITIAL_ISSUES;
  return readFile(ISSUES_PATH());
}

export function addToInbox(description: string): void {
  const content = readIssuesFile();
  const lines = content.split("\n");
  const inboxIdx = lines.findIndex((l) => l.trim() === "## Inbox");

  if (inboxIdx === -1) {
    lines.push(`- ${description}`);
  } else {
    let insertIdx = inboxIdx + 1;
    while (insertIdx < lines.length && !lines[insertIdx].startsWith("## ")) {
      insertIdx++;
    }
    lines.splice(insertIdx, 0, `- ${description}`);
  }

  writeFile(ISSUES_PATH(), lines.join("\n"));
}

export function promoteToResearched(description: string, issueId: string, slug: string): void {
  const content = readIssuesFile();
  const lines = content.split("\n");

  const inboxIdx = lines.findIndex((l) => l.trim() === "## Inbox");
  if (inboxIdx !== -1) {
    for (let i = inboxIdx + 1; i < lines.length; i++) {
      if (lines[i].startsWith("## ")) break;
      if (lines[i].includes(description)) {
        lines.splice(i, 1);
        break;
      }
    }
  }

  const researchedIdx = lines.findIndex((l) => l.trim() === "## Researched");
  if (researchedIdx !== -1) {
    let insertIdx = researchedIdx + 1;
    while (insertIdx < lines.length && !lines[insertIdx].startsWith("## ")) {
      insertIdx++;
    }
    const link = `- [${issueId}](issues/${issueId}_${slug}.md) ${description}`;
    lines.splice(insertIdx, 0, link);
  }

  writeFile(ISSUES_PATH(), lines.join("\n"));
}