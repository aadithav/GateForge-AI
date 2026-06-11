import { ActivityHeatmap } from "@/components/placement/activity-heatmap";
import { DailyDsaEngine } from "@/components/placement/daily-dsa-engine";
import { PlacementAnalytics } from "@/components/placement/placement-analytics";
import { PlacementProgress } from "@/components/placement/placement-progress";
import { PlacementSummary } from "@/components/placement/placement-summary";
import { Badge } from "@/components/ui/badge";

export default function PlacementPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="rounded-lg border border-slate-800 bg-slate-950/70 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
            Daily DSA: 2E + 2M + 1H
          </Badge>
          <Badge>Placement readiness track</Badge>
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Placement preparation
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          GateForge balances DSA reps, core CS revision, SQL practice, system
          design foundations, aptitude, and interview readiness alongside GATE.
        </p>
      </header>

      <PlacementSummary />

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <DailyDsaEngine />
        <ActivityHeatmap />
      </section>

      <PlacementProgress />
      <PlacementAnalytics />
    </div>
  );
}
