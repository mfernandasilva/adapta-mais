import { afterEach, describe, expect, it, vi } from "vitest";
import { AdaptApiError, requestAdaptation } from "@/client/adapt-api";

const request = { text: "texto", profileId: "dyslexia" } as const;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("requestAdaptation", () => {
  it("devolve o resultado quando a API responde com sucesso", async () => {
    const body = {
      activity: { title: "A", passage: [], instructions: [], questions: [] },
      profile: { id: "dyslexia", label: "Dislexia", visual: {} },
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(body)));

    await expect(requestAdaptation(request)).resolves.toEqual(body);
  });

  it("usa a mensagem de erro enviada pela API", async () => {
    const error = { error: { code: "VALIDATION_ERROR", message: "Texto vazio." } };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(error, 400)));

    await expect(requestAdaptation(request)).rejects.toThrow("Texto vazio.");
  });

  it("traduz falha de rede para AdaptApiError", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));

    await expect(requestAdaptation(request)).rejects.toBeInstanceOf(AdaptApiError);
  });

  it("rejeita respostas fora do formato esperado", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ ok: true })));

    await expect(requestAdaptation(request)).rejects.toBeInstanceOf(AdaptApiError);
  });
});