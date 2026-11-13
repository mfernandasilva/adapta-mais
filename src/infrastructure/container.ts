import { AdaptActivityUseCase } from "@/core/use-cases/adapt-activity";
import { GeminiActivityAdapter } from "./ai/gemini-activity-adapter";
import { GeminiTextGenerator } from "./ai/gemini-text-generator";
import { ResilientTextGenerator } from "./ai/resilient-text-generator";
import { getEnv } from "./config/env";

export function createAdaptActivityUseCase(): AdaptActivityUseCase {
  const env = getEnv();

  const models = [env.GEMINI_MODEL];
  if (env.GEMINI_FALLBACK_MODEL && env.GEMINI_FALLBACK_MODEL !== env.GEMINI_MODEL) {
    models.push(env.GEMINI_FALLBACK_MODEL);
  }

  const generators = models.map(
    (model) =>
      new GeminiTextGenerator({
        apiKey: env.GEMINI_API_KEY,
        model,
        timeoutMs: env.GEMINI_TIMEOUT_MS,
      }),
  );

  const generator = new ResilientTextGenerator(generators, {
    maxAttemptsPerGenerator: 2,
    baseDelayMs: 1500,
  });

  return new AdaptActivityUseCase(
    new GeminiActivityAdapter(generator),
    env.MAX_INPUT_CHARS,
  );
}