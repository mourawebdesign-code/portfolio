import styles from "./Footer.module.css";
import { Facebook, Instagram, LinkedIn, XSocial } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { footer, site } from "@/lib/content";

/**
 * Footer — geometria medida em https://handyx.framer.website/ @1440.
 *
 *   footer top 7226 · altura 637 · bg #000 · padding 100px 20px 0
 *   bloco superior 1300x470 · barra inferior 1300x67
 *   h3 42/50.4 branco · rótulos 12/18 · valores 18/27
 *   links do rodapé 18/27 com gap 40 · copyright 16/22.4 peso 600
 *
 * Conferência: 100 + 470 + 67 + 0 = 637.
 */
const socials = [
  { label: "Facebook", Icon: Facebook },
  { label: "Instagram", Icon: Instagram },
  { label: "X", Icon: XSocial },
  { label: "LinkedIn", Icon: LinkedIn },
];

export function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.top}>
          <div className={styles.topRow}>
            <h2 className={styles.headline}>{footer.headline}</h2>

            <div className={styles.community}>
              <h3 className={styles.communityTitle}>{footer.socialTitle}</h3>
              <ul className={styles.socials}>
                {socials.map(({ label, Icon }) => (
                  <li key={label}>
                    {/* Sem contas sociais reais neste projeto de portfólio —
                        mantido como elemento visual, fora da ordem de tab e
                        do leitor de tela, em vez de um link para lugar nenhum. */}
                    <a aria-hidden="true" tabIndex={-1} aria-label={label}>
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className={styles.contacts}>
            {footer.contacts.map((c) => (
              <li key={c.label} className={styles.contact}>
                <span className={styles.contactLabel}>{c.label}</span>
                {c.href ? (
                  <a className={styles.contactValue} href={c.href}>
                    {c.value}
                  </a>
                ) : (
                  <span className={styles.contactValue}>{c.value}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={styles.bottom}>
          <ul className={styles.links}>
            {footer.links.map((l) => (
              <li key={l.href}>
                <a className={styles.link} href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.copyright}>{footer.copyright}</p>
        </div>
      </div>

      <span className={styles.srOnlyName}>{site.name}</span>
    </footer>
  );
}
