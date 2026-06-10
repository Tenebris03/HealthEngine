import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>HealthEngine</h1>
        <p className={styles.tagline}>You only live once, give it your best</p>
      </div>
    </section>
  );
}
