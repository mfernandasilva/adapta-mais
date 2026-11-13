import { describe, expect, it } from "vitest";
import { convertMarkdownBold, parseEmphasis, stripEmphasis } from "@/core/domain/rich-text";

describe("rich-text", () => {
  it("separa trechos normais e em negrito", () => {
    expect(parseEmphasis("Qual é o [[nome]] do processo?")).toEqual([
      { text: "Qual é o ", bold: false },
      { text: "nome", bold: true },
      { text: " do processo?", bold: false },
    ]);
  });

  it("devolve um único trecho quando não há destaque", () => {
    expect(parseEmphasis("Texto simples")).toEqual([{ text: "Texto simples", bold: false }]);
  });

  it("remove a marcação mantendo o texto", () => {
    expect(stripEmphasis("Leia o [[texto]] e [[responda]].")).toBe("Leia o texto e responda.");
  });

  it("converte negrito de markdown para a marcação própria", () => {
    expect(convertMarkdownBold("**Explique** com suas palavras")).toBe(
      "[[Explique]] com suas palavras",
    );
  });
});