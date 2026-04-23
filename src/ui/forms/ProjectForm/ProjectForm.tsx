"use client";

import styles from "./ProjectForm.module.css";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import ProjectTextarea from "../../inputs/ProjectInput/ProjectTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";
import ProjectFormTag from "../../info/ProjectFormTag/ProjectFormTag";
import { ProjectStatusEnum } from "@/src/lib/models/export/project";

import { useState } from "react";
import { createProject } from "@/src/lib/api/project";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { projectSchema } from "@/src/lib/utils/zodSchemas";

export default function ProjectForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [currentTagInput, setCurrentTagInput] = useState<string>("");
  const router = useRouter();

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
      tags: [],
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

    // const userData = await me(); <!>

    const projectCreateRequestData: ProjectCreateDTO = {
      label: formValues.label as string,
      short_description: formValues.short_description as string,
      description: formValues.description as string,
      tags: getValues("tags") || [],
      creator: "Аноним", // userData.given_name;
      status: ProjectStatusEnum.ACTIVE
    }


    try {
      console.log("Submitting project creation with data: ", projectCreateRequestData); // DEBUG
      const response = await createProject(projectCreateRequestData);
      console.log("Project creation successful: ", response);
      router.push(
        `/feed/${response.id}`, // <!> Assuming the response contains the created project's ID in response.data.id
      );
    } catch (error: any) {
      // const status = error.response?.status;
      // <!> - Продумать ошибки
      setServerError("Ошибка создания проекта. Попробуйте позже");
      console.error("Project creation failed: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.title}>Создание проекта</p>
        <div className={styles.inputs}>
          <AuthInput
            label="Название"
            placeholder="Введите название..."
            {...registerField("label")}
          />
          <ProjectTextarea
            label="Краткое описание"
            placeholder="Кратко расскажите о своём проекте..."
            required={false}
            height={100}
            {...registerField("short_description")}
          />
          <ProjectTextarea
            label="Развёрнутое описание"
            placeholder="Подробно расскажите о своём проекте..."
            required={false}
            height={200}
            {...registerField("description")}
          />
          <div className={styles.tagSegment}>
            <AuthInput
              label="Теги"
              placeholder="Введите тег..."
              required={false}
              value={currentTagInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              className={styles.tagInput}
            />
            <div className={styles.tags}>
              {watchedTags.map((tag, index) => (
                <ProjectFormTag key={index} onClick={() => handleRemoveTag(tag)}>
                  {tag}
                </ProjectFormTag>
              ))}
            </div>
          </div>
        </div>
        <GreenButton
          type="submit"
          disabled={!isValid}
          className={styles.submitBtn}
          text="Создать проект"
        />
      </form>
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
  );
}
