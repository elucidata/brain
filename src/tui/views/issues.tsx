import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { brainPath, listFiles, readMarkdown } from "../../lib/fs.js";
import { readIssuesFile } from "../../lib/issues.js";

interface InboxItem { text: string; }

interface ResearchedIssue {
  id: string;
  fileName: string;
  title: string;
  status: string;
  created: string;
  content: string;
}

interface ParsedIssues {
  inbox: InboxItem[];
  researched: ResearchedIssue[];
  wontfix: string[];
}

function parseIssues(): ParsedIssues {
  const raw = readIssuesFile();
  const lines = raw.split("\n");

  const inbox: InboxItem[] = [];
  const wontfix: string[] = [];
  let section = "";

  for (const line of lines) {
    if (line.startsWith("## ")) {
      section = line.replace("## ", "").trim();
      continue;
    }
    if (line.startsWith("- ") && section === "Inbox") {
      inbox.push({ text: line.replace(/^- /, "") });
    }
    if (line.startsWith("- ") && section === "Won't Fix / By Design") {
      wontfix.push(line.replace(/^- /, ""));
    }
  }

  const files = listFiles(brainPath("issues"), ".md");
  const researched: ResearchedIssue[] = files.map((f) => {
    const { data, content } = readMarkdown(brainPath("issues", f));
    const id = String(data.number ?? f.split("_")[0]);
    const title = f.replace(/^\d+_/, "").replace(/-/g, " ").replace(/\.md$/, "");
    return {
      id,
      fileName: f,
      title,
      status: data.status ?? "UNKNOWN",
      created: data.created ?? "",
      content: content.trim(),
    };
  });

  return { inbox, researched, wontfix };
}

function StatusColor({ status }: { status: string }) {
  const colors: Record<string, string> = {
    RESEARCHED: "blue",
    STAGED: "yellow",
    FIXED: "green",
  };
  return <Text color={colors[status] ?? "gray"}> [{status}]</Text>;
}

export function IssuesView() {
  const { inbox, researched, wontfix } = parseIssues();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [viewingIssue, setViewingIssue] = useState<ResearchedIssue | null>(null);

  const items: { type: "inbox" | "researched"; label: string; issue?: ResearchedIssue }[] = [];
  for (const item of inbox) {
    items.push({ type: "inbox", label: item.text });
  }
  for (const issue of researched) {
    items.push({ type: "researched", label: `${issue.id}: ${issue.title}`, issue });
  }

  useInput((input, key) => {
    if (viewingIssue) {
      if (key.escape || input === "b") {
        setViewingIssue(null);
      }
      return;
    }

    if (key.upArrow || input === "k") {
      setSelectedIdx((prev) => Math.max(0, prev - 1));
    }
    if (key.downArrow || input === "j") {
      setSelectedIdx((prev) => Math.min(items.length - 1, prev + 1));
    }
    if (key.return || input === "e") {
      const item = items[selectedIdx];
      if (item?.issue) {
        setViewingIssue(item.issue);
      }
    }
  });

  if (viewingIssue) {
    const lines = viewingIssue.content.split("\n").slice(0, 25);
    return (
      <Box flexDirection="column">
        <Box marginBottom={1}>
          <Text dimColor>← b to go back</Text>
        </Box>
        <Box marginBottom={1}>
          <Text bold color="cyan">{viewingIssue.id}</Text>
          <Text bold>: {viewingIssue.title}</Text>
          <StatusColor status={viewingIssue.status} />
        </Box>
        {viewingIssue.created && (
          <Box marginBottom={1}>
            <Text dimColor>Created: {viewingIssue.created}</Text>
          </Box>
        )}
        <Box flexDirection="column" borderStyle="round" borderColor="gray" paddingX={2} paddingY={1}>
          {lines.map((line, i) => (
            <Text key={i} wrap="truncate">{line}</Text>
          ))}
          {viewingIssue.content.split("\n").length > 25 && (
            <Text dimColor>... (truncated, see full file)</Text>
          )}
        </Box>
        <Box marginTop={1}>
          <Text dimColor>File: _brain/issues/{viewingIssue.fileName}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold color="yellow">Inbox ({inbox.length})</Text>
      </Box>
      {inbox.length === 0 && (
        <Box marginBottom={1}>
          <Text dimColor>  No inbox items.</Text>
        </Box>
      )}
      {inbox.map((item, i) => {
        const isSelected = i === selectedIdx;
        return (
          <Box key={`inbox-${i}`}>
            <Text>{isSelected ? "❯ " : "  "}</Text>
            <Text dimColor>• </Text>
            <Text color={isSelected ? "white" : undefined} bold={isSelected}>{item.text}</Text>
          </Box>
        );
      })}

      <Box marginTop={1} marginBottom={1}>
        <Text bold color="blue">Researched ({researched.length})</Text>
      </Box>
      {researched.length === 0 && (
        <Box marginBottom={1}>
          <Text dimColor>  No researched issues.</Text>
        </Box>
      )}
      {researched.map((issue, i) => {
        const globalIdx = inbox.length + i;
        const isSelected = globalIdx === selectedIdx;
        return (
          <Box key={issue.id}>
            <Text>{isSelected ? "❯ " : "  "}</Text>
            <Text dimColor>{issue.id} </Text>
            <Text color={isSelected ? "white" : undefined} bold={isSelected}>{issue.title}</Text>
            <StatusColor status={issue.status} />
          </Box>
        );
      })}

      {wontfix.length > 0 && (
        <>
          <Box marginTop={1} marginBottom={1}>
            <Text bold dimColor>Won't Fix ({wontfix.length})</Text>
          </Box>
          {wontfix.map((item, i) => (
            <Box key={`wf-${i}`}>
              <Text dimColor>  ✕ {item}</Text>
            </Box>
          ))}
        </>
      )}

      <Box marginTop={1}>
        <Text dimColor>↑/↓ navigate · enter to view researched · q quit</Text>
      </Box>
    </Box>
  );
}