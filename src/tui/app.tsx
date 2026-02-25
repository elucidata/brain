import React, { useState } from "react";
import { render, Box, Text, useInput, useApp } from "ink";
import { DashboardView } from "./views/dashboard.js";
import { MilestonesView } from "./views/milestones.js";
import { IssuesView } from "./views/issues.js";

const TABS = ["Dashboard", "Milestones", "Issues"] as const;
type Tab = (typeof TABS)[number];

function App() {
  const { exit } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");

  useInput((input, key) => {
    if (input === "q") {
      exit();
      return;
    }
    if (key.tab || input === "l" || key.rightArrow) {
      const idx = TABS.indexOf(activeTab);
      setActiveTab(TABS[(idx + 1) % TABS.length]);
    }
    if (input === "h" || key.leftArrow) {
      const idx = TABS.indexOf(activeTab);
      setActiveTab(TABS[(idx - 1 + TABS.length) % TABS.length]);
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">🧠 Brain</Text>
        <Text dimColor> — Development Workflow</Text>
      </Box>

      <Box gap={1} marginBottom={1}>
        {TABS.map((tab) => (
          <Box key={tab} paddingX={1}>
            {tab === activeTab ? (
              <Text bold inverse color="cyan"> {tab} </Text>
            ) : (
              <Text dimColor> {tab} </Text>
            )}
          </Box>
        ))}
        <Box flexGrow={1} />
        <Text dimColor>←/→ switch tabs · q quit</Text>
      </Box>

      <Box marginBottom={1}>
        <Text dimColor>{"─".repeat(60)}</Text>
      </Box>

      <Box flexDirection="column">
        {activeTab === "Dashboard" && <DashboardView />}
        {activeTab === "Milestones" && <MilestonesView />}
        {activeTab === "Issues" && <IssuesView />}
      </Box>
    </Box>
  );
}

export function launchTUI() {
  render(<App />);
}