import type { AdaptedActivity } from "@/core/domain/activity";
import type { LearningProfileId, VisualRules } from "@/core/domain/learning-profile";

export interface AdaptRequest {
  readonly text: string;
  readonly profileId: LearningProfileId;
}

export interface AdaptResult {
  readonly activity: AdaptedActivity;
  readonly profile: {
    readonly id: LearningProfileId;
    readonly label: string;
    readonly visual: VisualRules;
  };
}

export class AdaptApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdaptApiError";
  }
}

const REQUEST_TIMEOUT_MS = 95_000;
const GENERIC_ERROR = "Não foi possível adaptar a atividade. Tente novamente.";

function isAdaptResult(data: unknown): data is AdaptResult {
  return typeof data === "object" && data !== null && "activity" in data && "profile" in data;
}

function extractErrorMessage(data: unknown): string {
  if (typeof data === "object" && data !== null && "error" in data) {
    const error = (data as { error?: { message?: unknown } }).error;
    if (typeof error?.message === "string") return error.message;
  }
  return GENERIC_ERROR;
}

export async function requestAdaptation(
  request: AdaptRequest,
  signal?: AbortSignal,
): Promise<AdaptResult> {
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;

  let response: Response;
  try {
    response = await fetch("/api/adapt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: combined,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    if (error instanceof DOMException && error.name === "TimeoutError") {
      throw new AdaptApiError("A adaptação demorou mais que o esperado. Tente novamente.");
    }
    throw new AdaptApiError("Sem conexão com o servidor. Verifique sua internet.");
  }

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) throw new AdaptApiError(extractErrorMessage(data));
  if (!isAdaptResult(data)) throw new AdaptApiError(GENERIC_ERROR);

  return data;
}