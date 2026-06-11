import { GateSubjectTree } from "@/components/focus/gate-subject-tree";
import { TodayTopic } from "@/components/focus/today-topic";
import { TodaysMission } from "@/components/focus/todays-mission";

export default function DashboardPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[18rem_1fr] lg:px-8">
      <aside className="hidden lg:block">
        <GateSubjectTree />
      </aside>
      <main className="space-y-6">
        <TodaysMission />
        <TodayTopic />
      </main>
    </div>
  );
}
