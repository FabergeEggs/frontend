import styles from "../authpage.module.css";
import EmailConfirm from "@/src/ui/forms/AuthForms/EmailConfirm";

export default async function Page({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  console.log(await searchParams);
  const email = searchParams.email ?? "";

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <EmailConfirm email={email} />
    </div>
  );
}
