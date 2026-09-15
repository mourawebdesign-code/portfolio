import styles from "./Blog.module.css";
import Reveal from "./Reveal";

const POSTS = [
  {
    title: "O que muda entre bioestimulador e preenchimento",
    desc: "Entenda a diferença de indicação, tempo de resultado e manutenção entre os dois procedimentos mais buscados da estética facial.",
    image: "/organic/blog/xlSl7Mvj0w2MTRtYyOYB8BSYjA.png",
  },
  {
    title: "Como identificar um planejamento facial bem feito",
    desc: "Sinais de que um protocolo foi desenhado para o seu rosto — e não aplicado de forma padronizada.",
    image: "/organic/blog/O8Xnm5Tsxat9qKebFj0WuEVAgE.png",
  },
];

export default function Blog() {
  return (
    <section className={styles.section} id="insights">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <div>
            <p className={styles.kicker}>Insights</p>
            <h2 className={styles.title}>Conteúdo com autoridade</h2>
          </div>
          <a className={styles.viewAll} href="#insights">
            Ver todos
          </a>
        </div>

        <div className={styles.grid}>
          {POSTS.map((p, i) => (
            <Reveal
              key={p.title}
              trigger="scroll"
              distance={24}
              delay={i * 0.08}
              className={styles.card}
            >
              <a className={styles.cardInner} href="#insights">
                <div className={styles.media}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" aria-hidden="true" />
                </div>
                <p className={styles.cardTitle}>{p.title}</p>
                <p className={styles.cardDesc}>{p.desc}</p>
                <p className={styles.readMore}>Ler artigo</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
