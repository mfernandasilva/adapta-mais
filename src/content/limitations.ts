export interface Limitation {
  readonly title: string;
  readonly text: string;
}

export const LIMITATIONS: readonly Limitation[] = [
  {
    title: "Não substitui avaliação profissional",
    text: "O Adapta+ não faz diagnóstico e não substitui o Plano Educacional Individualizado (PEI), a avaliação de um psicopedagogo nem o acompanhamento de um profissional de educação especial. Use-o como apoio ao planejamento do professor.",
  },
  {
    title: "Os perfis são regras gerais",
    text: "Cada perfil reúne orientações comuns para dislexia, TDAH e autismo. Alunos com o mesmo diagnóstico têm necessidades diferentes, e a atividade pode precisar de ajustes individuais.",
  },
  {
    title: "A IA pode errar",
    text: "O texto adaptado pode omitir informações, mudar o sentido de uma questão ou deixar uma instrução ambígua. Confira o texto, as questões e as alternativas antes de entregar ao aluno.",
  },
  {
    title: "Cobertura limitada",
    text: "Hoje existem três perfis. Outras necessidades, como deficiência visual, auditiva ou intelectual, não têm regras próprias e exigem adaptações que este sistema não faz.",
  },
  {
    title: "Somente texto, por enquanto",
    text: "A entrada é o texto colado, com até 15.000 caracteres. Imagens, gráficos, tabelas, fórmulas e figuras não são adaptados nem descritos. O envio de PDF e Word está em desenvolvimento.",
  },
  {
    title: "A formatação visual é uma sugestão",
    text: "Fonte, espaçamento e cor de fundo seguem boas práticas gerais. Cada aluno pode preferir outra combinação: pergunte a ele ou à família o que funciona melhor.",
  },
  {
    title: "Depende de um serviço externo",
    text: "A adaptação usa um serviço de IA de terceiros, que pode ficar lento, indisponível ou limitar o número de usos por dia. Nesses casos, tente novamente mais tarde.",
  },
];