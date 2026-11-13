import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  readonly variant?: "primary" | "secondary" | "danger";
}

export function Button({ variant = "primary", type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={`${styles.button} ${styles[variant]}`} {...rest} />;
}