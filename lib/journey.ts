export type JourneyStep = {
  index: string;
  title: string;
  text: string;
};

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    index: "01",
    title: "Escuta",
    text: "Entendemos suas expectativas, histórico e o que incomoda você hoje.",
  },
  {
    index: "02",
    title: "Leitura",
    text: "Analisamos proporções, expressão e características que devem ser preservadas.",
  },
  {
    index: "03",
    title: "Plano",
    text: "Definimos somente o que faz sentido para o seu caso, sem protocolos prontos.",
  },
  {
    index: "04",
    title: "Acompanhamento",
    text: "O resultado é observado ao longo do tempo, com retornos e ajustes quando necessários.",
  },
];
