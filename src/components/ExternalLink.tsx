import type { ReactNode } from "react";
import styles from "./ExternalLink.module.css";

interface ExternalLinkProps {
  readonly href: string;
  readonly children: ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <svg
        className={styles.icon}
        viewBox="0 0 16 16"
        width="14"
        height="14"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M6 3h7v7M13 3 5 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="visually-hidden"> (abre em nova aba)</span>
    </a>
  );
}