import type { AdaptedActivity } from "../domain/activity";
import type { LearningProfile } from "../domain/learning-profile";

export type ExportFormat = "pdf" | "docx";

export interface ExportedFile {
  readonly buffer: Buffer;
  readonly mimeType: string;
  readonly fileName: string;
}

export interface DocumentExporter {
  readonly format: ExportFormat;
  export(activity: AdaptedActivity, profile: LearningProfile): Promise<ExportedFile>;
}
