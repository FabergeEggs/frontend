"use client";

import styles from "./PostForm.module.css";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import ProjectTextarea from "../../inputs/ProjectInput/ProjectTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";

import { useState } from "react";
import { createPost } from "@/src/lib/api/project";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSchema } from "@/src/lib/utils/zodSchemas";
import { useAuth } from "@/src/lib/providers/AuthProvider";

export default function PostForm({project_id}: {project_id: string}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { userId } = useAuth()

  const {
    register: registerField,
    formState: { isValid },
  } = useForm<z.infer<typeof postSchema>>({
    mode: "onChange",
    resolver: zodResolver(postSchema),
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setServerError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    const postCreateRequestData: PostCreateDTO = {
      label: formValues.label as string,
      short_description: formValues.short_description as string,
      description: formValues.description as string,
      creator_id: userId, 
      project_id: project_id
    }


    try {
      console.log("Submitting post creation with data: ", postCreateRequestData); // DEBUG
      const response = await createPost(postCreateRequestData);
      console.log("Post creation successful: ", response);
      // <!> - Высветить зелёненьким, что всё гуд, якорем вернуть обратно, убрать форму
    } catch (error: any) {
      // const status = error.response?.status;
      // <!> - Продумать ошибки
      setServerError("Ошибка создания поста. Попробуйте позже");
      console.error("Post creation failed: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.title}>Новый пост</p>
        <div className={styles.inputs}>
          <AuthInput
            label="Заголовок"
            placeholder="Заголовок вашего поста..."
            {...registerField("label")}
          />
          <ProjectTextarea
            label="Краткое описание"
            placeholder="Краткое описание поста..."
            required={false}
            height={75}
            {...registerField("short_description")}
          />
          <ProjectTextarea
            label="Текст"
            placeholder="Основной текст поста..."
            required={false}
            height={100}
            {...registerField("text")}
          />
        </div>
        <GreenButton
          type="submit"
          disabled={!isValid}
          className={styles.submitBtn}
          text="Опубликовать"
        />
      </form>
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
  );
}
