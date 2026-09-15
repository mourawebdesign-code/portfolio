export type Treatment = {
  name: string;
  desc: string;
};

export const FACIAL_TREATMENTS: Treatment[] = [
  {
    name: "Toxina botulínica",
    desc: "Suaviza linhas de expressão preservando a naturalidade.",
  },
  {
    name: "Preenchimento labial",
    desc: "Valoriza contorno e volume dos lábios com equilíbrio e proporção.",
  },
  {
    name: "Harmonização facial",
    desc: "Equilibra proporções e valoriza os traços de forma personalizada.",
  },
];

export const BODY_TREATMENTS: Treatment[] = [
  {
    name: "Bioestimulador corporal",
    desc: "Estimula colágeno e melhora firmeza e qualidade da pele.",
  },
  {
    name: "Enzimas para gordura localizada",
    desc: "Protocolo direcionado para regiões com gordura localizada.",
  },
  {
    name: "Drenagem linfática",
    desc: "Auxilia na redução de retenção e promove sensação de leveza.",
  },
];
