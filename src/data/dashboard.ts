export type LearningDomain = {
  name: string;
  description: string;
  progress: number;
  completed: number;
  total: number;
  status: "em-rota" | "proximo" | "mapeado";
};

export const dashboardSnapshot = {
  overallProgress: 18,
  currentFocus: "Fundamentos de sistemas distribuídos",
  nextCheckpoint: "Explicar consistência e particionamento com exemplos próprios",
  weeklyTarget: 4,
  weeklyCompleted: 2,
  domains: [
    {
      name: "Fundamentos",
      description: "Algoritmos, estruturas de dados e sistemas operacionais",
      progress: 42,
      completed: 8,
      total: 19,
      status: "em-rota",
    },
    {
      name: "Arquitetura",
      description: "Design de sistemas, integração e decisões técnicas",
      progress: 24,
      completed: 4,
      total: 17,
      status: "em-rota",
    },
    {
      name: "Entrega de software",
      description: "Qualidade, observabilidade, segurança e operação",
      progress: 9,
      completed: 2,
      total: 22,
      status: "proximo",
    },
    {
      name: "Impacto profissional",
      description: "Produto, comunicação, liderança e mentoria",
      progress: 5,
      completed: 1,
      total: 20,
      status: "mapeado",
    },
  ] satisfies LearningDomain[],
  recentEvidence: [
    {
      type: "Nota de estudo",
      title: "CAP, consistência eventual e escolhas reais",
      date: "Hoje",
      domain: "Arquitetura",
    },
    {
      type: "Projeto",
      title: "Fila idempotente com retentativas",
      date: "18 set",
      domain: "Entrega de software",
    },
    {
      type: "Revisão",
      title: "Complexidade espacial em algoritmos de busca",
      date: "15 set",
      domain: "Fundamentos",
    },
  ],
} as const;
