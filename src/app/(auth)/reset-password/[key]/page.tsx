import styles from "../../authpage.module.css"
import ResetPassword from "@/src/ui/forms/AuthForms/ResetPassword";

export default async function ResetPasswordFromLinkPage({
  params,
}: {
  params: Promise<{key: string}>;
}) {
  const { key } = await params;

  return (
    <div className={`pagecontainer ${styles.container}`}>
      { key && <ResetPassword resetKey={key} />}
      { !key && <p>Не дан ключ</p>}
    </div>
  );
}
