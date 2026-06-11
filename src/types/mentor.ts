import type { Difficulty } from "@/types/study";

export type MentorRevisionPlan = {
  tomorrow: string;
  after7Days: string;
  after30Days: string;
};

export type MentorDsaQuestion = {
  name: string;
  link: string;
  difficulty: Difficulty;
  topic: string;
  reason: string;
};

export type ProjectRecommendation = {
  title: string;
  difficulty: Difficulty;
  techStack: string[];
  folderStructure: string[];
  features: string[];
  stretchGoals: string[];
};

export type GithubPlan = {
  repositoryStructure: string[];
  readme: string;
  commitMilestones: string[];
};

export type MentorAnalytics = {
  gateReadiness: number;
  placementReadiness: number;
  studyConsistency: number;
  projectProgress: number;
};

export type MentorRecommendation = {
  id: string;
  subject: string;
  topic: string;
  createdAt: string;
  revision: MentorRevisionPlan;
  dsa: MentorDsaQuestion[];
  project: ProjectRecommendation;
  github: GithubPlan;
  resumeBullets: string[];
  linkedinPost: string;
  nextTopic: string;
  recoveryPlan: string[];
  analytics: MentorAnalytics;
  verdict: string;
};
