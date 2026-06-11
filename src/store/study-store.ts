"use client";

import { create } from "zustand";
import { clamp } from "@/lib/utils";
import { revisionQueue, todayTasks } from "@/lib/constants";
import type { RevisionItem, RevisionStage, StudyTask, TaskStatus } from "@/types/study";

const nextRevisionStage: Record<RevisionStage, RevisionStage | null> = {
  first: "second",
  second: "third",
  third: null,
};

const spacingByStage: Record<RevisionStage, number> = {
  first: 1,
  second: 3,
  third: 10,
};

type StudyState = {
  streak: number;
  studyHours: number;
  tasks: StudyTask[];
  futureTasks: StudyTask[];
  revisions: RevisionItem[];
  revisionDebt: number;
  completedToday: number;
  completionRate: number;
  revisionStatus: string;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  generateDailyPlan: () => void;
  regenerateSchedule: () => void;
};

export const useStudyStore = create<StudyState>((set) => ({
  streak: 12,
  studyHours: 3.5,
  tasks: todayTasks,
  futureTasks: [],
  revisions: revisionQueue,
  revisionDebt: 7,
  completedToday: todayTasks.filter((task) => task.status === "completed").length,
  completionRate: Math.round(
    (todayTasks.filter((task) => task.status === "completed").length /
      todayTasks.length) *
      100,
  ),
  revisionStatus: "7 due: 2 urgent, 4 this week, 1 overdue",
  updateTaskStatus: (taskId, status) =>
    set((state) => {
      const tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      );
      const completedTask = tasks.find(
        (task) => task.id === taskId && task.status === "completed",
      );
      const newRevision =
        completedTask?.mode === "revision" && completedTask.revisionStage
          ? nextRevisionStage[completedTask.revisionStage]
          : null;
      const revisions =
        newRevision && completedTask
          ? [
              ...state.revisions.map((revision) =>
                revision.topic === completedTask.title.replace(/^.*: /, "")
                  ? { ...revision, status: "completed" as const }
                  : revision,
              ),
              {
                id: `${completedTask.id}-${newRevision}`,
                topic: completedTask.title.replace(/^.*: /, ""),
                subject: completedTask.subject,
                stage: newRevision,
                dueDate:
                  newRevision === "second" ? "In 3 days" : "In 10 days",
                status: "pending" as const,
                spacingDays: spacingByStage[newRevision],
              },
            ]
          : state.revisions;
      const completedToday = tasks.filter(
        (task) => task.status === "completed",
      ).length;
      return {
        tasks,
        revisions,
        completedToday,
        completionRate: Math.round((completedToday / tasks.length) * 100),
        streak:
          status === "completed" ? clamp(state.streak + 1, 0, 365) : state.streak,
        studyHours:
          status === "completed"
            ? Number((state.studyHours + 0.5).toFixed(1))
            : state.studyHours,
        revisionDebt:
          status === "missed"
            ? state.revisionDebt + 1
            : clamp(state.revisionDebt - 1, 0, 99),
        revisionStatus:
          status === "missed"
            ? "Recovery required: missed work added to tomorrow"
            : "Spaced revision queue updated",
      };
    }),
  generateDailyPlan: () =>
    set((state) => {
      const pending = state.tasks.filter((task) => task.status === "pending");
      const generated = pending.length >= 5 ? pending : todayTasks;
      return {
        tasks: generated.map((task, index) => ({
          ...task,
          id: `${task.id}-regen-${index}`,
          status: "pending",
          generatedReason:
            index === 0
              ? "Planner prioritized revision debt first."
              : task.generatedReason,
        })),
        completedToday: 0,
        completionRate: 0,
      };
    }),
  regenerateSchedule: () =>
    set((state) => {
      const missedTasks = state.tasks.filter((task) => task.status === "missed");
      const recoveryTasks = missedTasks.map((task) => ({
        ...task,
        id: `${task.id}-recovery`,
        title: `Recovery: ${task.title}`,
        dueDate: "2026-06-12",
        minutes: Math.ceil(task.minutes * 0.75),
        status: "pending" as const,
        generatedReason: "Automatically rescheduled after a missed task.",
      }));
      const activeTasks = state.tasks.filter((task) => task.status !== "missed");

      return {
        tasks: [...activeTasks, ...recoveryTasks],
        futureTasks: recoveryTasks,
        revisionDebt: clamp(state.revisionDebt + recoveryTasks.length, 0, 99),
        completionRate: Math.round(
          (activeTasks.filter((task) => task.status === "completed").length /
            Math.max(1, activeTasks.length + recoveryTasks.length)) *
            100,
        ),
        revisionStatus:
          recoveryTasks.length > 0
            ? `${recoveryTasks.length} recovery task added to tomorrow`
            : "No missed tasks to rebalance",
      };
    }),
}));
