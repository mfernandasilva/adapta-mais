export type SourceOrigin = "text" | "pdf" | "docx";

export interface SourceActivity {
  readonly text: string;
  readonly origin: SourceOrigin;
  readonly fileName?: string;
}

export interface AdaptedQuestion {
  readonly number: number;
  readonly statement: string;
  readonly options?: readonly string[];
}

export interface AdaptedActivity {
  readonly title: string;
  readonly passage: readonly string[];
  readonly instructions: readonly string[];
  readonly questions: readonly AdaptedQuestion[];
  readonly teacherNotes?: string;
}