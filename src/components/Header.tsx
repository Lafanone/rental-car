"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCatalogList = pathname === "/catalog";

  return (
    <header className={`${styles.header} ${isHome ? styles.headerWhite : styles.headerGray}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="RentalCar home">
          <span className={styles.logoRental}>Rental</span>
          <span className={styles.logoCar}>Car</span>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          <Link
            href="/"
            className={`${styles.navLink} ${isHome ? styles.navLinkActive : ""}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${styles.navLink} ${isCatalogList ? styles.navLinkActive : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
