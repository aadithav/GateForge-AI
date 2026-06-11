import type { Difficulty } from "@/types/study";

export type ProblemStatus = "unsolved" | "solved" | "skipped";

export type DsaProblem = {
  id: string;
  name: string;
  link: string;
  difficulty: Difficulty;
  topic: string;
  status: ProblemStatus;
  generatedReason: string;
};

export type PlacementSubject = {
  id: string;
  name: string;
  progress: number;
  accuracy: number;
  focus: string;
};

export type TopicPerformance = {
  topic: string;
  solved: number;
  attempted: number;
  accuracy: number;
  progress: number;
};

export type HeatmapDay = {
  date: string;
  count: number;
};

export type PlacementStats = {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  streak: number;
  accuracy: number;
  readiness: number;
  dsaProgress: number;
  coreProgress: number;
  interviewProgress: number;
};
