import styles from "../authpage.module.css";
import SignupForm from "@/src/ui/forms/AuthForms/SignupForm";

export default function Page() {
  return (
    <div className={`pagecontainer ${styles.container}`}>
      <SignupForm />
    </div>
  );
}
