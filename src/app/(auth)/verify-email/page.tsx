import styles from "../authpage.module.css";
import EmailConfirm from "@/src/ui/forms/AuthForms/EmailConfirm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <EmailConfirm email={email ?? ""} />
    </div>
  );
}