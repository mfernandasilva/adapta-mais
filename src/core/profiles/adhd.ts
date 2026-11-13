import type { LearningProfile } from "../domain/learning-profile";

export const adhdProfile: LearningProfile = {
  id: "adhd",
  label: "TDAH",
  description: "Organiza a atividade em etapas curtas e objetivas para manter o foco.",
  content: {
    highlightKeywords: true,
    guidelines: [
      "Divida a atividade em blocos pequenos, com um objetivo por bloco.",
      "Escreva as instruções em passos numerados e diretos, começando com um verbo de ação.",
      "Deixe claro, no início, o que precisa ser feito e o que será entregue.",
      "Destaque as palavras-chave de cada instrução.",
      "Mantenha cada questão independente e com enunciado curto.",
      "Elimine informações que não sejam necessárias para resolver a questão.",
    ],
    avoid: [
      "Textos longos antes da primeira pergunta.",
      "Várias tarefas dentro de uma mesma questão.",
      "Informações irrelevantes ou repetidas que dispersem a atenção.",
      "Instruções vagas, como 'faça direito' ou 'complete tudo'.",
    ],
  },
  visual: {
    fontFamily: "Arial",
    fontSizePt: 12,
    lineSpacing: 1.5,
    backgroundHex: "#FFFFFF",
    textHex: "#1F1F1F",
    alignment: "left",
  },
  references: [
    "DUA - Desenho Universal para a Aprendizagem (CAST)",
    "Lei Brasileira de Inclusão (Lei nº 13.146/2015)",
  ],
};
