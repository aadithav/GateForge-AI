"use client";

import { BookMarked, Flame, Timer, TriangleAlert } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { useStudyStore } from "@/store/study-store";

export function StudyEngineSummary() {
  const { streak, studyHours, revisionDebt, completionRate } = useStudyStore();

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Current streak"
        value={`${streak} days`}
        hint="No zero-output days before GATE 2027"
        icon={Flame}
      />
      <MetricCard
        label="Study hours today"
        value={`${studyHours} h`}
        hint="Target: 5 focused hours"
        icon={Timer}
      />
      <MetricCard
        label="Revision debt"
        value={`${revisionDebt} items`}
        hint="Revision is prioritized before new comfort topics"
        icon={TriangleAlert}
      />
      <MetricCard
        label="Task completion"
        value={`${completionRate}%`}
        hint="Planner rebalances if execution drops"
        icon={BookMarked}
      />
    </section>
  );
}
