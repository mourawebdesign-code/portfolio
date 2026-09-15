export type ResultCase = {
  code: string;
  procedure: string;
  tagline: string;
  goal: string;
  outcome: string;
  image: string;
  /** Vertical focal point (object-position Y) shared by both before/after
      crops, so the same facial feature stays framed on both sides. */
  focusY: string;
};

export const RESULT_CASES: ResultCase[] = [
  {
    code: "01",
    procedure: "Toxina botulínica",
    tagline: "Expressão mais leve, com preservação da naturalidade.",
    goal: "Suavizar linhas de expressão na região frontal.",
    outcome: "Pele mais lisa e descansada, mantendo a sua expressão.",
    image: "/organic/results/toxina-botulinica.png",
    focusY: "22%",
  },
  {
    code: "02",
    procedure: "Preenchimento labial",
    tagline: "Volume na medida certa, com harmonia ao seu rosto.",
    goal: "Devolver volume e contorno de forma sutil e proporcional.",
    outcome: "Lábios mais definidos, hidratados e em harmonia com sua expressão.",
    image: "/organic/results/preenchimento-labial.png",
    focusY: "62%",
  },
  {
    code: "03",
    procedure: "Bioestimulador de colágeno",
    tagline: "Mais firmeza, luminosidade e definição de contorno.",
    goal: "Estimular a produção de colágeno e melhorar a qualidade da pele.",
    outcome: "Pele mais firme, textura uniforme e contorno facial mais definido.",
    image: "/organic/results/bioestimulador-colageno.png",
    focusY: "48%",
  },
];
