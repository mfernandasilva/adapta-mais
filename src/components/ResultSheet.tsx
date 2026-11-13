import type { CSSProperties } from "react";
import type { AdaptedActivity } from "@/core/domain/activity";
import type { VisualRules } from "@/core/domain/learning-profile";
import { EmphasizedText } from "./EmphasizedText";
import styles from "./ResultSheet.module.css";

interface ResultSheetProps {
  readonly activity: AdaptedActivity;
  readonly visual: VisualRules;
}

function toSheetStyle(visual: VisualRules): CSSProperties {
  return {
    "--sheet-bg": visual.backgroundHex,
    "--sheet-text": visual.textHex,
    "--sheet-font": `${visual.fontFamily}, Arial, Helvetica, sans-serif`,
    "--sheet-size": `${visual.fontSizePt}pt`,
    "--sheet-leading": String(visual.lineSpacing),
    textAlign: visual.alignment,
  } as CSSProperties;
}

export function ResultSheet({ activity, visual }: ResultSheetProps) {
  return (
    <article className={styles.sheet} style={toSheetStyle(visual)}>
      <h3 className={styles.title}>{activity.title}</h3>

      {activity.passage.length > 0 && (
        <section className={styles.section}>
          {activity.passage.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              <EmphasizedText text={paragraph} />
            </p>
          ))}
        </section>
      )}

      {activity.instructions.length > 0 && (
        <section className={styles.section}>
          <h4 className={styles.heading}>O que fazer</h4>
          <ol className={styles.steps}>
            {activity.instructions.map((instruction, index) => (
              <li key={index}>
                <EmphasizedText text={instruction} />
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className={styles.section}>
        <h4 className={styles.heading}>Questões</h4>
        <ol className={styles.questions} role="list">
          {activity.questions.map((question) => (
            <li key={question.number} className={styles.question}>
              <span className={styles.number}>{question.number}</span>
              <div>
                <p className={styles.statement}>
                  <EmphasizedText text={question.statement} />
                </p>
                {question.options && (
                  <ol className={styles.options}>
                    {question.options.map((option, index) => (
                      <li key={index}>
                        <EmphasizedText text={option} />
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}