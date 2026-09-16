export const NAV = [
  { label: "Filosofia", href: "#philosophy" },
  { label: "Tratamentos", href: "#treatments" },
  { label: "Especialista", href: "#specialist" },
  { label: "Resultados", href: "#results" },
];

export const HERO = {
  /* Quatro peças de texto independentes, exatamente como no Figma (Aurea,
     node 51:3) — NUNCA uma string que quebra sozinha. "titleH1" e
     "titleFacial" (linha 1 e a primeira palavra da linha 2) + "titleTail"
     (2ª palavra da linha 2, ao lado da cabeça da doutora) formam a
     headline em --ink; "titleHighlight" é a palavra gigante em destaque
     (--violet), posicionada atrás/ao redor da foto da doutora. */
  titleH1: "Harmonização",
  titleFacial: "Facial",
  titleTail: "Sem",
  titleHighlight: "excessos",
  body: "Tratamentos personalizados para equilibrar proporções, suavizar sinais e valorizar seus traços com precisão e naturalidade.",
  primary: "Agendar Avaliação",
  secondary: "Conhecer tratamentos",
};

export const PROMO = [
  "Harmonização sem excessos",
  "Respeito aos seus traços",
  "Resultados naturais",
  "Cada rosto é único",
  "Precisão em cada detalhe",
  "Beleza sem padrões",
];

/* 02 — Manifesto/Filosofia. Substitui o antigo bloco isolado de Manifesto +
   Stats: aqui a marca explica sua filosofia antes de vender procedimentos. */
export const PHILOSOPHY = {
  eyebrow: "Especialistas em harmonização facial",
  headingLead: "Harmonização não é",
  headingHighlight: "mudar",
  lead: "Cada rosto tem proporções únicas. Por isso, cada harmonização é planejada individualmente para valorizar seus traços com equilíbrio, precisão e naturalidade.",
  image: { src: "/images/lumea/Filosofia.png", alt: "Especialista da Luméa sentada em um sofá, segurando uma seringa, representando o cuidado individual por trás de cada harmonização" },
  features: [
    { icon: "leaf", title: "Naturalidade",
      text: "Resultados sutis, pensados para preservar sua expressão e evitar excessos." },
    { icon: "grid", title: "Planejamento individual",
      text: "Cada tratamento parte das proporções, características e objetivos do seu rosto." },
    { icon: "target", title: "Precisão",
      text: "Técnica, anatomia e atenção aos detalhes orientam cada decisão do procedimento." },
    { icon: "balance", title: "Equilíbrio de proporções",
      text: "Cada intervenção é pensada em relação ao conjunto do rosto, não de forma isolada." },
    { icon: "contour", title: "Respeito aos seus traços",
      text: "O objetivo não é criar um novo rosto, mas valorizar as características que já são suas." },
    { icon: "harmony", title: "Resultados harmônicos",
      text: "Mudanças cuidadosamente planejadas para que o resultado converse naturalmente com o seu rosto." },
  ],
};

export const TREATMENTS = {
  eyebrow: "Tratamentos",
  heading: ["Cada rosto pede uma", "abordagem diferente."],
  body: "Procedimentos escolhidos a partir das proporções, características e objetivos de cada paciente.",
  items: [
    { slug: "contouring", name: "Harmonização Facial",
      text: "Equilíbrio entre proporções, preservando as características que tornam seu rosto único.",
      image: "/images/lumea/treatments/contouring-after.jpg", focus: "center 30%" },
    { slug: "lips", name: "Preenchimento Labial",
      text: "Volume e contorno na medida certa, sem perder a naturalidade da sua expressão.",
      image: "/images/lumea/treatments/lips-after.jpg", focus: "center 65%" },
    { slug: "skin", name: "Rejuvenescimento da Pele",
      text: "Textura, luminosidade e firmeza recuperadas com protocolos individuais.",
      image: "/images/lumea/treatments/skin-after.jpg", focus: "center 30%" },
    { slug: "botox", name: "Toxina Botulínica",
      text: "Linhas de expressão suavizadas, mantendo a mobilidade natural do rosto.",
      image: "/images/lumea/treatments/botox-after.jpg", focus: "center 22%" },
    { slug: "biostimulators", name: "Bioestimuladores de Colágeno",
      text: "Estímulo gradual de colágeno para firmeza e qualidade de pele a longo prazo.",
      image: "/images/lumea/treatments/botox-before.jpg", focus: "center 25%" },
    { slug: "jawline", name: "Contorno Mandibular",
      text: "Definição da linha da mandíbula com equilíbrio e naturalidade.",
      image: "/images/lumea/treatments/contouring-before.jpg", focus: "center 35%" },
    { slug: "nasolabial", name: "Preenchimento de Sulco",
      text: "Suavização do sulco nasolabial, preservando a expressão natural do rosto.",
      image: "/images/lumea/treatments/lips-before.jpg", focus: "center 60%" },
    { slug: "skinbooster", name: "Skinbooster",
      text: "Hidratação profunda para pele com mais viço, textura e luminosidade.",
      image: "/images/lumea/treatments/skin-before.jpg", focus: "center 30%" },
  ],
  viewAllHref: "#treatments",
};

/* 04 — Banner CTA entre Tratamentos e Especialista: card editorial largo,
   headline de 2 linhas ("tratamento" em destaque na 1ª) + descrição + 1 CTA. */
export const RUPTURE = {
  headingPre: "Qual",
  headingHighlight: "tratamento",
  headingLine2: "você procura?",
  body: "Agende uma avaliação e descubra a abordagem mais indicada para você.",
  cta: "Agendar Avaliação",
  image: { src: "/images/lumea/banner.png", alt: "Atmosfera de cuidado em procedimento estético na Luméa" },
};

/* 05 — Especialista. Absorve os números que antes viviam isolados em Stats. */
export const SPECIALIST = {
  eyebrow: "A especialista",
  name: "Olivia Bennett",
  role: "Especialista em Estética Avançada",
  quote: "Meu trabalho não começa escolhendo um procedimento. Começa entendendo o que realmente faz sentido para cada rosto.",
  bio: "Olivia atua há mais de 10 anos na área da estética, com foco em tratamentos personalizados e resultados naturais. Seu trabalho combina técnica, cuidado e uma abordagem individual para valorizar os traços de cada paciente sem excessos.",
  credentials: [
    { year: "2014", text: "Início da atuação na área de estética" },
    { year: "2019", text: "Aperfeiçoamento em procedimentos injetáveis e harmonização facial" },
    { year: "2023", text: "Fundação da Luméa Aesthetics" },
  ],
  stats: [
    { value: 10, suffix: "+", decimals: 0, label: "Anos de experiência" },
    { value: 2500, suffix: "+", decimals: 0, label: "Pacientes atendidas" },
    { value: 5000, suffix: "+", decimals: 0, label: "Procedimentos realizados" },
  ] as const,
  portrait: { src: "/images/lumea/about/Sobre.png", alt: "Olivia Bennett, especialista em estética avançada" },
  editorial: { src: "/images/lumea/gallery/momento-evento.png", alt: "Olivia Bennett recebendo reconhecimento em evento do setor" },
};

/* 06 — Resultados. Result showcase editorial: um único comparador grande por
   vez (nunca mais os 3 casos em zigue-zague), navegação troca o caso ativo. */
export const RESULTS = {
  eyebrow: "Resultados",
  headingLine1: "Sutil o suficiente",
  headingLine2Pre: "para continuar",
  headingLine2Highlight: "sendo você.",
  body: "Resultados que preservam sua expressão enquanto valorizam proporções, contornos e características individuais.",
  cases: [
    { slug: "case1", treatment: "Toxina Botulínica",
      before: "/images/lumea/results/case1-before.jpg", after: "/images/lumea/results/case1-after.jpg" },
    { slug: "case2", treatment: "Preenchimento Labial",
      before: "/images/lumea/results/case2-before.jpg", after: "/images/lumea/results/case2-after.jpg" },
    { slug: "case3", treatment: "Rejuvenescimento da Pele",
      before: "/images/lumea/results/case3-before.jpg", after: "/images/lumea/results/case3-after.jpg" },
  ],
};

export const CTA_MID = {
  text: "Seu resultado começa com uma avaliação individual.",
  button: "Agendar Avaliação",
};

/* 08 — Experiência Luméa. Antes "Por dentro da Luméa": galeria estática de
   5 fotos lado a lado. Agora um carrossel editorial de 3 momentos. */
export const EXPERIENCE = {
  eyebrow: "A experiência Luméa",
  heading: "Cuidado que começa antes do procedimento.",
  items: [
    { n: "01", title: "Atendimento individual", text: "Tudo começa pela escuta.",
      file: "momento-procedimento.png", alt: "Profissional realizando procedimento estético em paciente na Luméa", position: "50% 42%" },
    { n: "02", title: "Ambiente pensado para você", text: "Privacidade, conforto e tranquilidade.",
      file: "momento-equipe.png", alt: "Equipe da Luméa na recepção da clínica", position: "50% 34%" },
    { n: "03", title: "Acompanhamento", text: "O cuidado continua depois da sua visita.",
      file: "momento-presente.png", alt: "Profissional entregando presente de boas-vindas a paciente", position: "50% 40%" },
  ],
};

export const VISIT_CTA = {
  heading: "Seu momento de cuidado.",
  body: "Conheça os tratamentos indicados para você em uma avaliação individual.",
  button: "Agendar Avaliação",
};

export const TESTIMONIALS = {
  eyebrow: "Histórias reais",
  heading: "A confiança também faz parte do resultado.",
  items: [
    { id: "t1", avatar: "a1", name: "Priya R.",
      quote: "Eu queria algo bem discreto, e foi exatamente isso que encontrei. Ainda pareço eu mesma, só que descansada." },
    { id: "t2", avatar: "a2", name: "Marisol T.",
      quote: "Ela me explicou com calma o que fazia sentido e o que não valia a pena. Uma honestidade que a gente não vê todo dia." },
    { id: "t3", avatar: "a3", name: "Angela T.",
      quote: "Sempre sou atendida pela mesma profissional, que lembra exatamente do que fizemos da última vez. Isso faz diferença pra mim." },
    { id: "t4", avatar: "a4", name: "Daniel M.",
      quote: "Marquei a avaliação numa terça e já fui atendido na sexta. Sem pressão, só opções bem explicadas." },
  ],
};

/* 12 — Localização. Usa só endereço/telefone/e-mail já existentes no
   projeto — nenhum horário de funcionamento é inventado. */
export const LOCATION = {
  eyebrow: "Localização",
  headingLine1: "Um espaço pensado",
  headingLine2Pre: "para ",
  headingLine2Highlight: "receber você.",
  intro: "No coração dos Jardins, um espaço pensado para receber você com conforto, privacidade e tranquilidade.",
  addressLabel: "Endereço",
  address: "Rua Oscar Freire, 1250\nJardins, São Paulo - SP\n01426-001",
  hoursLabel: "Horário",
  hours: ["Segunda a sexta · 9h às 19h", "Sábado · 9h às 14h"],
  cta: "Como chegar",
  geo: ["Jardins", "São Paulo — SP"],
};

export const FOOTER = {
  headline: ["Estética que valoriza", "o que faz você única."],
  address: "Rua Oscar Freire, 1250\nJardins, São Paulo - SP\n01426-001",
  exploreLinks: [
    { label: "Filosofia", href: "#philosophy" },
    { label: "Tratamentos", href: "#treatments" },
    { label: "Especialista", href: "#specialist" },
    { label: "Resultados", href: "#results" },
  ],
  patientLinks: [
    { label: "Agendar avaliação", href: "#visit" },
    { label: "Antes e depois", href: "#results" },
  ],
  phone: "(11) 4000-2847",
  email: "hello@lumeaaesthetics.com",
  /* Sem perfil/número reais cadastrados no projeto ainda — placeholders
     seguros (não quebram o site), a trocar quando existirem. */
  social: [
    { label: "Instagram", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
  copyright: "© 2026 Luméa Estética. Todos os direitos reservados.",
  legalLinks: [
    { label: "Política de Privacidade", href: "#" },
    { label: "Acessibilidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
  ],
};

export const BRAND = {
  name: "Luméa Aesthetics",
  short: "Luméa",
  subtitle: "AESTHETICS",
  city: "São Paulo, Brasil",
};
