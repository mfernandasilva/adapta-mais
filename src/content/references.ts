export interface Reference {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly summary: string;
  readonly usage: string;
  readonly url: string;
}

export interface ReferenceGroup {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly Reference[];
}

export const REFERENCE_GROUPS: readonly ReferenceGroup[] = [
  {
    id: "legislacao",
    title: "Legislação brasileira",
    description: "Normas que garantem direitos e orientam o tratamento de dados.",
    items: [
      {
        id: "lbi",
        title: "Lei nº 13.146/2015: Lei Brasileira de Inclusão",
        issuer: "Presidência da República",
        summary:
          "Institui o Estatuto da Pessoa com Deficiência e trata de acessibilidade, desenho universal e adaptações razoáveis, inclusive na educação.",
        usage: "Base legal do direito do aluno a atividades adaptadas.",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm",
      },
      {
        id: "berenice-piana",
        title: "Lei nº 12.764/2012: Lei Berenice Piana",
        issuer: "Presidência da República",
        summary:
          "Institui a Política Nacional de Proteção dos Direitos da Pessoa com Transtorno do Espectro Autista.",
        usage: "Fundamento legal para o perfil de autismo (TEA).",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12764.htm",
      },
      {
        id: "lgpd",
        title: "Lei nº 13.709/2018: Lei Geral de Proteção de Dados (LGPD)",
        issuer: "Presidência da República",
        summary:
          "Regula o tratamento de dados pessoais, com regras específicas para dados de crianças e adolescentes.",
        usage: "Motivo pelo qual pedimos que você não inclua dados de alunos.",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
      },
    ],
  },
  {
    id: "pedagogia",
    title: "Pedagogia e acessibilidade",
    description: "Referências que inspiram as regras de conteúdo e de formatação de cada perfil.",
    items: [
      {
        id: "dua",
        title: "Diretrizes do Desenho Universal para a Aprendizagem (DUA)",
        issuer: "CAST",
        summary:
          "Estrutura de planejamento que oferece múltiplas formas de apresentação, de ação e de engajamento.",
        usage: "Base pedagógica de todos os perfis.",
        url: "https://udlguidelines.cast.org/",
      },
      {
        id: "bda",
        title: "Dyslexia Friendly Style Guide",
        issuer: "British Dyslexia Association",
        summary:
          "Orientações sobre fonte, espaçamento, alinhamento, cor de fundo e linguagem para textos mais acessíveis a pessoas com dislexia.",
        usage: "Base das regras visuais do perfil de dislexia.",
        url: "https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide",
      },
      {
        id: "wcag",
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        issuer: "W3C",
        summary:
          "Padrão internacional de acessibilidade para conteúdo digital: contraste, navegação por teclado, leitores de tela e mais.",
        usage: "Referência para a própria interface do Adapta+.",
        url: "https://www.w3.org/TR/WCAG22/",
      },
    ],
  },
  {
    id: "classificacao",
    title: "Classificação clínica",
    description:
      "Descrevem e classificam transtornos. Não definem como adaptar uma atividade escolar.",
    items: [
      {
        id: "cid-11",
        title: "CID-11: Classificação Internacional de Doenças",
        issuer: "Organização Mundial da Saúde",
        summary: "Classificação oficial usada em saúde para identificar condições, como dislexia, TDAH e TEA.",
        usage: "Consulta para entender a terminologia usada em laudos.",
        url: "https://icd.who.int/",
      },
      {
        id: "dsm-5",
        title: "DSM-5-TR: Manual Diagnóstico e Estatístico de Transtornos Mentais",
        issuer: "American Psychiatric Association",
        summary: "Critérios diagnósticos usados por profissionais de saúde.",
        usage: "Consulta para entender a terminologia usada em laudos.",
        url: "https://www.psychiatry.org/psychiatrists/practice/dsm",
      },
    ],
  },
  {
    id: "tecnologia",
    title: "Tecnologia de IA",
    description: "Termos do serviço que processa o texto da atividade.",
    items: [
      {
        id: "gemini-terms",
        title: "Gemini API: Additional Terms of Service",
        issuer: "Google",
        summary:
          "Explica como a Google trata o conteúdo enviado, com regras diferentes para o uso gratuito e o pago.",
        usage: "Leia antes de enviar qualquer conteúdo sensível.",
        url: "https://ai.google.dev/gemini-api/terms",
      },
    ],
  },
];