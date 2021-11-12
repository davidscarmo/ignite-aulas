import { SignInButton } from "../SingInButton";
import styles from "./styles.module.scss";
import Link from "next/link";
import { ActiveLink } from "../ActiveLink";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="id.news" />
        <nav>
          <ActiveLink activeClasseName={styles.active} href="/">
            <a className={styles.active}>Home</a>
          </ActiveLink>
          {/* It is possible to use prefetch at ActiveLink*/}
          <ActiveLink activeClasseName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
