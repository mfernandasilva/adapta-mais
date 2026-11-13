import { describe, expect, it } from "vitest";
import { AiProviderError } from "@/core/domain/errors";
import { getProfile } from "@/core/profiles";
import { GeminiActivityAdapter } from "@/infrastructure/ai/gemini-activity-adapter";
import type { JsonTextGenerator } from "@/infrastructure/ai/text-generator";

const dyslexia = getProfile("dyslexia");
const autism = getProfile("autism");

function adapterReturning(response: string | Error) {
  const generator: JsonTextGenerator = {
    generateJson: async () => {
      if (response instanceof Error) throw response;
      return response;
    },
  };
  return new GeminiActivityAdapter(generator);
}

const validResponse = JSON.stringify({
  title: "Ciclo da água",
  passage: ["O Sol aquece a água."],
  instructions: ["Leia o texto."],
  questions: [
    {
      number: 1,
      statement: "**Explique** o que é o ciclo da água.",
      options: ["a) Evaporação", "b) Condensação"],
    },
    { number: 2, statement: "Escreva uma frase.", options: null },
  ],
  teacherNotes: "Nota com [[destaque]].",
});

describe("GeminiActivityAdapter", () => {
  it("converte a resposta válida para o domínio", async () => {
    const result = await adapterReturning(validResponse).adapt({
      sourceText: "texto",
      profile: dyslexia,
    });

    expect(result.title).toBe("Ciclo da água");
    expect(result.passage).toEqual(["O Sol aquece a água."]);
    expect(result.questions[1]).not.toHaveProperty("options");
  });

  it("padroniza o destaque quando o perfil usa destaque", async () => {
    const result = await adapterReturning(validResponse).adapt({
      sourceText: "texto",
      profile: dyslexia,
    });

    expect(result.questions[0]?.statement).toBe("[[Explique]] o que é o ciclo da água.");
  });

  it("remove todo destaque quando o perfil não usa destaque", async () => {
    const result = await adapterReturning(validResponse).adapt({
      sourceText: "texto",
      profile: autism,
    });

    expect(result.questions[0]?.statement).toBe("Explique o que é o ciclo da água.");
  });

  it("remove a letra inicial das alternativas", async () => {
    const result = await adapterReturning(validResponse).adapt({
      sourceText: "texto",
      profile: dyslexia,
    });

    expect(result.questions[0]?.options).toEqual(["Evaporação", "Condensação"]);
  });

  it("não deixa destaque nas observações do professor", async () => {
    const result = await adapterReturning(validResponse).adapt({
      sourceText: "texto",
      profile: dyslexia,
    });

    expect(result.teacherNotes).toBe("Nota com destaque.");
  });

  it("aceita resposta sem texto-base", async () => {
    const response = JSON.stringify({
      title: "Questões",
      instructions: [],
      questions: [{ number: 1, statement: "Quanto é 2 + 2?" }],
    });

    const result = await adapterReturning(response).adapt({
      sourceText: "texto",
      profile: dyslexia,
    });

    expect(result.passage).toEqual([]);
  });

  it("falha com AiProviderError quando o JSON é inválido", async () => {
    await expect(
      adapterReturning("isto não é json").adapt({ sourceText: "texto", profile: dyslexia }),
    ).rejects.toBeInstanceOf(AiProviderError);
  });

  it("falha com AiProviderError quando a estrutura não confere", async () => {
    await expect(
      adapterReturning(JSON.stringify({ title: "Sem questões" })).adapt({
        sourceText: "texto",
        profile: dyslexia,
      }),
    ).rejects.toBeInstanceOf(AiProviderError);
  });

  it("encapsula erros do provedor", async () => {
    await expect(
      adapterReturning(new Error("quota exceeded")).adapt({
        sourceText: "texto",
        profile: dyslexia,
      }),
    ).rejects.toBeInstanceOf(AiProviderError);
  });
});