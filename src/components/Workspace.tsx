"use client";

import { useEffect, useState } from "react";
import { activityToPlainText } from "@/core/domain/activity-text";
import type { LearningProfileId } from "@/core/domain/learning-profile";
import { listProfiles } from "@/core/profiles";
import { useAdaptActivity } from "@/hooks/useAdaptActivity";
import { ActivityForm } from "./ActivityForm";
import { ConfirmDialog } from "./ConfirmDialog";
import { ConsentDialog } from "./ConsentDialog";
import { ResultPanel } from "./ResultPanel";
import { useToast } from "./ToastProvider";
import styles from "./Workspace.module.css";

/** Deve acompanhar MAX_INPUT_CHARS do servidor (que continua sendo a validação oficial). */
const MAX_INPUT_CHARS = 15000;

const profiles = listProfiles();

export function Workspace() {
  const [text, setText] = useState("");
  const [profileId, setProfileId] = useState<LearningProfileId>("dyslexia");
  const [hasConsented, setHasConsented] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [isClearOpen, setIsClearOpen] = useState(false);

  const { state, adapt } = useAdaptActivity();
  const { showToast } = useToast();

  useEffect(() => {
    if (state.status === "success") {
      showToast("success", "Atividade adaptada. Revise antes de usar.");
    }
    if (state.status === "error") {
      showToast("error", state.message);
    }
  }, [state, showToast]);

  function runAdaptation() {
    void adapt({ text, profileId });
  }

  function handleSubmit() {
    if (!hasConsented) {
      setIsConsentOpen(true);
      return;
    }
    runAdaptation();
  }

  function handleConsentConfirm() {
    setHasConsented(true);
    setIsConsentOpen(false);
    runAdaptation();
  }

  function handleClearConfirm() {
    setText("");
    setIsClearOpen(false);
    showToast("info", "Texto removido.");
  }

  async function handleCopy() {
    if (state.status !== "success") return;
    try {
      await navigator.clipboard.writeText(activityToPlainText(state.result.activity));
      showToast("success", "Texto copiado.");
    } catch {
      showToast("error", "Não foi possível copiar. Selecione o texto manualmente.");
    }
  }

  return (
    <div className={styles.workspace}>
      <ActivityForm
        text={text}
        onTextChange={setText}
        profiles={profiles}
        profileId={profileId}
        onProfileChange={setProfileId}
        onSubmit={handleSubmit}
        onClear={() => setIsClearOpen(true)}
        isLoading={state.status === "loading"}
        maxChars={MAX_INPUT_CHARS}
      />
      <ResultPanel state={state} onRetry={handleSubmit} onCopy={() => void handleCopy()} />

      <ConsentDialog
        open={isConsentOpen}
        onCancel={() => setIsConsentOpen(false)}
        onConfirm={handleConsentConfirm}
      />
      <ConfirmDialog
        open={isClearOpen}
        title="Limpar o texto?"
        message="O texto digitado será removido do campo. Essa ação não pode ser desfeita."
        confirmLabel="Limpar texto"
        onCancel={() => setIsClearOpen(false)}
        onConfirm={handleClearConfirm}
      />
    </div>
  );
}