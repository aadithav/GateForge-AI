export type TaskStatus = "pending" | "completed" | "missed";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type StudyMode = "learn" | "practice" | "revision" | "mock" | "placement";
export type RevisionStage = "first" | "second" | "third";

export type StudyTask = {
  id: string;
  title: string;
  subject: string;
  subjectId?: string;
  topicId?: string;
  mode: StudyMode;
  dueDate: string;
  minutes: number;
  priority: "Low" | "Medium" | "High";
  status: TaskStatus;
  revisionStage?: RevisionStage;
  generatedReason: string;
};

export type Topic = {
  id: string;
  name: string;
  subjectId: string;
  subtopics: string[];
  notes: string[];
  formulas: string[];
  pyqs: string[];
  weightage: string;
  resources: string[];
  difficulty: Difficulty;
  estimatedHours: number;
  progress: number;
  revisionChecklist: {
    first: boolean;
    second: boolean;
    third: boolean;
  };
};

export type Subject = {
  id: string;
  name: string;
  progress: number;
  weightage: string;
  difficulty: Difficulty;
  estimatedHours: number;
  topics: Topic[];
};

export type WeeklyGoal = {
  goal: string;
  target: string;
  progress: number;
};

export type RevisionItem = {
  id: string;
  topic: string;
  subject: string;
  stage: RevisionStage;
  dueDate: string;
  status: TaskStatus;
  spacingDays: number;
};
