import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>A adaptação é uma sugestão: revise sempre o resultado antes de entregar ao aluno.</p>
        <Link href="/saiba-mais#limitacoes">Limitações e documentos oficiais</Link>
      </div>
    </footer>
  );
}