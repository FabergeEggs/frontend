import styles from "./ProjectCard.module.css";

export default function ProjectCard() {
  return (
    <div className={`basic-box ${styles.card}`}>
      <p>Проект</p>
    </div>
  );
}
