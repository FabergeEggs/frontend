"use client";

import styles from "./projectpage.module.css";
import Image from "next/image";
import Tag from "@/src/ui/info/Tag/Tag";

import {
  ProjectStatusEnum,
  type ProjectFull,
  type ProjectUpdateDTO,
  type Tag as TagModel,
} from "@/src/lib/models/export/project";

import { useState } from "react";

import AuthorImage from "@/public/assets/project/author.svg";
import CreationTimeImage from "@/public/assets/project/creation-time.svg";
import StatusActiveImage from "@/public/assets/project/status-active.svg";
import CancelImage from "@/public/assets/close.svg";
import FinishImage from "@/public/assets/project/finish.svg"
import RestartImage from "@/public/assets/project/restart.svg"
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
import CheckImage from "@/public/assets/check.svg";

import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import ProfileInput from "@/src/ui/inputs/ProfileInput/ProfileInput";
import ProjectTextarea from "@/src/ui/inputs/ProjectInput/ProjectTextarea";
import ProjectUpdateFormTag from "@/src/ui/info/ProjectUpdateFormTag/ProjectUpdateFormTag";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { projectUpdateSchema } from "@/src/lib/utils/zodSchemas";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import {useTask, useUpdateTask } from "@/src/lib/query/project";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";
import { TaskStatusEnum } from "@/src/lib/models/export/project";

import {
  useProject,
  usePublications,
  useUpdateProject,
  useDeletePost,
  useAddMember,
  useRemoveMember,
  getApiErrorMessage,
} from "@/src/lib/query/project";
import { getQueryStatus } from "@/src/lib/query/status";

export default function ProjectPageClient({
  projectId,
}: {
  projectId: string;
}) {
  const projectQuery = useProject(projectId);
  const projectStatus = getQueryStatus(projectQuery);
  const data = projectQuery.data;

  if (projectStatus.isLoading) {
    return <div className="centered">Загрузка проекта…</div>;
  }

  if (projectStatus.isError || !data) {
    return (
      <div className="centered">
        <ValidationError
          messages={[
            projectStatus.errorMessage ?? "Не удалось загрузить проект",
          ]}
        />
      </div>
    );
  }

  return <ProjectPageContent data={data} />;
}

function ProjectPageContent({ data }: { data: ProjectFull }) {
  const { userId } = useAuth();
  const isAdmin = userId === data.creator_id;

  const [isEditing, setEditing] = useState(false);
  const [isCreatingTask, setCreatingTask] = useState(false);
  const [isPosting, setPosting] = useState(false);
  const [currentTagInput, setCurrentTagInput] = useState("");

  const publicationsQuery = usePublications(data.project_id);
  const publicationsStatus = getQueryStatus(publicationsQuery);
  const publications = publicationsQuery.data?.items ?? [];

  const updateProjectMutation = useUpdateProject(data.project_id);
  const deletePostMutation = useDeletePost(data.project_id);
  const addMemberMutation = useAddMember(data.project_id);
  const removeMemberMutation = useRemoveMember(data.project_id);
  const [localJoined, setLocalJoined] = useState<boolean | null>(null);
  const isMember = localJoined ?? false;

  const posts = publications.filter((p) => p.type === "post");
  const tasks = publications.filter((p) => p.type === "task");

  const {
    register: registerField,
    formState: { isValid },
    setValue,
    getValues,
    watch,
  } = useForm<z.infer<typeof projectUpdateSchema>>({
    mode: "onChange",
    resolver: zodResolver(projectUpdateSchema),
    defaultValues: {
      label: data.label,
      short_description: data.short_description,
      description: data.description,
      tags: data.tags.map((t) => t.name),
      status: ensureProjectStatus(data.status),
    },
  });

  const watchedTags = watch("tags");

  const handleAddTag = () => {
    if (!currentTagInput.trim()) return;
    const currentTags = getValues("tags") || [];
    if (!currentTags.includes(currentTagInput.trim())) {
      setValue("tags", [...currentTags, currentTagInput.trim()], {
        shouldValidate: true,
      });
    }
    setCurrentTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = getValues("tags") || [];
    setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true },
    );
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ProjectUpdateDTO = {
      label: getValues("label"),
      short_description: data.short_description,
      description: getValues("description"),
      tags: getValues("tags") || [],
      status: ensureProjectStatus(data.status),
    };

    try {
      await updateProjectMutation.mutateAsync(payload);
      setEditing(false);
    } catch {
      // ошибка в mutation.error
    }
  };

  const handleDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId);
  };

  const updateError = updateProjectMutation.isError
    ? getApiErrorMessage(updateProjectMutation.error, "Ошибка обновления проекта")
    : null;

  function ensureProjectStatus(status: unknown): ProjectStatusEnum {
    if (
      status === ProjectStatusEnum.ACTIVE ||
      status === ProjectStatusEnum.FINISHED ||
      status === ProjectStatusEnum.DELETED
    ) {
      return status;
    }
    return ProjectStatusEnum.ACTIVE;
  }

  async function changeProjectStatus(status: ProjectStatusEnum) {
    const payload: ProjectUpdateDTO = {
      label: data.label as string,
      short_description: data.short_description,
      description: data.description as string,
      tags: data.tags.map((t) => t.name),
      status,
    };

    try {
      await updateProjectMutation.mutateAsync(payload);
    } catch {
      // ошибка в mutation.error
    }
  }

  const isActive = data.status === ProjectStatusEnum.ACTIVE;

  // async function changeTaskStatus(taskId: string, task: PublicationDTO, status: TaskStatusEnum) {
  //   // const taskQuery = await useTask(data.project_id, taskId);
  //   // const task = taskQuery.data;
  //   // if (!task) {
  //   //   console.log("Не удалось загрузить задачу для изменения её статуса")
  //   //   return
  //   // }
  //   const updateTaskMutation = useUpdateTask(data.project_id, taskId);
  //   updateTaskMutation.mutate({
  //     label: task.label,
  //     short_description: task.short_description ?? "",
  //     description: task.short_description ?? "", // <!> Task description becomes short
  //     status: status,
  //   });
  // }

  return (
    <div className={`pagecontainer ${styles.container}`}>
        <div className={styles.subContainer}>
          <div className={styles.projectContainer}>
            {(!isAdmin || !isEditing) && (
              <div className={styles.card}>
                <h1 className={styles.label}>
                  {data.label}
                  {isAdmin && isActive &&
                    <ImageTextButton
                      text="Редактировать"
                      src={EditImage}
                      onClick={() => setEditing(true)}
                    />
                  }
                </h1>
                <div className={styles.info}>
                  <div className="basic-info-piece">
                    <Image src={AuthorImage} alt="author image" />
                    <span className={styles.infoDescription}>Автор:</span>
                    {data.creator}
                  </div>
                  <div className="basic-info-piece">
                    <Image src={CreationTimeImage} alt="creation time image" />
                    <span className={styles.infoDescription}>Создано:</span>
                    {new Date(data.created_at).toLocaleDateString("ru-RU")}
                  </div>
                  <div className="basic-info-piece">
                    <Image src={StatusActiveImage} alt="active status image" />
                    <span className={styles.infoDescription}>Статус:</span>
                    {isActive && "Активен"}
                    {data.status === ProjectStatusEnum.FINISHED && "Завершён"}
                    {data.status === ProjectStatusEnum.DELETED && "Удалён"}
                  </div>
                </div>
                <div className={styles.tags}>
                  {data.tags?.map((tag: TagModel, index: number) => (
                    <Tag key={tag.tag_id || index}>{tag.name}</Tag>
                  ))}
                </div>
                <p className={styles.description}>{data.description}</p>
                {isAdmin && (
                  <div className={styles.adminButtons}>
                    {isActive && <>
                      {!isCreatingTask && (
                      <a className="basic-link" href="#taskform">
                        <ImageTextButton
                          text="Новая задача"
                          src={NewTaskImage}
                          onClick={() => setCreatingTask(true)}
                        />
                      </a>
                    )}
                    {isCreatingTask && (
                      <ImageTextButton
                        text="Отменить создание задачи"
                        src={CancelImage}
                        onClick={() => setCreatingTask(false)}
                      />
                    )}

                    {!isPosting && (
                      <a className="basic-link" href="#postform">
                        <ImageTextButton
                          text="Новый пост"
                          src={NewPostImage}
                          onClick={() => setPosting(true)}
                        />
                      </a>
                    )}
                    {isPosting && (
                      <ImageTextButton
                        text="Отменить создание поста"
                        src={CancelImage}
                        onClick={() => setPosting(false)}
                      />
                    )}
                    </>}


                    {data.status == ProjectStatusEnum.ACTIVE &&
                    <ImageTextButton
                        text="Завершить проект"
                        src={FinishImage}
                        backgroundColor="var(--main-color)"
                        onClick={() => changeProjectStatus(ProjectStatusEnum.FINISHED)}
                      />
                      }
                    {data.status == ProjectStatusEnum.FINISHED &&
                    <ImageTextButton
                        text="Возобновить проект"
                        src={RestartImage}
                        backgroundColor="var(--main-color)"
                        onClick={() => changeProjectStatus(ProjectStatusEnum.ACTIVE)}
                      />
                      }
                  </div>
                )}
              </div>
            )}

            {isAdmin && isEditing && (
              <form
                onSubmit={handleSubmit}
                className={`${styles.card} ${styles.editCard}`}
              >
                <div className={styles.top}>
                  <AuthInput
                    label="Название проекта"
                    placeholder="Введите новое название проекта..."
                    {...registerField("label")}
                  />
                  <ImageTextButton
                    type="submit"
                    text={updateProjectMutation.isPending ? "Сохранение…" : "Сохранить"}
                    src={CheckImage}
                    color="var(--active-dark-color)"
                    backgroundColor="var(--varity2-color)"
                  />
                  <ImageTextButton
                    text="Отмена"
                    src={CancelImage}
                    color="var(--active-dark-color)"
                    backgroundColor="var(--varity2-color)"
                  />
                </div>
                <div className={styles.tags}>
                  {watchedTags.map((tag, index) => (
                    <ProjectUpdateFormTag
                      key={index}
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag}
                    </ProjectUpdateFormTag>
                  ))}
                  <ProfileInput
                    label=""
                    placeholder="Добавьте тег..."
                    required={false}
                    value={currentTagInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCurrentTagInput(e.target.value)
                    }
                    onKeyDown={handleTagInputKeyDown}
                    onConfirm={handleAddTag}
                    hasEditButton={false}
                    className={styles.tagInput}
                  />
                </div>
                <div className={styles.info}>
                  <div className={styles.infoPiece}>
                    <Image src={AuthorImage} alt="author image" />
                    <span className={styles.infoDescription}>Автор:</span>
                    {data.creator}
                  </div>
                  <div className={styles.infoPiece}>
                    <Image src={CreationTimeImage} alt="creation time image" />
                    <span className={styles.infoDescription}>Создано:</span>
                    {new Date(data.created_at).toLocaleDateString("ru-RU")}
                  </div>
                  <div className={styles.infoPiece}>
                    <Image src={StatusActiveImage} alt="active status image" />
                    <span className={styles.infoDescription}>Статус:</span>
                    {isActive && "Активен"}
                    {data.status === ProjectStatusEnum.FINISHED && "Завершён"}
                    {data.status === ProjectStatusEnum.DELETED && "Удалён"}
                  </div>
                </div>
                <ProjectTextarea
                  height={238}
                  label="Описание:"
                  placeholder="Введите новое описание проекта..."
                  {...registerField("description")}
                />
              </form>
            )}
          </div>

          {updateError && <ValidationError messages={[updateError]} />}

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

      {!isAdmin && isActive && !isMember && (
        <button
          className="basic-btn"
          onClick={() =>
            addMemberMutation.mutate(userId!, {
              onSuccess: () => setLocalJoined(true),
            })
          }
          disabled={addMemberMutation.isPending}
        >
          {addMemberMutation.isPending ? "Вступление…" : "Присоединиться"}
        </button>
      )},
      {!isAdmin && isMember && (
        <button
          className="basic-btn"
          style={{ background: "var(--danger-color)", color: "#fff" }}
          onClick={() =>
            removeMemberMutation.mutate(userId!, {
              onSuccess: () => setLocalJoined(false),
            })
          }
          disabled={removeMemberMutation.isPending}
        >
          {removeMemberMutation.isPending ? "Выход…" : "Выйти из проекта"}
        </button>
      )},

      {isAdmin && isCreatingTask && (
        <div id="taskform">
          <TaskForm
            project_id={data.project_id}
            onSuccess={() => setCreatingTask(false)}
          />
        </div>
      )},

      {isAdmin && isPosting && (
        <div id="postform">
          <PostForm
            project_id={data.project_id}
            onSuccess={() => setPosting(false)}
          />
        </div>
      )},

      <div className={styles.projects}>
        {publicationsStatus.isLoading && <p>Загрузка публикаций…</p>}
        {publicationsStatus.errorMessage && (
          <ValidationError messages={[publicationsStatus.errorMessage]} />
        )}

        {!isAdmin && (
          <>
            {publications.map((publication) => {
              if (publication.type === "post") {
                return (
                  <PostCard
                    key={publication.id}
                    {...publication}
                    comments_count={publication.answers_count}
                  />
                );
              }
              return <TaskCard key={publication.id} {...publication} />;
            })}
          </>
        )}

        {isAdmin && (
          <>
            {tasks.map((value) => (
              <TaskCardAdmin {...value} key={value.id} /> // resumeAction={() => changeTaskStatus(value.id, value, TaskStatusEnum.ACTIVE)} finishAction={() => changeTaskStatus(value.id, value, TaskStatusEnum.FINISHED)}
            ))}
            {posts.map((value) => (
              <PostCardAdmin
                {...value}
                key={value.id}
                deleteAction={() => handleDeletePost(value.id)}
                comments_count={value.answers_count}
              />
            ))}
          </>
        )}

        {publications.length == 0 &&
        <div className={styles.noTasks}>
            <p>
            В данном проекте пока нету задач или публикаций.
          </p>

        </div>
        }
      </div>
    </div>
  )
}
