import { listDirs, listFiles, brainPath } from "./fs.js";

export function padId(n: number): string {
  return String(n).padStart(3, "0");
}

export function parseIdPrefix(name: string): number {
  const match = name.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function nextMilestoneId(): string {
  const dirs = listDirs(brainPath("milestones"));
  const max = dirs.reduce((m, d) => Math.max(m, parseIdPrefix(d)), 0);
  return padId(max + 1);
}

export function nextStageId(milestoneId: string): string {
  const files = listFiles(brainPath("milestones", milestoneId), ".md");
  const max = files.reduce((m, f) => {
    const match = f.match(/^\d+-(\d+)/);
    return match ? Math.max(m, parseInt(match[1], 10)) : m;
  }, 0);
  return `${milestoneId}-${padId(max + 1)}`;
}

export function nextIssueId(): string {
  const files = listFiles(brainPath("issues"), ".md");
  const max = files.reduce((m, f) => Math.max(m, parseIdPrefix(f)), 0);
  return padId(max + 1);
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}