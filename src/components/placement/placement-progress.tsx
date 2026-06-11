"use client";

import { Flame, Percent, Sigma, Trophy } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { placementSubjects, topicPerformance } from "@/lib/placement-data";
import { usePlacementStore } from "@/store/placement-store";

export function PlacementProgress() {
  const { stats } = usePlacementStore();

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total solved"
          value={`${stats.totalSolved}`}
          hint={`${stats.easySolved} easy, ${stats.mediumSolved} medium, ${stats.hardSolved} hard`}
          icon={Trophy}
        />
        <MetricCard
          label="Current streak"
          value={`${stats.streak} days`}
          hint="Daily DSA baseline must stay alive"
          icon={Flame}
        />
        <MetricCard
          label="Accuracy"
          value={`${stats.accuracy}%`}
          hint="Target: 75% before increasing hard volume"
          icon={Percent}
        />
        <MetricCard
          label="Hard solved"
          value={`${stats.hardSolved}`}
          hint="One hard problem per day builds interview stamina"
          icon={Sigma}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Topic-wise performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topicPerformance.map((topic) => (
              <div key={topic.topic}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-200">{topic.topic}</span>
                  <span className="text-slate-400">
                    {topic.solved}/{topic.attempted} - {topic.accuracy}%
                  </span>
                </div>
                <Progress value={topic.progress} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Placement subjects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {placementSubjects.map((subject) => (
              <div key={subject.id}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-200">{subject.name}</span>
                  <span className="text-slate-400">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} />
                <p className="mt-1 text-xs text-slate-500">{subject.focus}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
