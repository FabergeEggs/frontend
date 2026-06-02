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
  avatar_url?: string | null;
  text: string;
  status: ResponseStatus;
  attached_files: string[];
  created_at: string;
  isAdmin?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
}

const statusBorder: Record<ResponseStatus, string> = {
  [ResponseStatus.PENDING]: "4px solid #3b82f6",
  [ResponseStatus.ACCEPTED]: "4px solid #16a34a",
  [ResponseStatus.REJECTED]: "4px solid #dc2626",
  [ResponseStatus.CANCELLED]: "none",
};

// Alternative Project Card variant for project page
export default function ResponseCard({className, id: _id, username, user_id: _user_id, avatar_url, text, status, attached_files, created_at, isAdmin = false, onApprove, onReject}: ResponseCardProps) {
  const borderColor = statusBorder[status] ?? "none";
  return (
    <div className={`${className} basic-card`} style={{ borderLeft: borderColor, borderRight: borderColor }}>
      <div className={styles.header}>
        <div className="basic-flex">
          <UserInfo username={username} created_at={created_at} avatar_url={avatar_url} />
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
