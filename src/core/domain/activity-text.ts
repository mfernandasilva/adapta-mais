import type { AdaptedActivity } from "./activity";
import { stripEmphasis } from "./rich-text";

function optionLetter(index: number): string {
  return String.fromCharCode(97 + index);
}

/** Converte a atividade em texto simples, sem marcação de destaque. */
export function activityToPlainText(activity: AdaptedActivity): string {
  const blocks: string[] = [stripEmphasis(activity.title)];

  if (activity.passage.length > 0) {
    blocks.push(activity.passage.map(stripEmphasis).join("\n\n"));
  }

  if (activity.instructions.length > 0) {
    const steps = activity.instructions.map(
      (instruction, index) => `${index + 1}. ${stripEmphasis(instruction)}`,
    );
    blocks.push(["O que fazer", ...steps].join("\n"));
  }

  const questions = activity.questions.map((question) => {
    const lines = [`${question.number}) ${stripEmphasis(question.statement)}`];
    question.options?.forEach((option, index) => {
      lines.push(`   ${optionLetter(index)}) ${stripEmphasis(option)}`);
    });
    return lines.join("\n");
  });
  blocks.push(["Questões", ...questions].join("\n\n"));

  return blocks.join("\n\n");
}