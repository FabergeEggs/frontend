"use client";

import styles from "./TaskForm.module.css";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import ProjectTextarea from "../../inputs/ProjectInput/ProjectTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { publicationSchema } from "@/src/lib/utils/zodSchemas";
import type { TaskCreateDTO } from "@/src/lib/models/export/project";
import { useCreateTask } from "@/src/lib/query/project";
import { getMutationStatus } from "@/src/lib/query/status";

export default function TaskForm({
  project_id,
  onSuccess,
}: {
  project_id: string;
  onSuccess?: () => void;
}) {
  const createTask = useCreateTask(project_id);
  const { isSubmitting, errorMessage } = getMutationStatus(createTask);

  const {
    register: registerField,
    formState: { isValid },
    reset,
  } = useForm<z.infer<typeof publicationSchema>>({
    mode: "onChange",
    resolver: zodResolver(publicationSchema),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    const payload: TaskCreateDTO = {
      label: formValues.label as string,
      short_description: formValues.short_description as string,
      description: formValues.description as string,
    };

    try {
      await createTask.mutateAsync(payload);
      reset();
      onSuccess?.();
    } catch {
      // ошибка в errorMessage
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
          disabled={!isValid || isSubmitting}
          className={styles.submitBtn}
          text={isSubmitting ? "Публикация…" : "Опубликовать"}
        />
      </form>
      {errorMessage && <ValidationError messages={[errorMessage]} />}
    </div>
  );
}
