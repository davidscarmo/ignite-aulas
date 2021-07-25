import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
export function SingInButton() {
  const isUserLoggedIn = true;
  return isUserLoggedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      David Carmo
      <FiX color="#737388" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#eba417" />
      Sing in with GitHub
    </button>
  );
}
