import { describe, expect, it } from "vitest";
import { activityToPlainText } from "@/core/domain/activity-text";

describe("activityToPlainText", () => {
  it("monta o texto completo sem marcação de destaque", () => {
    const text = activityToPlainText({
      title: "Ciclo da [[água]]",
      passage: ["O Sol aquece a água."],
      instructions: ["Leia o texto."],
      questions: [
        { number: 1, statement: "Qual é o [[processo]]?", options: ["Evaporação", "Condensação"] },
        { number: 2, statement: "Explique." },
      ],
    });

    expect(text).toBe(
      [
        "Ciclo da água",
        "O Sol aquece a água.",
        "O que fazer\n1. Leia o texto.",
        "Questões\n\n1) Qual é o processo?\n   a) Evaporação\n   b) Condensação\n\n2) Explique.",
      ].join("\n\n"),
    );
  });

  it("omite blocos vazios", () => {
    const text = activityToPlainText({
      title: "Questões",
      passage: [],
      instructions: [],
      questions: [{ number: 1, statement: "Quanto é 2 + 2?" }],
    });

    expect(text).not.toContain("O que fazer");
    expect(text).toContain("1) Quanto é 2 + 2?");
  });
});