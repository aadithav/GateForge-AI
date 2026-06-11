"use client";

import { Brain, Code2, Target, UserRoundCheck } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { usePlacementStore } from "@/store/placement-store";

export function PlacementSummary() {
  const { stats } = usePlacementStore();

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Placement readiness"
        value={`${stats.readiness}%`}
        hint="Needs stronger system design and graph confidence"
        icon={Target}
      />
      <MetricCard
        label="DSA progress"
        value={`${stats.dsaProgress}%`}
        hint={`${stats.totalSolved} total problems solved`}
        icon={Code2}
      />
      <MetricCard
        label="Core CS progress"
        value={`${stats.coreProgress}%`}
        hint="DBMS is healthy; CN needs attention"
        icon={Brain}
      />
      <MetricCard
        label="Interview prep"
        value={`${stats.interviewProgress}%`}
        hint="Project stories and HR answers are underbuilt"
        icon={UserRoundCheck}
      />
    </section>
  );
}
