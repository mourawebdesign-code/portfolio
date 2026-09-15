export type Plan = {
  name: string;
  price: string;
  desc: string;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    name: "Essencial",
    price: "Sob avaliação",
    desc: "Para quem inicia o cuidado com um protocolo enxuto e direcionado.",
    features: ["Avaliação individual", "1 procedimento", "Retorno de acompanhamento"],
  },
  {
    name: "Assinatura",
    price: "Sob avaliação",
    desc: "Protocolo contínuo, pensado para manutenção e evolução gradual.",
    features: ["Avaliação individual", "Protocolo trimestral", "Prioridade na agenda", "Acompanhamento contínuo"],
  },
  {
    name: "Autoral",
    price: "Sob avaliação",
    desc: "Plano combinado e exclusivo, desenhado caso a caso pela especialista.",
    features: ["Avaliação estendida", "Protocolo combinado", "Acompanhamento dedicado"],
  },
];
