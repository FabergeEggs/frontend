import styles from "./PostCardAdmin.module.css";
import PostCard from "../PostCard/PostCard";
import { useState } from "react";
import ConfirmationModal from "../../modals/ConfirmationModal";
import TransparentTextImageButton from "../../buttons/TransparentTextImageButton/TransparentTextImageButton";

/* Images: */
import Image from "next/image";
import TrashImage from '@/public/assets/project/trash.svg'

interface PostCardAdminProps {
  project_id: string,
  id: string,
  label: string,
  short_description: string, // I suppose description should be shorted if needed and then ... needs to be added
  comments_count: number,
  deleteAction: () => void
}

// Alternative Project Card variant for project page
export default function PostCardAdmin({project_id, id, label, short_description, comments_count, deleteAction}: PostCardAdminProps) {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)

  return (
      <PostCard project_id={project_id} id={id} label={label} short_description={short_description} comments_count={comments_count}>
          <TransparentTextImageButton onClick={() => setConfirmationModalOpen(true)} className={styles.interaction} src={TrashImage} text="Удалить" imageFirst={true} />

          {/* <div onClick={() => setConfirmationModalOpen(true)} className={styles.interaction}>
              <Image src={TrashImage} alt="Delete post button image" />
              Удалить
          </div> */}
          {confirmationModalOpen && <ConfirmationModal isOpen={confirmationModalOpen} label="Вы уверены, что хотите удалить данный пост?" text="После удаления все данные и комментарии пользователей будут безвозвратно удалены." action={deleteAction} actionText="Удалить"  handleClose={() => setConfirmationModalOpen(false)}/>}
      </PostCard>
  );
}
