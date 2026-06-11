import {
  BrainCircuit,
  CalendarDays,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { SubjectProgress } from "@/components/dashboard/subject-progress";
import { TodayTasks } from "@/components/dashboard/today-tasks";
import { MentorDashboardCard } from "@/components/mentor/mentor-dashboard-card";
import { StudyEngineSummary } from "@/components/study/study-engine-summary";
import { RevisionSystem } from "@/components/study/revision-system";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GATE_2027_DATE, readinessSignals, weeklyGoals } from "@/lib/constants";
import { daysUntil } from "@/lib/utils";

export default function DashboardPage() {
  const daysLeft = daysUntil(GATE_2027_DATE);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-950/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
              GATE CS 2027
            </Badge>
            <Badge>Placement track active</Badge>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Execute the plan. Evidence beats intention.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            GateForge AI adjusts your study load from task completion, revision
            debt, DSA discipline, and mock performance.
          </p>
        </div>
        <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-right">
          <p className="text-sm text-cyan-200">Days left</p>
          <p className="text-4xl font-semibold text-white">{daysLeft}</p>
        </div>
      </header>

      <StudyEngineSummary />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Weekly mock plan"
          value="1 / 3"
          hint="Next mock due Saturday"
          icon={CalendarDays}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-6">
          <TodayTasks />
          <RevisionSystem />
          <ProgressChart />
        </div>
        <div className="space-y-6">
          <SubjectProgress />
          <Card>
            <CardHeader>
              <CardTitle>Weekly goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyGoals.map((goal) => (
                <div key={goal.goal}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-200">{goal.goal}</span>
                    <span className="text-slate-400">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} />
                  <p className="mt-1 text-xs text-slate-500">{goal.target}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Readiness signals</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {readinessSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={signal.name}
                    className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-900/40 p-3"
                  >
                    <Icon className="h-4 w-4 text-cyan-300" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                        <span className="truncate text-slate-200">
                          {signal.name}
                        </span>
                        <span className="text-slate-400">{signal.value}%</span>
                      </div>
                      <Progress value={signal.value} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          <Card className="border-rose-400/20 bg-rose-950/20">
            <CardContent className="flex gap-3 p-5">
              <BrainCircuit className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
              <p className="text-sm leading-6 text-rose-100">
                Strict mentor verdict: you are solving, but not revising enough.
                Clear revision debt before adding new Algorithms topics.
              </p>
            </CardContent>
          </Card>
          <MentorDashboardCard />
        </div>
      </section>
    </div>
  );
}
