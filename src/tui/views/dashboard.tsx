import React from "react";
import { Box, Text } from "ink";
import { readState } from "../../lib/state.js";
import { readIssuesFile } from "../../lib/issues.js";
import { brainPath, listDirs, listFiles } from "../../lib/fs.js";

function ProgressBar({ current, total, width = 30 }: { current: number; total: number; width?: number }) {
  const filled = total > 0 ? Math.round((current / total) * width) : 0;
  const empty = width - filled;
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <Text>
      <Text color="green">{"█".repeat(filled)}</Text>
      <Text dimColor>{"░".repeat(empty)}</Text>
      <Text dimColor> {pct}%</Text>
    </Text>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box flexDirection="column" borderStyle="round" borderColor="gray" paddingX={2} paddingY={1} marginBottom={1}>
      <Box marginBottom={1}>
        <Text bold color="white">{title}</Text>
      </Box>
      {children}
    </Box>
  );
}

export function DashboardView() {
  const state = readState();
  const issues = readIssuesFile();
  const milestones = listDirs(brainPath("milestones"));

  const inboxLines = issues.split("\n");
  const inboxStart = inboxLines.findIndex((l) => l.trim() === "## Inbox");
  let inboxCount = 0;
  if (inboxStart !== -1) {
    for (let i = inboxStart + 1; i < inboxLines.length; i++) {
      if (inboxLines[i].startsWith("## ")) break;
      if (inboxLines[i].startsWith("- ")) inboxCount++;
    }
  }

  const researchedCount = listFiles(brainPath("issues"), ".md").length;

  let milName = "None";
  let stageName = "None";
  let stageProgress = { current: 0, total: 0 };

  if (state.current_milestone) {
    const milDir = milestones.find((d) => d.startsWith(state.current_milestone!));
    if (milDir) {
      milName = `${state.current_milestone} — ${milDir.replace(/^\d+_/, "").replace(/-/g, " ")}`;
      const stages = listFiles(brainPath("milestones", milDir), ".md");
      stageProgress.total = stages.length;

      if (state.current_stage) {
        const stageFile = stages.find((f) => f.startsWith(state.current_stage!));
        if (stageFile) {
          stageName = `${state.current_stage} — ${stageFile.replace(/^\d+-\d+_/, "").replace(/-/g, " ").replace(/\.md$/, "")}`;
          const idx = stages.indexOf(stageFile);
          stageProgress.current = idx;
        }
      }
    }
  }

  return (
    <Box flexDirection="column">
      <Card title="📍 Current Progress">
        <Box flexDirection="column" gap={0}>
          <Box>
            <Box width={14}><Text dimColor>Milestone:</Text></Box>
            <Text color="cyan">{milName}</Text>
          </Box>
          <Box>
            <Box width={14}><Text dimColor>Stage:</Text></Box>
            <Text color="cyan">{stageName}</Text>
          </Box>
          {stageProgress.total > 0 && (
            <Box marginTop={1}>
              <Box width={14}><Text dimColor>Progress:</Text></Box>
              <ProgressBar current={stageProgress.current} total={stageProgress.total} />
              <Text dimColor> ({stageProgress.current}/{stageProgress.total} stages)</Text>
            </Box>
          )}
        </Box>
      </Card>

      <Box gap={2}>
        <Card title="📊 Overview">
          <Box flexDirection="column">
            <Box>
              <Box width={16}><Text dimColor>Milestones:</Text></Box>
              <Text>{milestones.length}</Text>
            </Box>
            <Box>
              <Box width={16}><Text dimColor>Inbox issues:</Text></Box>
              <Text color={inboxCount > 0 ? "yellow" : undefined}>{inboxCount}</Text>
            </Box>
            <Box>
              <Box width={16}><Text dimColor>Researched:</Text></Box>
              <Text>{researchedCount}</Text>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}