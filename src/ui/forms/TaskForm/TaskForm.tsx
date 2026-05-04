"use client";

import styles from "./TaskForm.module.css";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import ProjectTextarea from "../../inputs/ProjectInput/ProjectTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";

import { useState } from "react";
import { createTask } from "@/src/lib/api/project";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { publicationSchema } from "@/src/lib/utils/zodSchemas";

export default function TaskForm({project_id}: {project_id: string}) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register: registerField,
    formState: { isValid },
  } = useForm<z.infer<typeof publicationSchema>>({
    mode: "onChange",
    resolver: zodResolver(publicationSchema),
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setServerError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    const taskCreateRequestData: TaskCreateDTO = {
      label: formValues.label as string,
      short_description: formValues.short_description as string,
      description: formValues.description as string,
    }


    try {
      console.log("Submitting task creation with data: ", taskCreateRequestData); // DEBUG
      const response = await createTask(project_id, taskCreateRequestData);
      console.log("Task creation successful: ", response);
      // <!> - Высветить зелёненьким, что всё гуд, якорем вернуть обратно, убрать форму
    } catch (error: any) {
      // const status = error.response?.status;
      // <!> - Продумать ошибки
      setServerError("Ошибка создания задачи. Попробуйте позже");
      console.error("Task creation failed: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.title}>Новая задача</p>
        <div className={styles.inputs}>
          <AuthInput
            label="Заголовок"
            placeholder="Заголовок вашей задачи..."
            {...registerField("label")}
          />
          <ProjectTextarea
            label="Краткое описание"
            placeholder="Краткое описание задачи..."
            required={false}
            height={75}
            {...registerField("short_description")}
          />
          <ProjectTextarea
            label="Задание"
            placeholder="Ваша задача..."
            required={false}
            height={100}
            {...registerField("description")}
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
