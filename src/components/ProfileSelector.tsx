import type { LearningProfile, LearningProfileId } from "@/core/domain/learning-profile";
import styles from "./ProfileSelector.module.css";

interface ProfileSelectorProps {
  readonly profiles: readonly LearningProfile[];
  readonly value: LearningProfileId;
  readonly onChange: (id: LearningProfileId) => void;
  readonly disabled?: boolean;
}

export function ProfileSelector({ profiles, value, onChange, disabled }: ProfileSelectorProps) {
  return (
    <fieldset className={styles.fieldset} disabled={disabled}>
      <legend className={styles.legend}>Perfil do aluno</legend>
      <div className={styles.list}>
        {profiles.map((profile) => (
          <label key={profile.id} className={styles.option}>
            <input
              className={styles.input}
              type="radio"
              name="profile"
              value={profile.id}
              checked={profile.id === value}
              onChange={() => onChange(profile.id)}
            />
            <span className={styles.card}>
              <span className={styles.name}>{profile.label}</span>
              <span className={styles.description}>{profile.description}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}