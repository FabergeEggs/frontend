"use client"

import styles from "./projectpage.module.css";
import Image from "next/image";
import Tag from "@/src/ui/info/Tag/Tag";

import { ProjectStatusEnum } from "@/src/lib/models/export/project";

import { useState } from "react";

import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import StatusActiveImage from "@/public/assets/project/status-active.svg";
import CancelImage from "@/public/assets/close.svg"
import TaskCard from "@/src/ui/info/TaskCard/TaskCard";
import TaskCardAdmin from "@/src/ui/info/TaskCardAdmin/TaskCardAdmin";
import PostCard from "@/src/ui/info/PostCard/PostCard";
import PostCardAdmin from "@/src/ui/info/PostCardAdmin/PostCardAdmin";

import TaskForm from "@/src/ui/forms/TaskForm/TaskForm";
import PostForm from "@/src/ui/forms/PostForm/PostForm";

import ImageTextButton from "@/src/ui/buttons/ImageTextButton/ImageTextButton";
import EditImage from "@/public/assets/edit.svg";
import NewTaskImage from "@/public/assets/project/task.svg";
import NewPostImage from "@/public/assets/project/new-post.svg";
import CheckImage from "@/public/assets/check.svg"

import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import ProjectTextarea from "@/src/ui/inputs/ProjectInput/ProjectTextarea";
import ProjectUpdateFormTag from "@/src/ui/info/ProjectUpdateFormTag/ProjectUpdateFormTag";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import { projectSchema } from "@/src/lib/utils/zodSchemas";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

import { updateProject, getPublications, deletePost } from "@/src/lib/api/project";

import { useEffect } from "react";

import { PublicationTypeEnum, TaskStatusEnum } from "@/src/lib/models/export/project";

const testTaskData = {
  id: "1",
  project_id: "1",
  created_at: new Date(),
  creator_id: "1",
  creator_name: "Privet",
  type: PublicationTypeEnum.TASK,
  label: "Перепись населения в городе Ижевск",
  short_description: "В связи с приходом весны жители Буммаша начали активно почковаться, внося диссонанс в статистику населения столицы России. С целью обновления статистических данных нам необходимо собрать информацию о текущем населении Ижевска. Вы можете помочь нам, ведь вам понадобиться лишь простой советский...", 
  answers_count: 11,
  status: TaskStatusEnum.ACTIVE
}
const testTaskData1 = {
  id: "2",
  project_id: "1",
  created_at: new Date(),
  creator_id: "1",
  creator_name: "Privet",
  type: PublicationTypeEnum.TASK,
  label: "Перепись населения в городе Ижевск",
  short_description: "В связи с приходом весны жители Буммаша начали активно почковаться, внося диссонанс в статистику населения столицы России. С целью обновления статистических данных нам необходимо собрать информацию о текущем населении Ижевска. Вы можете помочь нам, ведь вам понадобиться лишь простой советский...", 
  answers_count: 11,
  status: TaskStatusEnum.FINISHED
}

const testPostData = {
  id: "3",
  project_id: "1",
  created_at: new Date(),
  creator_id: "1",
  creator_name: "Privet",
  label: "Перепись населения в городе Ижевск",
  short_description: "В связи с приходом весны жители Буммаша начали активно почковаться, внося диссонанс в статистику населения столицы России. С целью обновления статистических данных нам необходимо собрать информацию о текущем населении Ижевска. Вы можете помочь нам, ведь вам понадобиться лишь простой советский...", 
  answers_count: 11,
  type: PublicationTypeEnum.POST,
  status: null
}

const publications: PublicationDTO[] = [testTaskData, testTaskData1, testPostData]

export default function ProjectPageClient({data}: {data: ProjectFull }) {
  const { userId } = useAuth()
  // const isAdmin = userId === data.creator_id;
  const isAdmin = true; // <!> Plugging!

  const [isEditing, setEditing] = useState(false)
  const [isCreatingTask, setCreatingTask] = useState(false)
  const [isPosting, setPosting] = useState(false)

  const [serverError, setServerError] = useState<string | null>(null);
  const [currentTagInput, setCurrentTagInput] = useState<string>("");

  // DEBUG <!>
  // const [publications, setPublications] = useState<PublicationDTO[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const posts = publications.filter((publication) => publication.type === "post");
  const tasks = publications.filter((publication) => publication.type === "task");

  // <!> Plugging
  // const publicationsResponse: Promise<PublicationsResponse> = getPublications(data.project_id)
  // useEffect(() => {
  //   publicationsResponse.then((data) => {
  //     console.log("PUBLICATIONS: ", data)
  //     setPublications(data.items)
  //     setNextCursor(data.next_cursor)
  //     setHasMore(data.has_more)
  //   }).catch((error) => {
  //     console.error("Failed to fetch publications: ", error)
  //   })

  // }, [])

  const {
    register: registerField,
    trigger,
    formState: { errors, dirtyFields, isValid },
    setValue,
    getValues,
    watch,
  } = useForm<z.infer<typeof projectSchema>>({
    mode: "onChange",
    resolver: zodResolver(projectSchema),
    defaultValues: {
      label: data.label,
      short_description: "DEBUG SHORT DESCRIPTION", // data.short_description <!> DEBUG
      description: data.description,
      tags: data.tags.map((value) => value.name),
    },
  });

  const watchedTags = watch("tags");

  const handleAddTag = () => {
      if (currentTagInput.trim()) {
        const currentTags = getValues("tags") || [];
        if (!currentTags.includes(currentTagInput.trim()))
          setValue("tags", [...currentTags, currentTagInput.trim()], { shouldValidate: true });
        setCurrentTagInput("");
      }
    };
  
    const handleRemoveTag = (tagToRemove: string) => {
      const currentTags = getValues("tags") || [];
      setValue("tags", currentTags.filter(tag => tag !== tagToRemove), { shouldValidate: true });
    };
  
    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTag();
      }
    };
  
    const handleSubmit = async (e: React.SubmitEvent) => {
      e.preventDefault();
      setServerError(null);
  
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    const projectUpdateRequestData: ProjectCreateDTO = {
      label: formValues.label as string,
      short_description: formValues.short_description as string,
      description: formValues.description as string,
      tags: getValues("tags") || [],
      status: ProjectStatusEnum.ACTIVE
    }


    try {
      console.log("Submitting project updating with data: ", projectUpdateRequestData); // DEBUG
      const response = await updateProject(data.project_id, projectUpdateRequestData);
      console.log("Project creation successful: ", response);
      setEditing(false);
    } catch (error: any) {
      // const status = error.response?.status;
      // <!> - Продумать ошибки
      setServerError("Ошибка обновления проекта. Попробуйте позже");
      console.error("Project updating failed: ", error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      // Remove the deleted post from the state or refetch the publications
    } catch (error) {
      console.error("Failed to delete post: ", error);
    }
  };

  return (
    <div className={`pagecontainer ${styles.container}`}>
      <div className={styles.projectContainer}>
        {!isAdmin || !isEditing && 
        <div className={styles.card}>
          <h1 className={styles.label}>
            {data.label}
            {isAdmin && <ImageTextButton text="Редактировать" src={EditImage} onClick={() => setEditing(true)}/>}
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
              {data.status == ProjectStatusEnum.ACTIVE && "Активен"}
              {data.status == ProjectStatusEnum.FINISHED && "Завершён"}
              {data.status == ProjectStatusEnum.DELETED && "Удалён"}
            </div>
          </div>
          <div className={styles.tags}>
            {data.tags &&
              data.tags.map((tag: Tag, index: number) => (
                <Tag key={tag.tag_id || index}>{tag.name}</Tag>
              ))}
          </div>
          <p className={styles.description}>{data.description}</p>
          {isAdmin && <div className={styles.adminButtons}>
            {!isCreatingTask && <a className="basic-link" href="#taskform">
                <ImageTextButton text="Новая задача" src={NewTaskImage} onClick={() => setCreatingTask(true)} />
              </a>}
            {isCreatingTask && <ImageTextButton text="Отменить создание задачи" src={CancelImage} onClick={() => setCreatingTask(false)} />}
            
            {!isPosting && <a className="basic-link" href="#postform">
              <ImageTextButton text="Новый пост" src={NewPostImage} onClick={() => setPosting(true)}/>
            </a>}
            {isPosting && <ImageTextButton text="Отменить создание поста" src={CancelImage} onClick={() => setPosting(false)} />}
            
          </div>}
        </div>}

        {/* EDIT BLOCK */}

        {(isAdmin && isEditing) && 
          <form onSubmit={handleSubmit} className={`${styles.card} ${styles.editCard}`}>
            <div className={styles.infoPiece}>
              <AuthInput label="Название проекта" placeholder="Введите новое название проекта..." {...registerField("label")}/>
              <ImageTextButton type="submit" text="Сохранить" src={CheckImage} color="var(--active-dark-color)" backgroundColor="var(--varity2-color)"/>
            </div>
            <div className={styles.tags}>
              {watchedTags.map((tag, index) => 
                <ProjectUpdateFormTag key={index} onClick={() => handleRemoveTag(tag)}>
                  {tag}
                </ProjectUpdateFormTag> 
              )}
              {/* <Image className="cursor-pointer" src={AddTagImage} alt="Add tag image"/> */}
              <AuthInput
                label=""
                placeholder="Добавьте тег..."
                required={false}
                value={currentTagInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.infoPiece}>
                <Image src={AuthorImage} alt="author image"></Image>
                <span className={styles.infoDescription}>Автор:</span>
                {data.creator}
              </div>
              <div className={styles.infoPiece}>
                <Image src={CreationTimeImage} alt="creation time image"></Image>
                <span className={styles.infoDescription}>Создано:</span>
                {new Date(data.created_at).toLocaleDateString("ru-RU")}
              </div>
              <div className={styles.infoPiece}>
                <Image src={StatusActiveImage} alt="active status image"></Image>
                <span className={styles.infoDescription}>Статус:</span>
                {data.status == ProjectStatusEnum.ACTIVE && "Активен"}
                {data.status == ProjectStatusEnum.FINISHED && "Завершён"}
                {data.status == ProjectStatusEnum.DELETED && "Удалён"}
              </div>
            </div>
            <ProjectTextarea height={238} label="Описание:" placeholder="Введите новое описание проекта..." {...registerField("description")}/>
        </form>}

          {serverError && <ValidationError messages={[serverError]} />}
        {/* ---------------- */}
        <div className={styles.countInfo}>
          <div className={styles.box}>
            <span className={styles.count}>{data.participants_count}</span>
            <span>участников</span>
          </div>
          <div className={styles.box}>
            <span className={styles.count}>{data.tasks_count}</span>
            <span>заданий</span>
          </div>
          <div className={styles.box}>
            <span className={styles.count}>{data.answers_count}</span>
            <span>ответов</span>
          </div>
        </div>
      </div>
      {isAdmin && <>
        {isCreatingTask && <div id="taskform">
          <TaskForm project_id={data.project_id}/>
        </div>}
        {isPosting && <div id="postform">
          <PostForm project_id={data.project_id}/>
        </div>}
      </>}

      <div className={styles.projects}>
        {!isAdmin && <>
          {publications.length > 0 && publications.map((publication) => {
            if (publication.type === "post") {
              return <PostCard key={publication.id} {...publication} comments_count={publication.answers_count} />
            } else if (publication.type === "task") {
              return <TaskCard key={publication.id} {...publication} />
            }
          })}
        </>}
        {isAdmin && <>
            { posts.length > 0 && <>
            {posts.map((value, index) => <PostCardAdmin {...value} key={index} deleteAction={() => deletePost(value.id)} comments_count={value.answers_count}/>)}
          </>}
            { tasks.length > 0 && <>
            {tasks.map((value, index) => <TaskCardAdmin {...value} key={index} />)}
          </>}
        </>}
        
      </div>
        
    </div>
  );
}
