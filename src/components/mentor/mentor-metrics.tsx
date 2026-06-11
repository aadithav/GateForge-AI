"use client";

import { Code2, FolderGit2, GraduationCap, Repeat } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { useMentorStore } from "@/store/mentor-store";

export function MentorMetrics() {
  const analytics = useMentorStore(
    (state) => state.activeRecommendation.analytics,
  );

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="GATE readiness"
        value={`${analytics.gateReadiness}%`}
        hint="Revision and mocks decide the next jump"
        icon={GraduationCap}
      />
      <MetricCard
        label="Placement readiness"
        value={`${analytics.placementReadiness}%`}
        hint="DSA transfer from current topic is mandatory"
        icon={Code2}
      />
      <MetricCard
        label="Study consistency"
        value={`${analytics.studyConsistency}%`}
        hint="Missed work lowers mentor trust"
        icon={Repeat}
      />
      <MetricCard
        label="Project progress"
        value={`${analytics.projectProgress}%`}
        hint="Public artifacts convert study into proof"
        icon={FolderGit2}
      />
    </section>
  );
}
