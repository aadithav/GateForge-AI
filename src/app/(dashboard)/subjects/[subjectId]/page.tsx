import { notFound } from "next/navigation";
import { GateSubjectTree } from "@/components/focus/gate-subject-tree";
import { TodayTopic } from "@/components/focus/today-topic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { gateSubjects } from "@/lib/constants";

type SubjectPageProps = {
  params: Promise<{ subjectId: string }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subjectId } = await params;
  const subject = gateSubjects.find((item) => item.id === subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[18rem_1fr] lg:px-8">
      <aside>
        <GateSubjectTree />
      </aside>
      <main className="space-y-5">
        <Card>
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#606C38]">Selected GATE subject</p>
              <h2 className="mt-1 text-2xl font-semibold text-[#212529]">
                {subject.name}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#6C757D]">
                The full syllabus stays in the sidebar. The center stays focused
                on today&apos;s topic.
              </p>
            </div>
            <Badge>{subject.weightage}</Badge>
          </CardContent>
        </Card>
        <TodayTopic />
      </main>
    </div>
  );
}
