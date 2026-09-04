"use client";

import { useState, type FormEvent } from "react";
import styles from "./QuoteForm.module.css";
import { ArrowRight, Check } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { quote } from "@/lib/content";

/**
 * Quote — geometria medida em https://handyx.framer.website/ @1440.
 *
 *   section    top 2460 · altura 708 · fundo branco · padding 100px 20px
 *   container  1300x508 · flex row · gap 40 · align-items center
 *   coluna E   630 · imagem 630x506 radius 12
 *   coluna D   630x508 · padding 40 · bg rgba(187,221,255,.2) · radius 6
 *              flex column gap 20: header 66 · 58 · 58 · 118 · botão 48 = 428
 *
 * Campo = label 12/18 + caixa branca de 40 (radius 6, padding 12) com o input
 * transparente dentro. O textarea segue o mesmo padrão com caixa de 100.
 *
 * O formulário ainda não está ligado a nenhum backend — é estrutura de
 * template; a integração entra na etapa de personalização.
 */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <span className={styles.control}>{children}</span>
    </label>
  );
}

export function QuoteForm() {
  const f = quote.fields;
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Projeto de portfólio sem backend real — apenas confirma o envio na UI.
    setSubmitted(true);
  }

  return (
    <section className={styles.quote} id="quote">
      <div className={`container ${styles.row}`}>
        <Reveal className={styles.media}>
          <div className={styles.frame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.image}
              src={quote.image}
              width={630}
              height={506}
              alt={quote.imageAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <Reveal className={styles.form} delay={0.1}>
          {submitted ? (
            <div className={styles.success} role="status">
              <span className={styles.successIcon} aria-hidden>
                <Check />
              </span>
              <h2 className={styles.title}>Thanks! Your request has been received.</h2>
              <p className={styles.desc}>
                A member of our team will get back to you shortly with your
                free, no-obligation estimate.
              </p>
            </div>
          ) : (
            <form
              className={styles.formEl}
              onSubmit={handleSubmit}
              noValidate={false}
            >
              <div className={styles.head}>
                <h2 className={styles.title}>{quote.title}</h2>
                <p className={styles.desc}>{quote.description}</p>
              </div>

              <div className={styles.fieldRow}>
                <Field label={f.name.label}>
                  <input
                    type="text"
                    name="name"
                    placeholder={f.name.placeholder}
                    autoComplete="name"
                    required
                  />
                </Field>
                <Field label={f.phone.label}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={f.phone.placeholder}
                    autoComplete="tel"
                    required
                  />
                </Field>
              </div>

              <div className={styles.fieldRow}>
                <Field label={f.email.label}>
                  <input
                    type="email"
                    name="email"
                    placeholder={f.email.placeholder}
                    autoComplete="email"
                    required
                  />
                </Field>
                <Field label={f.service.label}>
                  <select name="service" defaultValue="" required>
                    <option value="" disabled>
                      Select…
                    </option>
                    {quote.serviceOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>{f.details.label}</span>
                <span className={`${styles.control} ${styles.textareaBox}`}>
                  <textarea name="details" placeholder={f.details.placeholder} />
                </span>
              </label>

              <button type="submit" className={styles.submit}>
                <span>{quote.cta}</span>
                <ArrowRight />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
