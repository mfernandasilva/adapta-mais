import type { LearningProfile } from "../domain/learning-profile";

export const autismProfile: LearningProfile = {
  id: "autism",
  label: "Autismo (TEA)",
  description: "Usa linguagem literal, previsível e com expectativas explícitas.",
  content: {
    highlightKeywords: true,
    guidelines: [
      "Use linguagem literal, clara e objetiva.",
      "Diga exatamente o que se espera como resposta (por exemplo: 'Escreva uma frase.').",
      "Mantenha uma estrutura previsível: todas as questões seguem o mesmo formato.",
      "Dê um exemplo resolvido quando a tarefa for nova, se o texto original permitir.",
      "Indique quantas questões existem e quantas respostas são esperadas.",
      "Use contextos concretos e específicos em vez de situações hipotéticas abstratas.",
    ],
    avoid: [
      "Metáforas, ironia, sarcasmo e expressões figuradas.",
      "Perguntas ambíguas ou com mais de uma interpretação possível.",
      "Instruções implícitas que dependam de 'ler nas entrelinhas'.",
      "Mudanças de formato entre as questões.",
    ],
  },
  visual: {
    fontFamily: "Arial",
    fontSizePt: 12,
    lineSpacing: 1.5,
    backgroundHex: "#F4F6F8",
    textHex: "#222222",
    alignment: "left",
  },
  references: [
    "DUA - Desenho Universal para a Aprendizagem (CAST)",
    "Lei Brasileira de Inclusão (Lei nº 13.146/2015)",
    "Lei Berenice Piana (Lei nº 12.764/2012)",
  ],
};
