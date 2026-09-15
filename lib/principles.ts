export type PrincipleKey = "naturalidade" | "planejamento" | "precisao" | "equilibrio";

export type Principle = {
  key: PrincipleKey;
  title: string;
  text: string;
  icon: string;
};

export const PRINCIPLES: Principle[] = [
  {
    key: "naturalidade",
    title: "Naturalidade",
    text: "Resultados sutis, pensados para preservar sua expressão e manter a harmonia do rosto.",
    icon: "/organic/figma-filosofia/icon-naturalidade.svg",
  },
  {
    key: "planejamento",
    title: "Planejamento personalizado",
    text: "Nenhum rosto é igual ao outro. Cada tratamento é planejado de acordo com suas características, necessidades e objetivos.",
    icon: "/organic/figma-filosofia/icon-planejamento.svg",
  },
  {
    key: "precisao",
    title: "Precisão",
    text: "Técnica, proporção e atenção aos detalhes orientam cada decisão durante o tratamento.",
    icon: "/organic/figma-filosofia/icon-precisao.svg",
  },
  {
    key: "equilibrio",
    title: "Equilíbrio",
    text: "O objetivo não é transformar seus traços, mas criar uma relação mais harmoniosa entre eles.",
    icon: "/organic/figma-filosofia/icon-equilibrio.svg",
  },
];
