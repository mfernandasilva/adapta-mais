export const LEARNING_PROFILE_IDS = ["dyslexia", "adhd", "autism"] as const;

export type LearningProfileId = (typeof LEARNING_PROFILE_IDS)[number];

export interface ContentRules {
  readonly guidelines: readonly string[];
  readonly avoid: readonly string[];
}

export interface VisualRules {
  readonly fontFamily: string;
  readonly fontSizePt: number;
  readonly lineSpacing: number;
  readonly backgroundHex: string;
  readonly textHex: string;
  readonly alignment: "left" | "center";
}

export interface LearningProfile {
  readonly id: LearningProfileId;
  readonly label: string;
  readonly description: string;
  readonly content: ContentRules;
  readonly visual: VisualRules;
  readonly references: readonly string[];
}
