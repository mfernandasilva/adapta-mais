import {
  TransientGenerationError,
  type JsonGenerationRequest,
  type JsonTextGenerator,
} from "./text-generator";

export interface ResilienceOptions {
  readonly maxAttemptsPerGenerator: number;
  readonly baseDelayMs: number;
  readonly sleep?: (ms: number) => Promise<void>;
}

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export class ResilientTextGenerator implements JsonTextGenerator {
  constructor(
    private readonly generators: readonly JsonTextGenerator[],
    private readonly options: ResilienceOptions,
  ) {}

  async generateJson(request: JsonGenerationRequest): Promise<string> {
    const sleep = this.options.sleep ?? defaultSleep;
    let lastError: unknown;

    for (const generator of this.generators) {
      for (let attempt = 1; attempt <= this.options.maxAttemptsPerGenerator; attempt++) {
        try {
          return await generator.generateJson(request);
        } catch (error) {
          lastError = error;
          
          if (!(error instanceof TransientGenerationError)) break;

          if (attempt < this.options.maxAttemptsPerGenerator) {
            await sleep(this.options.baseDelayMs * 2 ** (attempt - 1));
          }
        }
      }
    }

    throw lastError ?? new Error("Nenhum gerador de IA configurado.");
  }
}