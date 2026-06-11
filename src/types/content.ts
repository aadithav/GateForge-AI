export type RoadmapStatus = "completed" | "current" | "locked" | "up-next";

export type MissionKind = "gate" | "placement" | "dsa" | "revision" | "build";

export type MissionItem = {
  id: MissionKind;
  label: string;
  title: string;
  context: string;
  estimate: string;
  optional?: boolean;
};

export type TodayMission = {
  dateLabel: string;
  totalEstimate: string;
  items: MissionItem[];
};

export type RoadmapTopic = {
  id: string;
  name: string;
  status: RoadmapStatus;
};

export type RoadmapSubject = {
  id: string;
  name: string;
  progress: number;
  topics: RoadmapTopic[];
};

export type PlacementTrack = {
  id: string;
  name: string;
  progress: number;
  current: string;
  next: string;
};

export type ProjectUnlock = {
  title: string;
  status: RoadmapStatus;
  requirement: string;
};

export type GuidanceAnalytics = {
  progress: number;
  streak: number;
  dsaSolved: number;
  weakSubjects: string[];
  strongSubjects: string[];
  predictedGateReadiness: number;
  predictedPlacementReadiness: number;
};
