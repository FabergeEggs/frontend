import styles from './page.module.css'
import SignupForm from "@/src/ui/forms/SignupForm/SignupForm"

export default function Page() {
  return (
    <div className={styles.container}>
      <SignupForm/>
    </div>
  )
}