import { resolve } from "path";
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import matter from "gray-matter";

export const BRAIN_DIR = "_brain";

export function brainPath(...segments: string[]): string {
  return resolve(process.cwd(), BRAIN_DIR, ...segments);
}

export function brainExists(): boolean {
  return existsSync(brainPath());
}

export function ensureDir(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

export function readMarkdown(path: string): { data: Record<string, any>; content: string } {
  const raw = readFileSync(path, "utf-8");
  const { data, content } = matter(raw);
  return { data, content };
}

export function writeMarkdown(path: string, frontmatter: Record<string, any>, content: string): void {
  const fm = matter.stringify(content, frontmatter);
  writeFileSync(path, fm, "utf-8");
}

export function writeFile(path: string, content: string): void {
  writeFileSync(path, content, "utf-8");
}

export function readFile(path: string): string {
  return readFileSync(path, "utf-8");
}

export function listDir(path: string): string[] {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true })
    .filter((d) => d.isFile() || d.isDirectory())
    .map((d) => d.name)
    .sort();
}

export function listFiles(path: string, ext?: string): string[] {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((f) => !ext || f.endsWith(ext))
    .sort();
}

export function listDirs(path: string): string[] {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}