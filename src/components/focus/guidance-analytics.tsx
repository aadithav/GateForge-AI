import { AlertTriangle, CheckCircle2, Flame, Gauge, Target } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { guidanceAnalytics } from "@/lib/content-engine";

export function GuidanceAnalytics() {
  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Progress" value={`${guidanceAnalytics.progress}%`} hint="Total roadmap progress" icon={Gauge} />
        <MetricCard label="Streak" value={`${guidanceAnalytics.streak} days`} hint="Daily mission completed" icon={Flame} />
        <MetricCard label="DSA solved" value={`${guidanceAnalytics.dsaSolved}`} hint="Placement practice count" icon={Target} />
        <MetricCard label="Readiness" value={`${guidanceAnalytics.predictedGateReadiness}%`} hint="Predicted GATE readiness" icon={CheckCircle2} />
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#B23A48]" />
              Weak subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {guidanceAnalytics.weakSubjects.map((subject) => (
              <p key={subject} className="rounded-md bg-[#F8F9FA] p-3 text-sm text-[#6C757D]">
                {subject}
              </p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Strong subjects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {guidanceAnalytics.strongSubjects.map((subject) => (
              <p key={subject} className="rounded-md bg-[#F8F9FA] p-3 text-sm text-[#6C757D]">
                {subject}
              </p>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Predicted readiness</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Readiness label="GATE 2027" value={guidanceAnalytics.predictedGateReadiness} />
          <Readiness label="Placements" value={guidanceAnalytics.predictedPlacementReadiness} />
        </CardContent>
      </Card>
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
