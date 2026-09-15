import styles from "./PurePotency.module.css";
import { FACIAL_TREATMENTS, BODY_TREATMENTS, type Treatment } from "@/lib/treatments";
import Reveal from "./Reveal";
import ArrowIcon from "./ArrowIcon";

export default function PurePotency() {
  return (
    <section className={styles.section} id="tratamentos">
      <SideCurve className={styles.curveLeft} flip />
      <SideCurve className={styles.curveRight} />

      <div className={`container ${styles.heading}`}>
        <Reveal trigger="scroll" distance={10}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            Procedimentos
            <span className={styles.eyebrowRule} aria-hidden="true" />
          </p>
        </Reveal>
        <Reveal trigger="scroll" distance={20} delay={0.05}>
          <h2 className={styles.title}>
            <span>Cuidado feito </span>
            <em>para você</em>
          </h2>
        </Reveal>
        <Reveal trigger="scroll" distance={14} delay={0.1}>
          <p className={styles.intro}>
            Tratamentos personalizados para valorizar sua beleza com
            naturalidade, equilíbrio e precisão.
          </p>
        </Reveal>
      </div>

      <TreatmentBlock
        category="Faciais"
        description="Procedimentos pensados para suavizar, equilibrar e valorizar seus traços sem apagar o que torna você única."
        image="/images/Faciais.jpg"
        caption={["Beleza real", "em cada detalhe."]}
        captionTone="dark"
        treatments={FACIAL_TREATMENTS}
      />

      <TreatmentBlock
        category="Corporais"
        description="Protocolos personalizados para cuidar da pele, do contorno e do bem-estar de forma integrada."
        image="/images/corporais.jpg"
        caption={["Cuidado que", "acompanha você."]}
        captionTone="light"
        captionAlign="right"
        treatments={BODY_TREATMENTS}
        reverse
      />

      <Reveal trigger="scroll" distance={14} className={`container ${styles.signature}`}>
        <span className={styles.signatureRule} aria-hidden="true" />
        <p className={styles.signatureText}>
          Estética é cuidado. E cuidado é liberdade para ser você.
        </p>
        <span className={styles.signatureRule} aria-hidden="true" />
      </Reveal>
    </section>
  );
}

function TreatmentBlock({
  category,
  description,
  image,
  caption,
  captionTone,
  captionAlign = "left",
  treatments,
  reverse,
}: {
  category: string;
  description: string;
  image: string;
  caption: [string, string];
  captionTone: "dark" | "light";
  captionAlign?: "left" | "right";
  treatments: Treatment[];
  reverse?: boolean;
}) {
  return (
    <div className={`container ${styles.block} ${reverse ? styles.blockReverse : ""}`}>
      <Reveal
        trigger="scroll"
        scaleFrom={1.05}
        distance={0}
        className={styles.media}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.mediaImg}
          src={image}
          alt={
            category === "Faciais"
              ? "Retrato editorial em close, pele natural — tratamentos faciais"
              : "Fotografia editorial de pele e contorno corporal — tratamentos corporais"
          }
          width={1600}
          height={2400}
          loading="lazy"
        />
        <div
          className={[
            styles.mediaCaption,
            captionTone === "light" ? styles.mediaCaptionLight : styles.mediaCaptionDark,
            captionAlign === "right" ? styles.mediaCaptionRight : "",
          ].join(" ")}
        >
          <span className={styles.mediaCaptionRule} aria-hidden="true" />
          <p>
            {caption[0]}
            <br />
            {caption[1]}
          </p>
        </div>
      </Reveal>

      <div className={styles.body}>
        <Reveal trigger="scroll" distance={14}>
          <span className={styles.categoryRule} aria-hidden="true" />
          <h3 className={styles.category}>{category}</h3>
          <p className={styles.blockDesc}>{description}</p>
        </Reveal>

        <ul className={styles.list}>
          {treatments.map((tr, i) => (
            <Reveal
              key={tr.name}
              as="li"
              trigger="scroll"
              distance={12}
              delay={0.08 + i * 0.06}
              className={styles.listItem}
            >
              <span className={styles.itemMain}>
                <span className={styles.itemName}>{tr.name}</span>
                <span className={styles.itemDesc}>{tr.desc}</span>
              </span>
              <span className={styles.itemArrow}>
                <ArrowIcon size={14} />
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal trigger="scroll" distance={14} delay={0.2}>
          <a
            className={styles.blockCta}
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer"
          >
            Conhecer todos os tratamentos <ArrowIcon size={12} />
          </a>
        </Reveal>
      </div>
    </div>
  );
}

/* Extremely thin, low-opacity decorative curve hugging the left/right
   edge of the section — purely atmospheric, never competes with the
   photography or type. */
function SideCurve({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 900"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M -10 0 C 90 120, 10 360, 110 460 C 190 540, 60 720, 100 900"
        stroke="#c06f5f"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
    </svg>
  );
}
