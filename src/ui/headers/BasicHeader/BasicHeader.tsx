import styles from "./BasicHeader.module.css";

import Logo from "../../info/Logo/Logo";
import HeaderIcon from "../../images/HeaderIcon/HeaderIcon";

export default function BasicHeader() {
  return (
    <header className={styles.header}>
      <Logo />
      <HeaderIcon className={styles.headerIcon} />
    </header>
  );
}
