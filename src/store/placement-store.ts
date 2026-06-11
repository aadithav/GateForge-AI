"use client";

import { create } from "zustand";
import {
  dailyDsaProblems,
  placementStats,
  topicPerformance,
} from "@/lib/placement-data";
import type { Difficulty } from "@/types/study";
import type { DsaProblem, PlacementStats, ProblemStatus } from "@/types/placement";

const templates: Record<Difficulty, Array<Omit<DsaProblem, "id" | "difficulty" | "status">>> = {
  Easy: [
    {
      name: "Binary Search",
      link: "https://leetcode.com/problems/binary-search/",
      topic: "Arrays",
      generatedReason: "Easy accuracy should stay above 85%; this checks implementation speed.",
    },
    {
      name: "Linked List Cycle",
      link: "https://leetcode.com/problems/linked-list-cycle/",
      topic: "Linked List",
      generatedReason: "Pointer fundamentals are required for interview confidence.",
    },
  ],
  Medium: [
    {
      name: "Course Schedule",
      link: "https://leetcode.com/problems/course-schedule/",
      topic: "Graphs",
      generatedReason: "Weak graph progress and current Algorithms overlap.",
    },
    {
      name: "Longest Substring Without Repeating Characters",
      link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      topic: "Sliding Window",
      generatedReason: "Improves pattern recognition for medium interviews.",
    },
  ],
  Hard: [
    {
      name: "Merge k Sorted Lists",
      link: "https://leetcode.com/problems/merge-k-sorted-lists/",
      topic: "Heap",
      generatedReason: "Hard slot targets heap confidence and clean explanation.",
    },
  ],
};

type PlacementState = {
  problems: DsaProblem[];
  stats: PlacementStats;
  generateDailyDsaSet: () => void;
  updateProblemStatus: (problemId: string, status: ProblemStatus) => void;
};

function buildDailySet(): DsaProblem[] {
  const weakTopics = topicPerformance
    .filter((topic) => topic.progress < 50 || topic.accuracy < 65)
    .map((topic) => topic.topic);

  return [
    ...templates.Easy.map((problem, index) => ({
      ...problem,
      id: `easy-${Date.now()}-${index}`,
      difficulty: "Easy" as const,
      status: "unsolved" as const,
      generatedReason: weakTopics.includes(problem.topic)
        ? `Weak area detected: ${problem.topic}. ${problem.generatedReason}`
        : problem.generatedReason,
    })),
    ...templates.Medium.map((problem, index) => ({
      ...problem,
      id: `medium-${Date.now()}-${index}`,
      difficulty: "Medium" as const,
      status: "unsolved" as const,
      generatedReason: weakTopics.includes(problem.topic)
        ? `Weak area detected: ${problem.topic}. ${problem.generatedReason}`
        : problem.generatedReason,
    })),
    ...templates.Hard.map((problem, index) => ({
      ...problem,
      id: `hard-${Date.now()}-${index}`,
      difficulty: "Hard" as const,
      status: "unsolved" as const,
      generatedReason: weakTopics.includes(problem.topic)
        ? `Weak area detected: ${problem.topic}. ${problem.generatedReason}`
        : problem.generatedReason,
    })),
  ];
}

export const usePlacementStore = create<PlacementState>((set) => ({
  problems: dailyDsaProblems,
  stats: placementStats,
  generateDailyDsaSet: () => set({ problems: buildDailySet() }),
  updateProblemStatus: (problemId, status) =>
    set((state) => {
      const previous = state.problems.find((problem) => problem.id === problemId);
      const problems = state.problems.map((problem) =>
        problem.id === problemId ? { ...problem, status } : problem,
      );
      const shouldIncrement = previous?.status !== "solved" && status === "solved";
      const stats = shouldIncrement
        ? {
            ...state.stats,
            totalSolved: state.stats.totalSolved + 1,
            easySolved:
              previous?.difficulty === "Easy"
                ? state.stats.easySolved + 1
                : state.stats.easySolved,
            mediumSolved:
              previous?.difficulty === "Medium"
                ? state.stats.mediumSolved + 1
                : state.stats.mediumSolved,
            hardSolved:
              previous?.difficulty === "Hard"
                ? state.stats.hardSolved + 1
                : state.stats.hardSolved,
            streak: state.stats.streak + 1,
            dsaProgress: Math.min(100, state.stats.dsaProgress + 1),
          }
        : state.stats;

      return { problems, stats };
    }),
}));
