"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "./Button";
import styles from "./ConsentDialog.module.css";
import { Modal } from "./Modal";

interface ConsentDialogProps {
  readonly open: boolean;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
}

function ConsentForm({ onCancel, onConfirm }: Omit<ConsentDialogProps, "open">) {
  const [checked, setChecked] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (checked) onConfirm();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.text}>
        O texto da atividade é enviado a um serviço de IA externo (Google Gemini) para ser
        adaptado. No uso gratuito, esse conteúdo pode ser analisado pela Google para melhorar
        seus produtos.
      </p>

      <label className={styles.check}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
        <span>
          Confirmo que a atividade não contém nomes, laudos nem outros dados pessoais de alunos.
        </span>
      </label>

      <p className={styles.link}>
        <Link href="/saiba-mais#privacidade">Entenda como os dados são tratados</Link>
      </p>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={!checked}>
          Adaptar atividade
        </Button>
      </div>
    </form>
  );
}

export function ConsentDialog({ open, onCancel, onConfirm }: ConsentDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title="Antes de adaptar">
      <ConsentForm onCancel={onCancel} onConfirm={onConfirm} />
    </Modal>
  );
}