import { brainPath, readMarkdown, writeMarkdown } from "./fs.js";
import { existsSync } from "fs";

export interface BrainState {
  current_milestone: string | null;
  current_stage: string | null;
}

const STATE_PATH = () => brainPath("state.md");

export function readState(): BrainState {
  if (!existsSync(STATE_PATH())) {
    return { current_milestone: null, current_stage: null };
  }
  const { data } = readMarkdown(STATE_PATH());
  return {
    current_milestone: data.current_milestone ?? null,
    current_stage: data.current_stage ?? null,
  };
}

export function writeState(state: BrainState, body?: string): void {
  const content = body ?? buildStateBody(state);
  writeMarkdown(STATE_PATH(), {
    current_milestone: state.current_milestone,
    current_stage: state.current_stage,
  }, content);
}

function buildStateBody(state: BrainState): string {
  const lines = ["\n# Current State\n"];
  if (state.current_milestone) {
    lines.push("## Active");
    lines.push(`- **Milestone:** ${state.current_milestone}`);
    if (state.current_stage) {
      lines.push(`- **Stage:** ${state.current_stage}`);
    }
  } else {
    lines.push("No active milestone. Run \`brain milestone new\` to get started.");
  }
  lines.push("\n## Completed Stages\n");
  return lines.join("\n");
}

export function initState(): void {
  const state: BrainState = { current_milestone: null, current_stage: null };
  writeState(state);
}