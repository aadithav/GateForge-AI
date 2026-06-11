import { gateSubjects } from "@/lib/constants";
import { topicPerformance } from "@/lib/placement-data";
import type { MentorRecommendation } from "@/types/mentor";

const topicProjectMap: Record<string, string> = {
  Normalization: "SchemaForge Normalization Analyzer",
  SQL: "QueryLens SQL Practice Platform",
  "Graph Algorithms": "RouteWise Graph Visualizer",
  "Transport Layer": "TCPFlow Network Simulator",
  "CPU Scheduling": "SchedLab OS Simulator",
  "Memory Management": "PagePilot Memory Visualizer",
};

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function findNextTopic(subjectName: string, topicName: string) {
  const subject = gateSubjects.find((item) => item.name === subjectName);
  const topicIndex = subject?.topics.findIndex((topic) => topic.name === topicName);

  if (!subject || topicIndex === undefined || topicIndex < 0) {
    return "Pick the weakest high-weightage topic from your dashboard.";
  }

  return subject.topics[topicIndex + 1]?.name ?? "Start mixed PYQ revision for this subject.";
}

function recommendDsa(topicName: string) {
  const weakest = topicPerformance
    .filter((topic) => topic.progress < 50 || topic.accuracy < 65)
    .map((topic) => topic.topic);
  const graphBias = topicName.toLowerCase().includes("graph");
  const dbBias = topicName.toLowerCase().includes("sql") || topicName.toLowerCase().includes("normalization");

  if (graphBias) {
    return [
      {
        name: "Number of Islands",
        link: "https://leetcode.com/problems/number-of-islands/",
        difficulty: "Medium" as const,
        topic: "Graphs",
        reason: "Directly reinforces traversal and connected component modeling.",
      },
      {
        name: "Course Schedule",
        link: "https://leetcode.com/problems/course-schedule/",
        difficulty: "Medium" as const,
        topic: "Graphs",
        reason: "Weak graph progress needs topological-sort reps.",
      },
    ];
  }

  if (dbBias) {
    return [
      {
        name: "Department Highest Salary",
        link: "https://leetcode.com/problems/department-highest-salary/",
        difficulty: "Medium" as const,
        topic: "SQL",
        reason: "DBMS completion should immediately become SQL interview fluency.",
      },
      {
        name: "Customers Who Never Order",
        link: "https://leetcode.com/problems/customers-who-never-order/",
        difficulty: "Easy" as const,
        topic: "SQL",
        reason: "Checks joins and null reasoning without wasting time.",
      },
    ];
  }

  return [
    {
      name: "Top K Frequent Elements",
      link: "https://leetcode.com/problems/top-k-frequent-elements/",
      difficulty: "Medium" as const,
      topic: weakest[0] ?? "Heap",
      reason: "Targets your weakest current placement topic.",
    },
    {
      name: "Binary Search",
      link: "https://leetcode.com/problems/binary-search/",
      difficulty: "Easy" as const,
      topic: "Arrays",
      reason: "Keeps implementation speed above interview baseline.",
    },
  ];
}

export function buildMentorRecommendation(
  subjectName = "DBMS",
  topicName = "Normalization",
  missedTasks = 2,
): MentorRecommendation {
  const projectTitle =
    topicProjectMap[topicName] ?? `${topicName.replace(/\s+/g, "")} Mastery Lab`;
  const strictRecovery =
    missedTasks > 0
      ? [
          `Move ${missedTasks} missed task${missedTasks > 1 ? "s" : ""} to tomorrow's first deep-work block.`,
          "Cut optional learning by 30 minutes until recovery tasks are cleared.",
          "Do one 25-minute active recall session before opening new content.",
        ]
      : ["No recovery needed. Maintain the daily baseline and do not add vanity tasks."];

  return {
    id: `${subjectName}-${topicName}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    subject: subjectName,
    topic: topicName,
    createdAt: new Date().toISOString(),
    revision: {
      tomorrow: addDays(1),
      after7Days: addDays(7),
      after30Days: addDays(30),
    },
    dsa: recommendDsa(topicName),
    project: {
      title: projectTitle,
      difficulty: topicName === "Normalization" ? "Medium" : "Hard",
      techStack: ["Next.js", "TypeScript", "Supabase", "TailwindCSS", "Recharts"],
      folderStructure: [
        "src/app/(dashboard)/project",
        "src/components/project",
        "src/lib/analyzers",
        "src/store/project-store.ts",
        "supabase/migrations",
      ],
      features: [
        "Interactive input workspace",
        "Rule-based analysis engine",
        "Progress and correctness dashboard",
        "Exportable study notes",
      ],
      stretchGoals: [
        "AI explanation layer",
        "Shareable public report",
        "Test-case generator",
      ],
    },
    github: {
      repositoryStructure: [
        "README.md",
        "docs/architecture.md",
        "src/",
        "supabase/schema.sql",
        "tests/",
        ".github/workflows/ci.yml",
      ],
      readme: `# ${projectTitle}

## Problem
Students understand ${topicName} theoretically but struggle to apply it under interview and GATE pressure.

## Solution
${projectTitle} converts ${topicName} practice into interactive checks, analytics, and explainable feedback.

## Tech Stack
Next.js, TypeScript, Supabase, TailwindCSS, Recharts

## Features
- Interactive ${topicName} workspace
- Rule-based feedback
- Progress analytics
- Exportable notes

## Local Setup
\`\`\`bash
npm install
npm run dev
\`\`\`
`,
      commitMilestones: [
        "chore: scaffold project and schema",
        "feat: implement core analyzer",
        "feat: add dashboard and progress tracking",
        "test: add analyzer edge cases",
        "docs: polish README and architecture notes",
      ],
    },
    resumeBullets: [
      `Built ${projectTitle}, a ${topicName}-focused learning tool using Next.js, TypeScript, and Supabase.`,
      "Implemented analytics-driven feedback loops to improve topic mastery and revision consistency.",
      "Designed a production-style repository with schema, reusable components, and documented milestones.",
    ],
    linkedinPost: `I just completed ${topicName} in ${subjectName} and converted it into a project: ${projectTitle}.

The goal is simple: do not stop at notes. Build something that proves understanding.

What it includes:
- Interactive ${topicName} practice
- Feedback and analytics
- Clean Next.js + TypeScript architecture
- Supabase-backed progress tracking

Next target: ${findNextTopic(subjectName, topicName)}.`,
    nextTopic: findNextTopic(subjectName, topicName),
    recoveryPlan: strictRecovery,
    analytics: {
      gateReadiness: 49,
      placementReadiness: 45,
      studyConsistency: missedTasks > 0 ? 58 : 72,
      projectProgress: 18,
    },
    verdict:
      missedTasks > 0
        ? "You completed the topic, good. But missed work means you do not get to expand the plan yet. Recover first."
        : "Good. Now prove the topic through revision, DSA transfer, and one public project artifact.",
  };
}
