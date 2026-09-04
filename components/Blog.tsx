import styles from "./Blog.module.css";
import { ButtonLink } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { ArrowUpRight } from "./ui/Icons";
import { Reveal, RevealChild } from "./ui/Reveal";
import { blog } from "@/lib/content";

/**
 * Blog — geometria medida em https://handyx.framer.website/ @1440.
 *
 *   bloco      top 3879 · altura 1077 · fundo branco · padding 100px 20px
 *   inner      1300x877 · column · gap 60
 *   cabeçalho  1300x160 · row · space-between · align-items flex-end
 *   corpo      1300x657 · row · gap 20 · align-items center
 *              destaque 650 · lista 630 (3 itens de 205.6, gap 20)
 *
 * Item da lista: imagem 200 com radius só à esquerda (6px 0 0 6px) + texto
 * com padding 24 e gap 8.
 */
export function Blog() {
  return (
    <section className={styles.blog} id="news">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <Reveal className={styles.headLeft} stagger={0.08}>
            <RevealChild>
              <Eyebrow>{blog.eyebrow}</Eyebrow>
            </RevealChild>
            <RevealChild as="h2" className={`h2 ${styles.headline}`}>
              {blog.headlineStart}
              <br />
              {blog.headlineEnd}
            </RevealChild>
          </Reveal>

          <Reveal className={styles.headRight} stagger={0.08} delay={0.1}>
            <RevealChild as="p" className={styles.headParagraph}>
              {blog.paragraph}
            </RevealChild>
            <RevealChild>
              <ButtonLink href="#news">{blog.cta}</ButtonLink>
            </RevealChild>
          </Reveal>
        </div>

        <div className={styles.body}>
          <Reveal className={styles.featured}>
            <article className={styles.featuredCard}>
              <div className={styles.featuredImageClip}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.featuredImage}
                  src={blog.featured.image}
                  width={650}
                  height={400}
                  alt={blog.featured.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: blog.featured.position }}
                />
              </div>
              <div className={styles.featuredText}>
                <span className={styles.featuredDate}>{blog.featured.category}</span>
                <h3 className={styles.featuredTitle}>{blog.featured.title}</h3>
                <p className={styles.featuredExcerpt}>{blog.featured.excerpt}</p>
                <a className={styles.readMoreLg} href="#news">
                  <span>Read More</span>
                  <ArrowUpRight />
                </a>
              </div>
            </article>
          </Reveal>

          <Reveal className={styles.list} stagger={0.08} delay={0.1}>
            {blog.posts.map((post) => (
              <RevealChild key={post.title} as="article" className={styles.post}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.postImage}
                  src={post.image}
                  width={200}
                  height={206}
                  alt={post.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: post.position }}
                />
                <div className={styles.postText}>
                  <span className={styles.postDate}>{post.category}</span>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <a className={styles.readMoreSm} href="#news">
                    <span>Read More</span>
                    <ArrowUpRight />
                  </a>
                </div>
              </RevealChild>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
