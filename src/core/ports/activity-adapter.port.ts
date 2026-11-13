import type { AdaptedActivity } from "../domain/activity";
import type { LearningProfile } from "../domain/learning-profile";

export interface ActivityAdapter {
  adapt(input: {
    sourceText: string;
    profile: LearningProfile;
  }): Promise<AdaptedActivity>;
}
