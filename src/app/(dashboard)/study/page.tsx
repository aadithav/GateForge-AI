import { DailyPlanner } from "@/components/study/daily-planner";
import { RevisionSystem } from "@/components/study/revision-system";
import { StudyEngineSummary } from "@/components/study/study-engine-summary";

export default function StudyPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        Study Engine
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Daily generated work, missed-task recovery, spaced revision, and strict
        execution pressure live here.
      </p>
      <StudyEngineSummary />
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DailyPlanner />
        <RevisionSystem />
      </section>
    </div>
  );
}
