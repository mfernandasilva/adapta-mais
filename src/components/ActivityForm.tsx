import type { FormEvent } from "react";
import type { LearningProfile, LearningProfileId } from "@/core/domain/learning-profile";
import { Button } from "./Button";
import styles from "./ActivityForm.module.css";
import { ProfileSelector } from "./ProfileSelector";

interface ActivityFormProps {
  readonly text: string;
  readonly onTextChange: (text: string) => void;
  readonly profiles: readonly LearningProfile[];
  readonly profileId: LearningProfileId;
  readonly onProfileChange: (id: LearningProfileId) => void;
  readonly onSubmit: () => void;
  readonly onClear: () => void;
  readonly isLoading: boolean;
  readonly maxChars: number;
}

export function ActivityForm({
  text,
  onTextChange,
  profiles,
  profileId,
  onProfileChange,
  onSubmit,
  onClear,
  isLoading,
  maxChars,
}: ActivityFormProps) {
  const length = text.length;
  const isEmpty = text.trim().length === 0;
  const excess = length - maxChars;
  const isOverLimit = excess > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isEmpty && !isOverLimit && !isLoading) onSubmit();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="activity-text">
          Atividade original
        </label>
        <textarea
          id="activity-text"
          className={styles.textarea}
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder="Cole aqui o texto e as questões da atividade."
          aria-describedby="activity-hint activity-counter"
          aria-invalid={isOverLimit}
          disabled={isLoading}
        />
        <div className={styles.meta}>
          <p id="activity-hint" className={styles.hint}>
            Não inclua nomes ou dados pessoais de alunos.
          </p>
          <p
            id="activity-counter"
            className={isOverLimit ? styles.counterOver : styles.counter}
          >
            {isOverLimit
              ? `${excess} caracteres acima do limite`
              : `${length} de ${maxChars} caracteres`}
          </p>
        </div>
      </div>

      <ProfileSelector
        profiles={profiles}
        value={profileId}
        onChange={onProfileChange}
        disabled={isLoading}
      />

      <div className={styles.actions}>
        <Button type="submit" disabled={isEmpty || isOverLimit || isLoading} aria-busy={isLoading}>
          {isLoading ? "Adaptando…" : "Adaptar atividade"}
        </Button>
        <Button variant="secondary" onClick={onClear} disabled={text.length === 0 || isLoading}>
          Limpar texto
        </Button>
      </div>
    </form>
  );
}