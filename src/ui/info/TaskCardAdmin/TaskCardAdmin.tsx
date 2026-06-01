import styles from "./TaskCardAdmin.module.css";
import TaskCard from "../TaskCard/TaskCard";
import TransparentTextImageButton from "../../buttons/TransparentTextImageButton/TransparentTextImageButton";


import { TaskStatusEnum } from "@/src/lib/models/export/project";

/* Images: */

import FinishImage from '@/public/assets/project/finish.svg'
import RestartImage from '@/public/assets/project/restart.svg'


interface TaskCardAdminProps {
  project_id: string,
  id: string,
  status: TaskStatusEnum | null,
  label: string,
  short_description: string, // I suppose description should be shorted if needed and then ... needs to be added
  answers_count: number
}

export default function TaskCardAdmin({project_id, id, status, label, short_description, answers_count}: TaskCardAdminProps) {
  return (
      <TaskCard project_id={project_id} id={id} label={label} short_description={short_description} answers_count={answers_count}>
          <span className={styles.interaction}>
            {status === TaskStatusEnum.ACTIVE && <>
            <TransparentTextImageButton src={FinishImage} text="Завершить" imageFirst={true} />
            </>}
            {status === TaskStatusEnum.FINISHED && <>
              <TransparentTextImageButton src={RestartImage} text="Возобновить" imageFirst={true} />
            </>}
          </span>
      </TaskCard>
  );
}
