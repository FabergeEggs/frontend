import styles from "../authpage.module.css";
import EmailConfirm from "@/src/ui/forms/AuthForms/EmailConfirm";

// Probably not the best solution. Other variants: cookie, storage
export default function Page({ query }: { query: { email: string } }) {
  return (
    <div className={`pagecontainer ${styles.container}`}>
      <EmailConfirm email={query.email} />
    </div>
  )
}
