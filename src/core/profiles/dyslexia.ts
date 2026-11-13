import type { LearningProfile } from "../domain/learning-profile";

export const dyslexiaProfile: LearningProfile = {
  id: "dyslexia",
  label: "Dislexia",
  description: "Reduz a carga de leitura e melhora a legibilidade do texto.",
  content: {
    highlightKeywords: true,
    guidelines: [
      "Use frases curtas, com uma ideia por frase.",
      "Prefira palavras simples e de uso comum; explique termos técnicos entre parênteses na primeira vez que aparecerem.",
      "Divida textos longos em parágrafos curtos, de no máximo 3 frases.",
      "Escreva as instruções em passos numerados, um comando por passo.",
      "Use voz ativa e ordem direta (sujeito, verbo, complemento).",
      "Destaque a palavra-chave de cada pergunta ou instrução.",
      "Em questões de múltipla escolha, mantenha as alternativas curtas e parecidas em tamanho.",
    ],
    avoid: [
      "Frases longas, com muitas vírgulas ou orações encadeadas.",
      "Siglas e abreviações sem explicação.",
      "Palavras raras quando existir um sinônimo comum.",
      "Perguntas com dupla negação.",
    ],
  },
  visual: {
    fontFamily: "Arial",
    fontSizePt: 13,
    lineSpacing: 1.5,
    backgroundHex: "#FAF3E0",
    textHex: "#2B2B2B",
    alignment: "left",
  },
  references: [
    "BDA Style Guide (British Dyslexia Association)",
    "DUA - Desenho Universal para a Aprendizagem (CAST)",
    "Lei Brasileira de Inclusão (Lei nº 13.146/2015)",
  ],
};
