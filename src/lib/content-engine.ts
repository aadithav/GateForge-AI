import type {
  GuidanceAnalytics,
  PlacementTrack,
  ProjectUnlock,
  RoadmapSubject,
  TodayMission,
} from "@/types/content";

export const roadmapSubjects: RoadmapSubject[] = [
  {
    id: "engineering-mathematics",
    name: "Engineering Mathematics",
    progress: 42,
    topics: [
      { id: "linear-algebra", name: "Linear Algebra", status: "completed" },
      { id: "calculus", name: "Calculus", status: "current" },
      { id: "probability", name: "Probability", status: "up-next" },
      { id: "discrete-math", name: "Discrete Mathematics", status: "locked" },
    ],
  },
  {
    id: "data-structures",
    name: "Data Structures",
    progress: 58,
    topics: [
      { id: "arrays-strings", name: "Arrays and Strings", status: "completed" },
      { id: "trees", name: "Trees", status: "completed" },
      { id: "graphs", name: "Graphs", status: "current" },
      { id: "hashing", name: "Hashing", status: "up-next" },
    ],
  },
  {
    id: "algorithms",
    name: "Algorithms",
    progress: 35,
    topics: [
      { id: "analysis", name: "Asymptotic Analysis", status: "completed" },
      { id: "greedy", name: "Greedy Algorithms", status: "current" },
      { id: "dynamic-programming", name: "Dynamic Programming", status: "up-next" },
      { id: "graph-algorithms", name: "Graph Algorithms", status: "locked" },
    ],
  },
  {
    id: "dbms",
    name: "DBMS",
    progress: 61,
    topics: [
      { id: "er-model", name: "ER Model", status: "completed" },
      { id: "sql", name: "SQL", status: "completed" },
      { id: "normalization", name: "Normalization", status: "current" },
      { id: "transactions", name: "Transactions", status: "up-next" },
    ],
  },
  {
    id: "operating-systems",
    name: "Operating Systems",
    progress: 47,
    topics: [
      { id: "processes", name: "Processes and Threads", status: "completed" },
      { id: "scheduling", name: "CPU Scheduling", status: "current" },
      { id: "memory", name: "Memory Management", status: "up-next" },
      { id: "file-systems", name: "File Systems", status: "locked" },
    ],
  },
  {
    id: "computer-networks",
    name: "Computer Networks",
    progress: 29,
    topics: [
      { id: "network-models", name: "Network Models", status: "completed" },
      { id: "transport-layer", name: "Transport Layer", status: "current" },
      { id: "network-layer", name: "Network Layer", status: "up-next" },
      { id: "application-layer", name: "Application Layer", status: "locked" },
    ],
  },
  {
    id: "computer-organization",
    name: "Computer Organization",
    progress: 26,
    topics: [
      { id: "instructions", name: "Instruction Set Architecture", status: "current" },
      { id: "pipelining", name: "Pipelining", status: "up-next" },
      { id: "memory-hierarchy", name: "Memory Hierarchy", status: "locked" },
    ],
  },
  {
    id: "digital-logic",
    name: "Digital Logic",
    progress: 68,
    topics: [
      { id: "boolean-algebra", name: "Boolean Algebra", status: "completed" },
      { id: "k-maps", name: "K-Maps", status: "completed" },
      { id: "combinational", name: "Combinational Circuits", status: "current" },
      { id: "sequential", name: "Sequential Circuits", status: "up-next" },
    ],
  },
  {
    id: "theory-of-computation",
    name: "Theory of Computation",
    progress: 31,
    topics: [
      { id: "regular-languages", name: "Regular Languages", status: "current" },
      { id: "context-free", name: "Context Free Languages", status: "up-next" },
      { id: "pda", name: "Pushdown Automata", status: "locked" },
    ],
  },
  {
    id: "compiler-design",
    name: "Compiler Design",
    progress: 18,
    topics: [
      { id: "lexical-analysis", name: "Lexical Analysis", status: "current" },
      { id: "parsing", name: "Parsing", status: "up-next" },
      { id: "syntax-directed", name: "Syntax Directed Translation", status: "locked" },
    ],
  },
  {
    id: "general-aptitude",
    name: "General Aptitude",
    progress: 53,
    topics: [
      { id: "verbal", name: "Verbal Ability", status: "completed" },
      { id: "quantitative", name: "Quantitative Aptitude", status: "current" },
      { id: "reasoning", name: "Reasoning", status: "up-next" },
    ],
  },
];

export const todayMission: TodayMission = {
  dateLabel: "Today",
  totalEstimate: "4 hr 20 min",
  items: [
    {
      id: "gate",
      label: "GATE task",
      title: "DBMS - Normalization",
      context: "Current topic in the DBMS roadmap.",
      estimate: "90 min",
    },
    {
      id: "placement",
      label: "Placement task",
      title: "Graphs + SQL joins",
      context: "Keep placement prep separate from GATE theory.",
      estimate: "45 min",
    },
    {
      id: "dsa",
      label: "Daily DSA",
      title: "2 Easy, 2 Medium, 1 Hard",
      context: "Problems selected from weak graph and SQL areas.",
      estimate: "90 min",
    },
    {
      id: "revision",
      label: "Revision task",
      title: "OS - CPU Scheduling",
      context: "Due from spaced revision queue.",
      estimate: "35 min",
    },
    {
      id: "build",
      label: "Build something",
      title: "SchemaForge project outline",
      context: "Unlocked after ER Model and SQL completion.",
      estimate: "20 min",
      optional: true,
    },
  ],
};

export const placementTracks: PlacementTrack[] = [
  { id: "dsa", name: "DSA", progress: 56, current: "Graphs", next: "Dynamic Programming" },
  { id: "core", name: "Core Subjects", progress: 50, current: "DBMS joins", next: "OS memory" },
  { id: "interview", name: "Interview Preparation", progress: 32, current: "Project explanation", next: "HR stories" },
  { id: "projects", name: "Projects", progress: 18, current: "SchemaForge outline", next: "MVP repository" },
];

export const projectUnlocks: ProjectUnlock[] = [
  {
    title: "SchemaForge Normalization Analyzer",
    status: "current",
    requirement: "Unlocked by ER Model + SQL completion. Finish Normalization to begin MVP.",
  },
  {
    title: "RouteWise Graph Visualizer",
    status: "locked",
    requirement: "Unlocks after Graphs + Graph Algorithms.",
  },
  {
    title: "SchedLab OS Simulator",
    status: "locked",
    requirement: "Unlocks after CPU Scheduling + Processes.",
  },
];

export const guidanceAnalytics: GuidanceAnalytics = {
  progress: 48,
  streak: 12,
  dsaSolved: 110,
  weakSubjects: ["Computer Networks", "Compiler Design", "Computer Organization"],
  strongSubjects: ["Digital Logic", "DBMS", "Data Structures"],
  predictedGateReadiness: 49,
  predictedPlacementReadiness: 45,
};
