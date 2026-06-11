import { CalendarDays, Code2, Compass, Flame, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GATE_2027_DATE } from "@/lib/constants";
import { guidanceAnalytics, todayMission } from "@/lib/content-engine";
import { daysUntil } from "@/lib/utils";

export function DashboardOverview() {
  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Days to GATE 2027"
          value={`${daysUntil(GATE_2027_DATE)}`}
          hint="Stay with today's mission"
          icon={CalendarDays}
        />
        <MetricCard
          label="Overall progress"
          value={`${guidanceAnalytics.progress}%`}
          hint="Roadmap completion"
          icon={Compass}
        />
        <MetricCard
          label="Streak"
          value={`${guidanceAnalytics.streak} days`}
          hint="Keep the chain calm and steady"
          icon={Flame}
        />
        <MetricCard
          label="DSA solved"
          value={`${guidanceAnalytics.dsaSolved}`}
          hint="Daily set keeps placements moving"
          icon={Code2}
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Short reminders</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Reminder title="What should I study?" value={todayMission.items[0].title} />
          <Reminder title="What should I solve?" value={todayMission.items[2].title} />
          <Reminder title="What should I revise?" value={todayMission.items[3].title} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#606C38]" />
            Predicted readiness
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Readiness label="GATE" value={guidanceAnalytics.predictedGateReadiness} />
          <Readiness label="Placement" value={guidanceAnalytics.predictedPlacementReadiness} />
        </CardContent>
      </Card>
    </div>
  );
}

function Reminder({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] p-4">
      <p className="text-sm font-medium text-[#606C38]">{title}</p>
      <p className="mt-2 text-sm text-[#212529]">{value}</p>
    </div>
  );
}

function Readiness({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-[#212529]">{label}</span>
        <span className="text-[#6C757D]">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
