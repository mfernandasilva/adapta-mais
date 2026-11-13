export interface JsonGenerationRequest {
  readonly systemInstruction: string;
  readonly prompt: string;
}

export interface JsonTextGenerator {
  generateJson(request: JsonGenerationRequest): Promise<string>;
}

export class TransientGenerationError extends Error {
  constructor(cause?: unknown) {
    super("Falha temporária do provedor de IA.", { cause });
    this.name = "TransientGenerationError";
  }
}