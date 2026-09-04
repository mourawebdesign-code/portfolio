/**
 * Conteúdo do site — Volterra Electric.
 *
 * A geometria (larguras, alturas, contagem de linhas) foi medida na
 * referência original e cada string abaixo foi dimensionada para preencher
 * aproximadamente a mesma métrica, para que o layout aprovado não precise
 * ser redesenhado por causa do texto novo.
 */

export const site = {
  name: "Volterra Electric",
  brandFirst: "Volterra",
  brandAccent: "Electric",
  tagline: "Powering homes. Keeping life moving.",
  phoneLabel: "(512) 555-0148",
  phoneHref: "tel:+15125550148",
  email: "hello@volterraelectric.com",
  emailHref: "mailto:hello@volterraelectric.com",
  address: "4201 South Congress Ave, Austin, TX 78745",
  hours: "Mon–Fri: 7:00 AM – 6:00 PM · Sat: 8:00 AM – 4:00 PM",
  ctaPrimary: "Get a Free Estimate",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  rating: "5.0 Google Rating",
  /* Sem quebra manual — o h1 flui livremente dentro dos 650px da coluna,
     como no original ("Your one-stop solution for all your home needs."). */
  headlineBefore: "Your ",
  headlineAccent: "trusted electrician",
  headlineAfter: " for every job.",
  /* Quebra autoral entre as duas linhas do parágrafo, como no original. */
  paragraphLine1: "Licensed electricians for repairs, installations, upgrades, and",
  paragraphLine2: "everything in between. Serving homes and businesses across Austin.",
  ctaPrimary: "Get a Free Estimate",
  metrics: [
    { value: "15+", label: "Years of Experience" },
    { value: "3,500+", label: "Jobs Completed" },
    { value: "100%", label: "Satisfaction Guaranteed" },
  ],
};

export const about = {
  eyebrow: "About Us",
  headlineAccent: "Dependable",
  headlineMid: " electricians",
  headlineEnd: "you can count on.",
  paragraph:
    "For over 15 years, Volterra Electric has helped Austin homeowners and businesses keep their properties safe, powered, and running smoothly. From simple repairs to complete electrical upgrades, our licensed electricians deliver dependable workmanship, clear communication, and solutions built to last.",
  benefits: [
    "Licensed & insured electricians",
    "Upfront, honest pricing",
    "Quality workmanship backed by guarantee",
  ],
  badge: "100% Satisfaction Guaranteed",
  cta: "Learn More",
  image: "/images/volterra/about-electricians.webp",
  imageAlt: "The Volterra Electric team standing in front of their service van",
};

export const services = {
  eyebrow: "Our Services",
  headlineStart: "Electrical solutions",
  headlineEnd: "for every need.",
  paragraph:
    "From everyday electrical repairs to major upgrades, our licensed electricians have the experience to get the job done safely and correctly.",
  cta: "View All Services",
  items: [
    {
      icon: "/icons/services/electrical-repairs.svg",
      title: "Electrical Repairs",
      text: "Fast, reliable troubleshooting and repairs for outlets, switches, breakers, wiring, and more.",
    },
    {
      icon: "/icons/services/panel-upgrades.svg",
      title: "Panel Upgrades",
      text: "Upgrade outdated electrical panels for safer, more reliable power throughout your property.",
    },
    {
      icon: "/icons/services/lighting-installation.svg",
      title: "Lighting Installation",
      text: "Professional installation for indoor, outdoor, recessed, and landscape lighting.",
    },
    {
      icon: "/icons/services/ev-charger.svg",
      title: "EV Charger Installation",
      text: "Convenient home EV charging installed safely and configured for your vehicle.",
    },
    {
      icon: "/icons/services/wiring-rewiring.svg",
      title: "Wiring & Rewiring",
      text: "Safe, code-compliant wiring solutions for renovations, additions, and older properties.",
    },
    {
      icon: "/icons/services/commercial-electrical.svg",
      title: "Commercial Electrical",
      text: "Dependable electrical services for offices, retail spaces, restaurants, and local businesses.",
    },
  ],
};

export const quote = {
  title: "Get Your Free Estimate",
  description:
    "Tell us what you need and we'll get back to you with a clear, no-obligation estimate.",
  fields: {
    name: { label: "Full Name", placeholder: "Jane Smith" },
    phone: { label: "Phone Number", placeholder: "(512) 555-0148" },
    email: { label: "Email Address", placeholder: "jane@example.com" },
    service: { label: "Service Needed" },
    details: {
      label: "Tell us about the project",
      placeholder: "Describe the electrical work you need...",
    },
  },
  serviceOptions: [
    "Electrical Repair",
    "Panel Upgrade",
    "Lighting Installation",
    "EV Charger Installation",
    "Wiring & Rewiring",
    "Commercial Electrical",
    "Other",
  ],
  cta: "Request My Free Estimate",
  image: "/images/volterra/estimate-electrician.webp",
  imageAlt: "Volterra Electric branded service van parked outside a home",
};

export const gallery = {
  eyebrow: "Projects",
  headlineStart: "Electrical work",
  headlineEnd: "done right.",
  paragraph:
    "Take a look at some of the residential and commercial electrical projects completed by our team.",
  cta: "View All Projects",
  /* Grid editorial assimétrico — cada imagem carrega uma identificação
     discreta (categoria + cidade) exibida sobre um degradê sutil. */
  items: [
    {
      src: "/images/volterra/project-panel-upgrade.webp",
      w: 1536,
      h: 1024,
      position: "center 30%",
      category: "Panel Upgrade",
      location: "Austin, TX",
      alt: "Electrician inspecting a labeled residential breaker panel with a flashlight",
    },
    {
      src: "/images/volterra/project-ev-charger.webp",
      w: 1800,
      h: 1200,
      position: "left center",
      category: "EV Charger Installation",
      location: "Cedar Park, TX",
      alt: "Electrician plugging in a home EV charger in a garage",
    },
    {
      src: "/images/volterra/project-lighting.webp",
      w: 1536,
      h: 1024,
      position: "center 30%",
      category: "Lighting Installation",
      location: "Austin, TX",
      alt: "Electrician installing a pendant light fixture over a kitchen island",
    },
    {
      src: "/images/volterra/project-commercial.webp",
      w: 1536,
      h: 1024,
      position: "center 25%",
      category: "Commercial Electrical",
      location: "Round Rock, TX",
      alt: "Electrician on a ladder wiring ceiling lighting in a shopping mall corridor",
    },
    {
      src: "/images/volterra/project-wiring.webp",
      w: 1536,
      h: 1024,
      position: "center 30%",
      category: "Wiring & Rewiring",
      location: "Pflugerville, TX",
      alt: "Electrician connecting wires in an open junction box in a house under construction",
    },
  ],
};

export const blog = {
  eyebrow: "Electrical Tips",
  headlineStart: "Expert advice to keep",
  headlineEnd: "your property powered.",
  paragraph:
    "Practical electrical advice from licensed professionals to help keep your home safe, efficient, and up to date.",
  cta: "View All Articles",
  featured: {
    category: "Electrical Safety",
    title: "7 Signs Your Electrical Panel Needs an Upgrade",
    excerpt:
      "Older electrical panels can struggle with the demands of modern homes. Learn the warning signs that it may be time for an upgrade.",
    image: "/images/volterra/blog-panel-upgrade.webp",
    position: "center 25%",
    alt: "Electrician inspecting a labeled circuit breaker panel with a flashlight",
  },
  posts: [
    {
      category: "EV Charging",
      title: "Level 1 vs. Level 2 EV Charging: What's Right for Your Home?",
      excerpt: "A simple guide to choosing the right home charging setup for your electric vehicle.",
      image: "/images/volterra/blog-ev-charging.webp",
      position: "left center",
      alt: "Electric vehicle charging in a home garage",
    },
    {
      category: "Electrical Safety",
      title: "Why Does My Circuit Breaker Keep Tripping?",
      excerpt: "Frequent breaker trips can point to an overloaded circuit or a more serious electrical issue.",
      image: "/images/volterra/blog-circuit-breaker.webp",
      position: "center",
      alt: "Close-up of an open circuit breaker panel",
    },
    {
      category: "Lighting",
      title: "5 Lighting Upgrades That Can Transform Your Home",
      excerpt: "Simple lighting improvements that can make your home brighter, more comfortable, and more efficient.",
      image: "/images/volterra/blog-lighting.webp",
      position: "center",
      alt: "Modern home exterior illuminated with landscape and architectural lighting at dusk",
    },
  ],
};

/**
 * ATENÇÃO: os depoimentos abaixo já são as avaliações fornecidas pelo
 * cliente para este case. Antes de qualquer publicação real, confirme que
 * cada uma corresponde a uma avaliação genuína (nome, avaliação e origem).
 */
export const testimonials = {
  eyebrow: "Testimonials",
  headlineStart: "Trusted by homeowners",
  headlineEnd: "across Austin.",
  paragraph:
    "From quick repairs to major electrical upgrades, our customers count on us for safe, reliable work and straightforward service.",
  cta: "Get a Free Estimate",
  items: [
    {
      quote:
        "We had several outlets stop working and Volterra had an electrician at our home the same day. He found the issue quickly, explained everything clearly, and had it fixed in no time.",
      name: "Michael R.",
      role: "Homeowner",
      avatar: "/handyx/testimonials/a1.png",
    },
    {
      quote:
        "Volterra upgraded our old electrical panel and the entire process was smooth from start to finish. Professional crew, fair price, and excellent workmanship.",
      name: "Sarah T.",
      role: "Homeowner",
      avatar: "/handyx/testimonials/a2.webp",
    },
    {
      quote:
        "We hired them to install a Level 2 charger in our garage. Scheduling was easy, the installation looks incredibly clean, and everything works perfectly.",
      name: "Daniel M.",
      role: "Homeowner",
      avatar: "/handyx/testimonials/a3.jpg",
    },
    {
      quote:
        "Our office needed new lighting and additional circuits. The team worked around our business hours and finished exactly when promised.",
      name: "Jennifer C.",
      role: "Business Owner",
      avatar: "/handyx/testimonials/a4.jpg",
    },
    {
      quote:
        "Responsive, professional, and straightforward. They found an electrical problem two other companies couldn't figure out.",
      name: "Robert K.",
      role: "Homeowner",
      avatar: "/handyx/testimonials/a5.jpg",
    },
    {
      quote:
        "From the first phone call to the final walkthrough it was straightforward. Clear pricing, tidy work, and everything explained in plain language.",
      name: "Amanda P.",
      role: "Homeowner",
      avatar: "/handyx/testimonials/a6.jpg",
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  headlineStart: "Answers to your",
  headlineAccent: "electrical",
  headlineEnd: " questions.",
  asideTitle: "Still have questions?",
  asideText:
    "Talk with our team about your electrical project and we'll help you figure out the next step.",
  asideCta: "Contact Us",
  items: [
    {
      q: "What electrical services do you offer?",
      a: "We handle residential and commercial electrical repairs, panel upgrades, lighting installation, EV chargers, wiring and rewiring, troubleshooting, and more throughout the Austin area.",
    },
    {
      q: "Do you offer emergency electrical service?",
      a: "Yes. We provide emergency electrical service for urgent issues such as power loss, burning smells, sparking outlets, and other electrical problems that may require immediate attention.",
    },
    {
      q: "Are your electricians licensed and insured?",
      a: "Yes. Our electricians are licensed, insured, and trained to perform electrical work safely and in accordance with applicable codes.",
    },
    {
      q: "How much does an electrician cost?",
      a: "Pricing depends on the type and scope of work. We provide clear estimates before work begins so you know what to expect.",
    },
    {
      q: "Can you install an EV charger at my home?",
      a: "Yes. We install Level 2 home EV chargers and can evaluate your electrical panel and existing system to determine the right setup for your vehicle.",
    },
    {
      q: "How quickly can I schedule an electrician?",
      a: "We offer flexible scheduling and same-day availability for many service calls. Contact our team and we'll find the earliest available appointment for your area.",
    },
  ],
};

export const areas = {
  eyebrow: "Service Areas",
  headlineStart: "Serving ",
  headlineCity: "Austin",
  headlineEnd: " & the surrounding area.",
  cta: "Get a Free Estimate",
  paragraph:
    "We're proud to provide professional electrical services to homeowners and businesses throughout Austin and nearby communities.",
  cities: ["Austin", "Round Rock", "Cedar Park", "Pflugerville", "Georgetown", "Leander"],
  image: "/images/volterra/service-areas-team.webp",
  imageAlt: "The Volterra Electric crew standing in front of their service van at a home",
};

export const footer = {
  headline: "We're ready to power your next project.",
  contacts: [
    { label: "Phone Number", value: site.phoneLabel, href: site.phoneHref },
    { label: "Email Address", value: site.email, href: site.emailHref },
    { label: "Location", value: site.address },
  ],
  socialTitle: "Follow our work",
  links: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#gallery" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#quote" },
  ],
  copyright: "© 2026 Volterra Electric. All rights reserved.",
};
