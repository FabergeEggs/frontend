import styles from "../authpage.module.css";
import EmailConfirm from "@/src/ui/forms/AuthForms/EmailConfirm";

export default function Page({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email ?? "";

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <EmailConfirm email={email} />
    </div>
  );
}
