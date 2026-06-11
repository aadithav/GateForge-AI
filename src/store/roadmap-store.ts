"use client";

import { create } from "zustand";
import { roadmapSubjects, todayMission } from "@/lib/content-engine";
import type { MissionKind, RoadmapSubject } from "@/types/content";

type RoadmapState = {
  subjects: RoadmapSubject[];
  completedMissionItems: Record<MissionKind, boolean>;
  currentDayOffset: number;
  toggleMissionItem: (id: MissionKind) => void;
  advanceTomorrow: () => void;
};

function advanceCurrentTopic(subjects: RoadmapSubject[], subjectId: string) {
  return subjects.map((subject) => {
    if (subject.id !== subjectId) {
      return subject;
    }

    const currentIndex = subject.topics.findIndex((topic) => topic.status === "current");
    if (currentIndex < 0) {
      return subject;
    }

    return {
      ...subject,
      progress: Math.min(100, subject.progress + 8),
      topics: subject.topics.map((topic, index) => {
        if (index === currentIndex) {
          return { ...topic, status: "completed" as const };
        }
        if (index === currentIndex + 1) {
          return { ...topic, status: "current" as const };
        }
        if (index === currentIndex + 2 && topic.status === "locked") {
          return { ...topic, status: "up-next" as const };
        }
        return topic;
      }),
    };
  });
}

const emptyCompletion = Object.fromEntries(
  todayMission.items.map((item) => [item.id, false]),
) as Record<MissionKind, boolean>;

export const useRoadmapStore = create<RoadmapState>((set) => ({
  subjects: roadmapSubjects,
  completedMissionItems: emptyCompletion,
  currentDayOffset: 0,
  toggleMissionItem: (id) =>
    set((state) => {
      const completedMissionItems = {
        ...state.completedMissionItems,
        [id]: !state.completedMissionItems[id],
      };
      const subjects =
        id === "gate" && completedMissionItems[id]
          ? advanceCurrentTopic(state.subjects, "dbms")
          : state.subjects;

      return { completedMissionItems, subjects };
    }),
  advanceTomorrow: () =>
    set((state) => ({
      completedMissionItems: emptyCompletion,
      currentDayOffset: state.currentDayOffset + 1,
      subjects: advanceCurrentTopic(state.subjects, "operating-systems"),
    })),
}));
