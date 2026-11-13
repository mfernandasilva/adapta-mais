import { describe, expect, it, vi } from "vitest";
import { ResilientTextGenerator } from "@/infrastructure/ai/resilient-text-generator";
import {
  TransientGenerationError,
  type JsonTextGenerator,
} from "@/infrastructure/ai/text-generator";

const request = { systemInstruction: "sistema", prompt: "prompt" };

function generatorFrom(...results: Array<string | Error>): {
  generator: JsonTextGenerator;
  calls: () => number;
} {
  const generateJson = vi.fn();
  for (const result of results) {
    if (result instanceof Error) generateJson.mockRejectedValueOnce(result);
    else generateJson.mockResolvedValueOnce(result);
  }
  return { generator: { generateJson }, calls: () => generateJson.mock.calls.length };
}

function resilient(generators: JsonTextGenerator[]) {
  const sleep = vi.fn().mockResolvedValue(undefined);
  return {
    sleep,
    instance: new ResilientTextGenerator(generators, {
      maxAttemptsPerGenerator: 2,
      baseDelayMs: 100,
      sleep,
    }),
  };
}

describe("ResilientTextGenerator", () => {
  it("tenta de novo após erro temporário", async () => {
    const primary = generatorFrom(new TransientGenerationError(), '{"ok":true}');
    const { instance, sleep } = resilient([primary.generator]);

    await expect(instance.generateJson(request)).resolves.toBe('{"ok":true}');
    expect(primary.calls()).toBe(2);
    expect(sleep).toHaveBeenCalledWith(100);
  });

  it("usa o modelo reserva quando o principal esgota as tentativas", async () => {
    const primary = generatorFrom(new TransientGenerationError(), new TransientGenerationError());
    const fallback = generatorFrom("resposta do reserva");
    const { instance } = resilient([primary.generator, fallback.generator]);

    await expect(instance.generateJson(request)).resolves.toBe("resposta do reserva");
    expect(primary.calls()).toBe(2);
  });

  it("não repete erro definitivo, mas tenta o reserva", async () => {
    const primary = generatorFrom(new Error("modelo inexistente"));
    const fallback = generatorFrom("ok");
    const { instance, sleep } = resilient([primary.generator, fallback.generator]);

    await expect(instance.generateJson(request)).resolves.toBe("ok");
    expect(primary.calls()).toBe(1);
    expect(sleep).not.toHaveBeenCalled();
  });

  it("propaga o último erro quando tudo falha", async () => {
    const primary = generatorFrom(new Error("falha final"));
    const { instance } = resilient([primary.generator]);

    await expect(instance.generateJson(request)).rejects.toThrow("falha final");
  });
});