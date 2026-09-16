"use client";
import Image from "next/image";
import { PHILOSOPHY } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";
import s from "./Philosophy.module.css";

type IconKey = (typeof PHILOSOPHY.features)[number]["icon"];

/* Ícones lineares próprios (24x24, mesmo padrão de stroke já usado no
   projeto — ver setas de Treatments/Location), um por feature. Não há
   biblioteca de ícones instalada, então seguimos a convenção existente de
   SVG inline em vez de introduzir uma dependência nova. */
function FeatureIcon({ icon }: { icon: IconKey }) {
  const common = { viewBox: "0 0 24 24", width: 26, height: 26, fill: "none" as const, "aria-hidden": true };
  const stroke = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "leaf":
      return (
        <svg {...common}>
          <path d="M4 12c3.5-5 12.5-5 16 0-3.5 5-12.5 5-16 0Z" {...stroke} />
          <path d="M12 7.5v9" {...stroke} />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7.5" {...stroke} />
          <path d="M12 4.5v15M4.5 12h15" {...stroke} />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" {...stroke} />
          <circle cx="12" cy="12" r="3" {...stroke} />
          <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "balance":
      return (
        <svg {...common}>
          <path d="M12 4v14.5" {...stroke} />
          <path d="M4.5 8h15" {...stroke} />
          <path d="M4.5 8c0 2.8 1.8 5 3.5 5s3.5-2.2 3.5-5" {...stroke} />
          <path d="M12 8c0 2.8 1.8 5 3.5 5s3.5-2.2 3.5-5" {...stroke} />
        </svg>
      );
    case "contour":
      return (
        <svg {...common}>
          <path d="M8.5 4.5c-3.3 1.3-5 5-4 8.8 1 3.7 4.2 6.4 7.7 6.2" {...stroke} />
          <path d="M9 9.8c.3-1 1.2-1.7 2-1.7" {...stroke} />
        </svg>
      );
    case "harmony":
      return (
        <svg {...common}>
          <path d="M3.5 9.5c2-2 4-2 6 0s4 2 6 0 4-2 5-0.5" {...stroke} />
          <path d="M3.5 15c2-2 4-2 6 0s4 2 6 0 4-2 5-0.5" {...stroke} />
        </svg>
      );
  }
}

function Feature({ f, area, side }: { f: (typeof PHILOSOPHY.features)[number]; area: string; side: "left" | "right" }) {
  return (
    <div className={`${s.feature} ${side === "left" ? s.featureLeft : s.featureRight}`} style={{ gridArea: area }} data-reveal>
      <span className={s.featureIcon}><FeatureIcon icon={f.icon} /></span>
      <h3 className={s.featureTitle}>{f.title}</h3>
      <p className={s.featureText}>{f.text}</p>
    </div>
  );
}

export default function Philosophy() {
  const { ref: topRef, visible: topVisible } = useReveal<HTMLDivElement>();
  const { ref: composeRef, visible: composeVisible } = useReveal<HTMLDivElement>();
  const [left1, left2, left3, right1, right2, right3] = PHILOSOPHY.features;

  return (
    <section id="philosophy" className={s.section}>
      <div className={s.inner}>
        <div className={`${s.top} ${topVisible ? s.visible : ""}`} ref={topRef}>
          <span className={`eyebrow ${s.eyebrow}`}>{PHILOSOPHY.eyebrow}</span>
          <h2 className={s.heading}>
            {PHILOSOPHY.headingLead}
            <br />
            sobre <span className={s.highlight}>{PHILOSOPHY.headingHighlight}</span> um rosto.
          </h2>
          <p className={s.lead}>{PHILOSOPHY.lead}</p>
        </div>
      </div>

      {/* Fora do .inner de propósito: essa fileira (features | doutora | features)
          usa uma largura própria, mais generosa que o container de texto, para
          ocupar o espaço horizontal que sobrava nas laterais da foto em vez de
          crescer verticalmente. As 6 features e a foto são irmãos num único
          CSS Grid; grid-template-areas muda por breakpoint (3 colunas no
          desktop, 2 no tablet/mobile, 1 em telas muito estreitas) — a ordem
          visual muda sem tocar na ordem do DOM. */}
      <div className={`${s.compose} ${composeVisible ? s.visible : ""}`} ref={composeRef}>
        <Feature f={left1} area="f1" side="left" />
        <Feature f={left2} area="f2" side="left" />
        <Feature f={left3} area="f3" side="left" />

        <div className={s.mediaWrap} style={{ gridArea: "media" }}>
          <div className={s.mediaFrame}>
            <Image
              src={PHILOSOPHY.image.src}
              alt={PHILOSOPHY.image.alt}
              fill
              sizes="(max-width:1023px) 70vw, 40vw"
              quality={95}
              className={s.image}
            />
          </div>
        </div>

        <Feature f={right1} area="f4" side="right" />
        <Feature f={right2} area="f5" side="right" />
        <Feature f={right3} area="f6" side="right" />
      </div>
    </section>
  );
}
