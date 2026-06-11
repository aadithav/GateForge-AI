import { ProgressChart } from "@/components/dashboard/progress-chart";
import { PlacementAnalytics } from "@/components/placement/placement-analytics";
import { StudyAnalytics } from "@/components/analytics/study-analytics";

export default function AnalyticsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        Analytics dashboard
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Progress charts for study hours, solved count, accuracy, and readiness.
      </p>
      <div className="mt-6">
        <ProgressChart />
      </div>
      <div className="mt-6">
        <StudyAnalytics />
      </div>
      <div className="mt-6">
        <PlacementAnalytics />
      </div>
    </div>
  );
}
