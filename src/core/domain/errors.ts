export type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNSUPPORTED_FILE"
  | "FILE_READ_ERROR"
  | "AI_PROVIDER_ERROR"
  | "EXPORT_ERROR";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly httpStatus: number,
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = new.target.name;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
  }
}

export class UnsupportedFileError extends AppError {
  constructor(mimeType: string) {
    super(`Tipo de arquivo não suportado: ${mimeType}`, "UNSUPPORTED_FILE", 415);
  }
}

export class FileReadError extends AppError {
  constructor(cause?: unknown) {
    super("Não foi possível ler o arquivo enviado.", "FILE_READ_ERROR", 422, { cause });
  }
}

export class AiProviderError extends AppError {
  constructor(cause?: unknown) {
    super("Falha ao adaptar a atividade com a IA.", "AI_PROVIDER_ERROR", 502, { cause });
  }
}

export class ExportError extends AppError {
  constructor(cause?: unknown) {
    super("Falha ao gerar o arquivo de saída.", "EXPORT_ERROR", 500, { cause });
  }
}
