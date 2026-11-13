import type { AdaptedActivity } from "../domain/activity";
import { ValidationError } from "../domain/errors";
import type { LearningProfile } from "../domain/learning-profile";
import type { ActivityAdapter } from "../ports/activity-adapter.port";
import { getProfile, isLearningProfileId } from "../profiles";

export interface AdaptActivityInput {
  readonly text: string;
  readonly profileId: string;
}

export interface AdaptActivityOutput {
  readonly activity: AdaptedActivity;
  readonly profile: LearningProfile;
}

export class AdaptActivityUseCase {
  constructor(
    private readonly adapter: ActivityAdapter,
    private readonly maxInputChars: number,
  ) {}

  async execute(input: AdaptActivityInput): Promise<AdaptActivityOutput> {
    const sourceText = input.text.trim();

    if (sourceText.length === 0) {
      throw new ValidationError("O texto da atividade não pode estar vazio.");
    }
    if (sourceText.length > this.maxInputChars) {
      throw new ValidationError(
        `O texto excede o limite de ${this.maxInputChars} caracteres.`,
      );
    }
    if (!isLearningProfileId(input.profileId)) {
      throw new ValidationError(`Perfil de aprendizagem inválido: ${input.profileId}`);
    }

    const profile = getProfile(input.profileId);
    const activity = await this.adapter.adapt({ sourceText, profile });

    return { activity, profile };
  }
}
