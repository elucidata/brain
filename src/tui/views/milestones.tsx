import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { brainPath, listDirs, listFiles, readMarkdown } from "../../lib/fs.js";
import { readState } from "../../lib/state.js";

interface MilestoneData {
  id: string;
  dirName: string;
  name: string;
  stages: StageData[];
}

interface StageData {
  id: string;
  fileName: string;
  name: string;
  status: string;
}

function loadMilestones(): MilestoneData[] {
  const dirs = listDirs(brainPath("milestones"));
  return dirs.map((dir) => {
    const id = dir.split("_")[0];
    const name = dir.replace(/^\d+_/, "").replace(/-/g, " ");
    const stageFiles = listFiles(brainPath("milestones", dir), ".md");
    const stages: StageData[] = stageFiles.map((f) => {
      const stageId = f.split("_")[0];
      const stageName = f.replace(/^\d+-\d+_/, "").replace(/-/g, " ").replace(/\.md$/, "");
      let status = "pending";
      try {
        const { data } = readMarkdown(brainPath("milestones", dir, f));
        status = data.status ?? "pending";
      } catch {}
      return { id: stageId, fileName: f, name: stageName, status };
    });
    return { id, dirName: dir, name, stages };
  });
}

function StatusBadge({ status, isCurrent }: { status: string; isCurrent: boolean }) {
  if (isCurrent) return <Text color="cyan"> ● active</Text>;
  if (status === "done") return <Text color="green"> ✓ done</Text>;
  return <Text dimColor> ○ pending</Text>;
}

export function MilestonesView() {
  const state = readState();
  const milestones = loadMilestones();
  const [selectedMil, setSelectedMil] = useState(0);
  const [selectedStage, setSelectedStage] = useState(-1);
  const [drillIn, setDrillIn] = useState(false);

  useInput((input, key) => {
    if (!drillIn) {
      if (key.upArrow || input === "k") {
        setSelectedMil((prev) => Math.max(0, prev - 1));
      }
      if (key.downArrow || input === "j") {
        setSelectedMil((prev) => Math.min(milestones.length - 1, prev + 1));
      }
      if (key.return || input === "e") {
        if (milestones[selectedMil]?.stages.length > 0) {
          setDrillIn(true);
          setSelectedStage(0);
        }
      }
    } else {
      const stages = milestones[selectedMil]?.stages ?? [];
      if (key.upArrow || input === "k") {
        setSelectedStage((prev) => Math.max(0, prev - 1));
      }
      if (key.downArrow || input === "j") {
        setSelectedStage((prev) => Math.min(stages.length - 1, prev + 1));
      }
      if (key.escape || input === "b") {
        setDrillIn(false);
        setSelectedStage(-1);
      }
    }
  });

  if (milestones.length === 0) {
    return (
      <Box>
        <Text dimColor>No milestones yet. Run `brain milestone new "Name"` to create one.</Text>
      </Box>
    );
  }

  if (drillIn) {
    const mil = milestones[selectedMil];
    return (
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text dimColor>← b to go back</Text>
        </Box>
        <Box marginBottom={1}>
          <Text bold color="cyan">{mil.id}</Text>
          <Text bold> — {mil.name}</Text>
        </Box>
        {mil.stages.map((stage, i) => {
          const isCurrent = stage.id === state.current_stage;
          const isSelected = i === selectedStage;
          return (
            <Box key={stage.id}>
              <Text>{isSelected ? "❯ " : "  "}</Text>
              <Text dimColor>{stage.id} </Text>
              <Text color={isSelected ? "white" : undefined} bold={isSelected}>
                {stage.name}
              </Text>
              <StatusBadge status={stage.status} isCurrent={isCurrent} />
            </Box>
          );
        })}
        <Box marginTop={1}>
          <Text dimColor>↑/↓ navigate · b back</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      {milestones.map((mil, i) => {
        const isCurrent = mil.id === state.current_milestone;
        const isSelected = i === selectedMil;
        const doneCount = mil.stages.filter(
          (s) => s.status === "done" || (state.current_stage && s.id < state.current_stage && mil.id === state.current_milestone)
        ).length;
        return (
          <Box key={mil.id} flexDirection="column" marginBottom={1}>
            <Box>
              <Text>{isSelected ? "❯ " : "  "}</Text>
              <Text bold color={isSelected ? "cyan" : "white"}>
                {mil.id}
              </Text>
              <Text color={isSelected ? "white" : undefined} bold={isSelected}>
                {" "}— {mil.name}
              </Text>
              {isCurrent && <Text color="cyan"> ◀ current</Text>}
            </Box>
            <Box>
              <Text>  </Text>
              <Text dimColor>
                {mil.stages.length} stage{mil.stages.length !== 1 ? "s" : ""}
                {mil.stages.length > 0 && ` · ${doneCount} done`}
              </Text>
            </Box>
          </Box>
        );
      })}
      <Box marginTop={1}>
        <Text dimColor>↑/↓ navigate · enter to expand · q quit</Text>
      </Box>
    </Box>
  );
}