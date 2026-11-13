import { Workspace } from "@/components/Workspace";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main id="conteudo" className={styles.main}>
      <h1 className={styles.title}>Adapte uma atividade em poucos passos</h1>
      <p className={styles.lead}>
        Cole a atividade, escolha o perfil do aluno e receba uma versão pronta para revisar e
        usar em sala.
      </p>
      <Workspace />
    </main>
  );
}