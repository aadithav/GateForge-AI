import { MentorMetrics } from "@/components/mentor/mentor-metrics";
import { MentorPlan } from "@/components/mentor/mentor-plan";

export default function MentorPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          AI Mentor
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          A strict senior mentor that turns topic completion into revision,
          DSA, project work, GitHub proof, resume bullets, LinkedIn output, and
          recovery plans.
        </p>
      </div>
      <MentorMetrics />
      <MentorPlan />
    </div>
  );
}
