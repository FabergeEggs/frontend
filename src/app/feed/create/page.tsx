import styles from './createprojectpage.module.css'
import ProjectForm from '@/src/ui/forms/ProjectForm/ProjectForm'

export default function CreateProfilePage() {
  return (
    <div className={`pagecontainer ${styles.container}`}>
      <ProjectForm/>
    </div>
  )
}