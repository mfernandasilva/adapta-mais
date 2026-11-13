"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const ITEMS = [
  { href: "/", label: "Home" },
  { href: "/saiba-mais", label: "Saiba mais" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Adapta+
        </Link>
        <nav aria-label="Principal">
          <ul className={styles.list}>
            {ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive ? `${styles.link} ${styles.active}` : styles.link}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}