import {
  LEARNING_PROFILE_IDS,
  type LearningProfile,
  type LearningProfileId,
} from "../domain/learning-profile";
import { adhdProfile } from "./adhd";
import { autismProfile } from "./autism";
import { dyslexiaProfile } from "./dyslexia";

const PROFILES: Readonly<Record<LearningProfileId, LearningProfile>> = {
  dyslexia: dyslexiaProfile,
  adhd: adhdProfile,
  autism: autismProfile,
};

export function isLearningProfileId(value: string): value is LearningProfileId {
  return (LEARNING_PROFILE_IDS as readonly string[]).includes(value);
}

export function getProfile(id: LearningProfileId): LearningProfile {
  return PROFILES[id];
}

export function listProfiles(): readonly LearningProfile[] {
  return LEARNING_PROFILE_IDS.map((id) => PROFILES[id]);
}
