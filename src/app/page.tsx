import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src="/images/hero.jpg"
          alt="White sports car driving on a highway at sunset"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          objectFit="cover"
        />
        <div className={styles.overlay} aria-hidden />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link href="/catalog" className={styles.cta}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
