import styles from "../authpage.module.css";
import ResetPasswordLink from "@/src/ui/forms/AuthForms/ResetPasswordLink";

export default function Page() {
  return (
    <div className={`pagecontainer ${styles.container}`}>
      <ResetPasswordLink />
    </div>
  );
}
