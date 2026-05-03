"use client"

import styles from "./taskpage.module.css";
import Image from "next/image";

import { TaskStatusEnum } from "@/src/lib/models/export/project";
import { useAuth } from "@/src/lib/providers/AuthProvider";

import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import StatusActiveImage from "@/public/assets/project/status-active.svg";
import ResponseForm from "@/src/ui/forms/ResponseForm/ResponseForm"
import ResponseCard from "@/src/ui/info/ResponseCard/ResponseCard";
import EditImage from "@/public/assets/edit.svg"
import FinishImage from "@/public/assets/project/finish.svg"

import ImageTextButton from "@/src/ui/buttons/ImageTextButton/ImageTextButton";
import { useState } from "react";


export default function TaskPageClient({
  data,
  responses,
}: {
    data: Task,
    responses: ResponseDTO[]
}) {
  const { userId } = useAuth()
  // const isAdmin = userId === data.creator_id;
  const isAdmin = true;

  const [editing, setEditing] = useState(false);

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.taskContainer}>
        <div className={`${styles.card} ${styles.cardPadding}`}>
          <h1 className={`basic-flex ${styles.label}`}>
            {data.label}
            {isAdmin && 
            <div className="basic-flex">
                <ImageTextButton text="Редактировать" src={EditImage} onClick={() => setEditing(true)}/>
                <ImageTextButton text="Завершить" src={FinishImage}/>
            </div>}
         </h1>
          <div className={styles.info}>
            <div className="basic-info-piece">
              <Image src={AuthorImage} alt="author image"></Image>
              <span className={styles.infoDescription}>Автор:</span>
              {data.creator}
            </div>
            <div className="basic-info-piece">
              <Image src={CreationTimeImage} alt="creation time image"></Image>
              <span className={styles.infoDescription}>Создано:</span>
              {new Date(data.created_at).toLocaleDateString("ru-RU")}
            </div>
            <div className="basic-info-piece">
              <Image src={StatusActiveImage} alt="active status image"></Image>
              <span className={styles.infoDescription}>Статус:</span>
              {data.status == TaskStatusEnum.ACTIVE && "Активен"}
              {data.status == TaskStatusEnum.FINISHED && "Завершён"}
              {data.status == TaskStatusEnum.DELETED && "Удалён"}
            </div>
          </div>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
      <ResponseForm className={styles.cardPadding} placeholder="Напишите свой ответ"/>
      
      { responses.length > 0 && <div className={styles.responses}>
        {responses.map((value, index) => <ResponseCard className={styles.cardPadding} {...value} key={index} username="максЧерпак" isAdmin={isAdmin} />)} {/** <!> */}
      </div>}
      
        
    </div>
  );
}
