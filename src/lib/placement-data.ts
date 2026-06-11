import type {
  DsaProblem,
  HeatmapDay,
  PlacementStats,
  PlacementSubject,
  TopicPerformance,
} from "@/types/placement";

export const placementSubjects: PlacementSubject[] = [
  { id: "dsa", name: "DSA", progress: 56, accuracy: 71, focus: "Graphs, DP, heaps" },
  { id: "oop", name: "OOP", progress: 48, accuracy: 68, focus: "SOLID and Java/C++ examples" },
  { id: "dbms", name: "DBMS", progress: 62, accuracy: 74, focus: "SQL joins and transactions" },
  { id: "os", name: "Operating Systems", progress: 51, accuracy: 66, focus: "Processes and memory" },
  { id: "cn", name: "Computer Networks", progress: 36, accuracy: 59, focus: "TCP, routing, subnetting" },
  { id: "sql", name: "SQL", progress: 44, accuracy: 63, focus: "Window functions and nested queries" },
  { id: "system-design", name: "System Design", progress: 24, accuracy: 52, focus: "APIs, caching, scaling basics" },
  { id: "hr-interview", name: "HR Interview", progress: 39, accuracy: 70, focus: "Stories, projects, clarity" },
  { id: "aptitude", name: "Aptitude", progress: 58, accuracy: 76, focus: "Speed, percentages, DI" },
];

export const dailyDsaProblems: DsaProblem[] = [
  {
    id: "dsa-1",
    name: "Flood Fill",
    link: "https://leetcode.com/problems/flood-fill/",
    difficulty: "Easy",
    topic: "Graphs",
    status: "unsolved",
    generatedReason: "Current GATE topic is graph traversal; start with DFS/BFS implementation fluency.",
  },
  {
    id: "dsa-2",
    name: "Valid Anagram",
    link: "https://leetcode.com/problems/valid-anagram/",
    difficulty: "Easy",
    topic: "Hashing",
    status: "solved",
    generatedReason: "Hashing accuracy is strong; keep speed warm with a low-friction problem.",
  },
  {
    id: "dsa-3",
    name: "Number of Islands",
    link: "https://leetcode.com/problems/number-of-islands/",
    difficulty: "Medium",
    topic: "Graphs",
    status: "unsolved",
    generatedReason: "Weak area: graph connected components. Direct overlap with Algorithms revision.",
  },
  {
    id: "dsa-4",
    name: "Top K Frequent Elements",
    link: "https://leetcode.com/problems/top-k-frequent-elements/",
    difficulty: "Medium",
    topic: "Heap",
    status: "unsolved",
    generatedReason: "Progress level needs heap patterns before harder scheduling problems.",
  },
  {
    id: "dsa-5",
    name: "Word Ladder",
    link: "https://leetcode.com/problems/word-ladder/",
    difficulty: "Hard",
    topic: "Graphs",
    status: "unsolved",
    generatedReason: "One hard graph problem to stretch BFS modeling and interview explanation quality.",
  },
];

export const topicPerformance: TopicPerformance[] = [
  { topic: "Arrays", solved: 34, attempted: 42, accuracy: 81, progress: 76 },
  { topic: "Hashing", solved: 21, attempted: 27, accuracy: 78, progress: 63 },
  { topic: "Graphs", solved: 13, attempted: 26, accuracy: 50, progress: 34 },
  { topic: "DP", solved: 9, attempted: 23, accuracy: 39, progress: 27 },
  { topic: "Trees", solved: 18, attempted: 28, accuracy: 64, progress: 49 },
  { topic: "SQL", solved: 15, attempted: 22, accuracy: 68, progress: 44 },
];

export const placementStats: PlacementStats = {
  totalSolved: 110,
  easySolved: 46,
  mediumSolved: 48,
  hardSolved: 16,
  streak: 9,
  accuracy: 67,
  readiness: 43,
  dsaProgress: 56,
  coreProgress: 50,
  interviewProgress: 32,
};

export const dsaSolvedOverTime = [
  { day: "Mon", solved: 4, target: 5 },
  { day: "Tue", solved: 5, target: 5 },
  { day: "Wed", solved: 3, target: 5 },
  { day: "Thu", solved: 6, target: 5 },
  { day: "Fri", solved: 5, target: 5 },
  { day: "Sat", solved: 8, target: 5 },
  { day: "Sun", solved: 4, target: 5 },
];

export const difficultyDistribution = [
  { difficulty: "Easy", solved: placementStats.easySolved },
  { difficulty: "Medium", solved: placementStats.mediumSolved },
  { difficulty: "Hard", solved: placementStats.hardSolved },
];

export const placementWeeklyPerformance = [
  { week: "W1", planned: 30, solved: 22, accuracy: 61 },
  { week: "W2", planned: 35, solved: 29, accuracy: 66 },
  { week: "W3", planned: 35, solved: 26, accuracy: 64 },
  { week: "W4", planned: 40, solved: 33, accuracy: 71 },
];

export const activityHeatmap: HeatmapDay[] = Array.from({ length: 35 }, (_, index) => {
  const counts = [0, 1, 2, 4, 5, 3, 0, 2, 5, 6, 3, 1, 4, 0, 2, 3, 5, 7, 4, 1, 0, 3, 4, 6, 5, 2, 1, 4, 5, 0, 3, 6, 5, 4, 2];
  return {
    date: `Day ${index + 1}`,
    count: counts[index],
  };
});
