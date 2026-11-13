import type { AdaptedActivity } from "@/core/domain/activity";
import { AiProviderError } from "@/core/domain/errors";
import type { LearningProfile } from "@/core/domain/learning-profile";
import { convertMarkdownBold, stripEmphasis } from "@/core/domain/rich-text";
import type { ActivityAdapter } from "@/core/ports/activity-adapter.port";
import { aiAdaptedActivitySchema, type AiAdaptedActivity } from "./adapted-activity.schema";
import { buildSystemInstruction, buildUserPrompt } from "./prompt-builder";
import type { JsonTextGenerator } from "./text-generator";

const LEADING_OPTION_LETTER = /^\s*[a-eA-E][).]\s+/;

export class GeminiActivityAdapter implements ActivityAdapter {
  constructor(private readonly generator: JsonTextGenerator) {}

  async adapt(input: {
    sourceText: string;
    profile: LearningProfile;
  }): Promise<AdaptedActivity> {
    const rawJson = await this.generate(input.sourceText, input.profile);
    const parsed = this.parse(rawJson);
    return this.toDomain(parsed, input.profile);
  }

  private async generate(sourceText: string, profile: LearningProfile): Promise<string> {
    try {
      return await this.generator.generateJson({
        systemInstruction: buildSystemInstruction(profile),
        prompt: buildUserPrompt(sourceText),
      });
    } catch (error) {
      throw new AiProviderError(error);
    }
  }

  private parse(rawJson: string): AiAdaptedActivity {
    let data: unknown;
    try {
      data = JSON.parse(rawJson);
    } catch (error) {
      throw new AiProviderError(error);
    }

    const result = aiAdaptedActivitySchema.safeParse(data);
    if (!result.success) {
      throw new AiProviderError(result.error);
    }
    return result.data;
  }

  private toDomain(data: AiAdaptedActivity, profile: LearningProfile): AdaptedActivity {
    const clean = (text: string): string => this.cleanText(text, profile);

    return {
      title: stripEmphasis(this.cleanText(data.title, profile)),
      passage: data.passage.map(clean),
      instructions: data.instructions.map(clean),
      questions: data.questions.map((question) => ({
        number: question.number,
        statement: clean(question.statement),
        ...(question.options && question.options.length > 0
          ? {
              options: question.options.map((option) =>
                clean(option.replace(LEADING_OPTION_LETTER, "")),
              ),
            }
          : {}),
      })),
      ...(data.teacherNotes
        ? { teacherNotes: stripEmphasis(this.cleanText(data.teacherNotes, profile)) }
        : {}),
    };
  }
  
  private cleanText(text: string, profile: LearningProfile): string {
    const withEmphasis = convertMarkdownBold(text).replace(/[*`]/g, "");
    const result = profile.content.highlightKeywords
      ? withEmphasis
      : stripEmphasis(withEmphasis);
    return result.trim();
  }
}