"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMentorStore } from "@/store/mentor-store";

type TopicCompletionActionProps = {
  subject: string;
  topic: string;
  missedTasks: number;
};

export function TopicCompletionAction({
  subject,
  topic,
  missedTasks,
}: TopicCompletionActionProps) {
  const completeTopic = useMentorStore((state) => state.completeTopic);

  return (
    <Button asChild size="sm" onClick={() => completeTopic(subject, topic, missedTasks)}>
      <Link href="/mentor">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Complete topic
      </Link>
    </Button>
  );
}
