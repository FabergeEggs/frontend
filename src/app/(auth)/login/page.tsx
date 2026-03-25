import styles from '../page.module.css'
import LoginForm from '@/src/ui/forms/AuthForms/LoginForm'

export default function Page() {
  return (
    <div className={styles.container}>
      <LoginForm/>
    </div>
  )
}