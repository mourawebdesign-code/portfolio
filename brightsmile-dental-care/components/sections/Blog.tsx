import { A } from "@/lib/assets";
import { Button } from "../ui/Button";
import styles from "./Blog.module.css";

const POSTS = [
  {
    image: A.blogImage1,
    author: "By Nexa",
    read: "6 min read",
    title: "Essential Tips for Strong, Healthy Teeth and Gums",
  },
  {
    image: A.blogImage2,
    author: "By Vireo",
    read: "7 min read",
    title: "How Modern Dental Tech Improves Care and Health",
  },
];

export function Blog() {
  return (
    <section className={styles.section} id="blog">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head} data-reveal>
          <p className={styles.eyebrow}>
            <img src={A.blogEyebrowIcon} alt="" />
            Knowledge and Guidance
          </p>
          <h2 className={styles.title}>Learn and Discover</h2>
        </div>

        <div className={styles.grid}>
          {POSTS.map((post, i) => (
            <a
              className={styles.card}
              href="#"
              key={post.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
            >
              <span className={styles.cardMedia}>
                <img src={post.image} alt={post.title} loading="lazy" />
              </span>

              <span className={styles.cardBody}>
                <span className={styles.meta}>
                  <span className={styles.metaItem}>
                    <img src={A.blogMetaIcon1} alt="" />
                    {post.author}
                  </span>
                  <span className={styles.metaItem}>
                    <img src={A.blogMetaIcon2} alt="" />
                    {post.read}
                  </span>
                </span>
                <span className={styles.cardRule} aria-hidden="true" />
                <span className={styles.cardTitle}>{post.title}</span>
              </span>
            </a>
          ))}
        </div>

        <div className={styles.foot}>
          <Button variant="primary">Read More Blogs</Button>
        </div>
      </div>
    </section>
  );
}
