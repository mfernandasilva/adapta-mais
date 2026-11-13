import { useEffect, useRef } from "react";
import type { AdaptState } from "@/hooks/useAdaptActivity";
import { Button } from "./Button";
import { EmphasizedText } from "./EmphasizedText";
import { ResultSheet } from "./ResultSheet";
import styles from "./ResultPanel.module.css";

interface ResultPanelProps {
  readonly state: AdaptState;
  readonly onRetry: () => void;
  readonly onCopy: () => void;
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyTitle}>Sua atividade adaptada aparece aqui.</p>
      <ol className={styles.emptySteps}>
        <li>Cole a atividade no campo ao lado.</li>
        <li>Escolha o perfil do aluno.</li>
        <li>Clique em “Adaptar atividade” e revise o resultado.</li>
      </ol>
    </div>
  );
}

function LoadingState() {
  return (
    <div role="status" className={styles.loading}>
      <p className={styles.loadingText}>
        Adaptando a atividade. Isso pode levar até 30 segundos.
      </p>
      <div className={styles.skeleton} aria-hidden="true">
        <span className={`${styles.line} ${styles.lineTitle}`} />
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={`${styles.line} ${styles.lineShort}`} />
        <span className={styles.line} />
        <span className={`${styles.line} ${styles.lineShort}`} />
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className={styles.error}>
      <p className={styles.errorTitle}>Não foi possível adaptar</p>
      <p className={styles.errorMessage}>{message}</p>
      <p className={styles.errorMessage}>Seu texto foi mantido. Você pode tentar de novo.</p>
      <Button variant="secondary" onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  );
}

export function ResultPanel({ state, onRetry, onCopy }: ResultPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.status !== "idle") headingRef.current?.focus();
  }, [state.status]);

  return (
    <section className={styles.panel} aria-labelledby="result-heading">
      <h2 id="result-heading" ref={headingRef} tabIndex={-1} className={styles.heading}>
        Resultado
      </h2>

      {state.status === "idle" && <EmptyState />}
      {state.status === "loading" && <LoadingState />}
      {state.status === "error" && <ErrorState message={state.message} onRetry={onRetry} />}

      {state.status === "success" && (
        <div className={styles.success}>
          <div className={styles.toolbar}>
            <p className={styles.meta}>Adaptada para o perfil: {state.result.profile.label}</p>
            <Button variant="secondary" onClick={onCopy}>
              Copiar texto
            </Button>
          </div>

          <ResultSheet activity={state.result.activity} visual={state.result.profile.visual} />

          {state.result.activity.teacherNotes && (
            <details className={styles.notes}>
              <summary className={styles.notesSummary}>O que foi alterado</summary>
              <p className={styles.notesText}>
                <EmphasizedText text={state.result.activity.teacherNotes} />
              </p>
            </details>
          )}

          <p className={styles.review}>
            Revise o conteúdo antes de entregar ao aluno: a IA pode cometer erros.
          </p>
        </div>
      )}
    </section>
  );
}