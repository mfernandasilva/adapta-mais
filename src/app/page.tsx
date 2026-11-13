import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Adapta+</h1>
      <p className={styles.subtitle}>
        Adaptação de atividades para alunos com necessidades específicas.
      </p>
    </main>
  );
}
