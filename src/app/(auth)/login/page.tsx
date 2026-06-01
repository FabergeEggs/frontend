import styles from "../authpage.module.css";
import LoginForm from "@/src/ui/forms/AuthForms/LoginForm";

export default function Page() {
  return (
    <div className={`pagecontainer ${styles.container}`}>
      <LoginForm />
    </div>
  );
}
