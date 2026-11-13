import { ApiError, GoogleGenAI } from "@google/genai";
import { GEMINI_RESPONSE_SCHEMA } from "./adapted-activity.schema";
import {
  TransientGenerationError,
  type JsonGenerationRequest,
  type JsonTextGenerator,
} from "./text-generator";

interface GeminiTextGeneratorOptions {
  readonly apiKey: string;
  readonly model: string;
  readonly timeoutMs: number;
}

const TRANSIENT_STATUS = new Set([408, 429, 500, 502, 503, 504]);

function isTransient(error: unknown): boolean {
  if (error instanceof ApiError) {
    return TRANSIENT_STATUS.has(error.status);
  }
  if (error instanceof Error) {
    return (
      error.name === "AbortError" ||
      /timeout|timed out|fetch failed|econnreset/i.test(error.message)
    );
  }
  return false;
}

export class GeminiTextGenerator implements JsonTextGenerator {
  private readonly client: GoogleGenAI;
  private readonly model: string;

  constructor(options: GeminiTextGeneratorOptions) {
    this.client = new GoogleGenAI({
      apiKey: options.apiKey,
      httpOptions: { timeout: options.timeoutMs },
    });
    this.model = options.model;
  }

  async generateJson(request: JsonGenerationRequest): Promise<string> {
    try {
      const response = await this.client.models.generateContent({
        model: this.model,
        contents: request.prompt,
        config: {
          systemInstruction: request.systemInstruction,
          responseMimeType: "application/json",
          responseSchema: GEMINI_RESPONSE_SCHEMA,
          temperature: 0.3,
        },
      });
      return response.text ?? "";
    } catch (error) {
      throw isTransient(error) ? new TransientGenerationError(error) : error;
    }
  }
}