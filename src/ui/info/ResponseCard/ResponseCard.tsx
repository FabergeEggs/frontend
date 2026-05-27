import styles from "./ResponseCard.module.css";
import Image from "next/image";
import StatusActiveImage from "@/public/assets/project/status-active.svg";
import FileInfo from "../FileInfo/FileInfo";

import { ResponseStatus } from "@/src/lib/models/export/response"
import ImageTextButton from "../../buttons/ImageTextButton/ImageTextButton";

import CheckImage from "@/public/assets/check.svg"
import RedCrossImage from "@/public/assets/red-cross.svg"

import UserInfo from "../UserInfo/UserInfo";

interface ResponseCardProps {
  className: string;
  id: string;
  username: string;
  user_id: string;
  text: string;
  status: ResponseStatus;
  attached_files: string[];
  created_at: string;
  isAdmin?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

// Alternative Project Card variant for project page
export default function ResponseCard({className, id: _id, username, user_id: _user_id, text, status, attached_files, created_at, isAdmin = false, onApprove, onReject}: ResponseCardProps) {
  return (
    <div className={`${className} basic-card`}>
      <div className={styles.header}>
        <div className="basic-flex">
          <UserInfo username={username} created_at={created_at} />
          <div className={styles.status}>
            <Image src={StatusActiveImage} alt="active status image"></Image>
            <span className={styles.infoDescription}>Статус:</span>
            {status == ResponseStatus.PENDING  && "Ожидание"}
            {status == ResponseStatus.ACCEPTED && "Одобрено"}
            {status == ResponseStatus.REJECTED && "Отвергнут"}
            {status == ResponseStatus.CANCELLED && "Отменён"}
          </div>  
        </div>
        {isAdmin &&
            <div className="basic-flex">
                <ImageTextButton text="Одобрить" src={CheckImage} onClick={onApprove} />
                <ImageTextButton text="Отклонить" src={RedCrossImage} color="var(--danger-color)" onClick={onReject} />
            </div>}
      </div>
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.attachedFiles}>
        {attached_files && attached_files.map((value, index) => (
              <FileInfo key={index} name={value} index={index} />
          ))}
      </div>
    </div>
  );
}
