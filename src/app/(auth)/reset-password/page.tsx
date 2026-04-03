import styles from "../authpage.module.css";
import ResetPassword from "@/src/ui/forms/AuthForms/ResetPassword";

export default function Page() {
  return (
    <div className={`pagecontainer ${styles.container}`}>
      <ResetPassword />
    </div>
  );
}
