"use client";

import { create } from "zustand";
import { buildMentorRecommendation } from "@/lib/mentor-engine";
import type { MentorRecommendation } from "@/types/mentor";

type MentorState = {
  activeRecommendation: MentorRecommendation;
  history: MentorRecommendation[];
  completeTopic: (subject: string, topic: string, missedTasks?: number) => void;
  generateFromCompletion: (input: {
    subject: string;
    topic: string;
    missedTasks: number;
  }) => void;
};

const initialRecommendation = buildMentorRecommendation("DBMS", "Normalization", 2);

export const useMentorStore = create<MentorState>((set) => ({
  activeRecommendation: initialRecommendation,
  history: [initialRecommendation],
  completeTopic: (subject, topic, missedTasks = 0) =>
    set((state) => {
      const recommendation = buildMentorRecommendation(subject, topic, missedTasks);
      return {
        activeRecommendation: recommendation,
        history: [recommendation, ...state.history].slice(0, 6),
      };
    }),
  generateFromCompletion: ({ subject, topic, missedTasks }) =>
    set((state) => {
      const recommendation = buildMentorRecommendation(subject, topic, missedTasks);
      return {
        activeRecommendation: recommendation,
        history: [recommendation, ...state.history].slice(0, 6),
      };
    }),
}));
