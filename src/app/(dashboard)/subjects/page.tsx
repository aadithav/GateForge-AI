import { GateSubjectTree } from "@/components/focus/gate-subject-tree";
import { TodayTopic } from "@/components/focus/today-topic";

export default function SubjectsPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[18rem_1fr] lg:px-8">
      <aside>
        <GateSubjectTree />
      </aside>
      <main>
        <TodayTopic />
      </main>
    </div>
  );
}
