"use client";

import styles from "./ProjectForm.module.css";
import AuthInput from "@/src/ui/inputs/AuthInput/AuthInput";
import ProjectTextarea from "../../inputs/ProjectInput/ProjectTextarea";
import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton";
import ValidationError from "../ValidationError/ValidationError";
import ProjectFormTag from "../../info/ProjectFormTag/ProjectFormTag";
import {
  ProjectStatusEnum,
  type ProjectCreateDTO,
} from "@/src/lib/models/export/project";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { projectSchema } from "@/src/lib/utils/zodSchemas";
import {
  useCreateProject,
  getApiErrorMessage,
} from "@/src/lib/query/project";
import { getMutationStatus } from "@/src/lib/query/status";

export default function ProjectForm() {
  const [currentTagInput, setCurrentTagInput] = useState("");
  const router = useRouter();
  const createProject = useCreateProject();
  const { isSubmitting, errorMessage } = getMutationStatus(createProject);

  const {
    register: registerField,
    formState: { errors, isValid },
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

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    const payload: ProjectCreateDTO = {
      label: formValues.label as string,
      short_description: formValues.short_description as string,
      description: formValues.description as string,
      tags: getValues("tags") || [],
      status: ProjectStatusEnum.ACTIVE,
    };

    try {
      const response = await createProject.mutateAsync(payload);
      router.push(`/feed/${response.id}`);
    } catch {
      // ошибка отображается через errorMessage
    }
  };

  const displayError =
    errorMessage ??
    (createProject.isError
      ? getApiErrorMessage(createProject.error, "Ошибка создания проекта")
      : null);

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
          {errors.short_description && (
            <ValidationError
              messages={[errors.short_description.message || ""]}
            />
          )}
          <ProjectTextarea
            label="Развёрнутое описание"
            placeholder="Подробно расскажите о своём проекте..."
            required={false}
            height={200}
            {...registerField("description")}
          />
          {errors.description && (
            <ValidationError
              messages={[errors.description.message || ""]}
            />
          )}
          <div className={styles.tagSegment}>
            <AuthInput
              label="Теги"
              placeholder="Введите тег..."
              required={false}
              value={currentTagInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentTagInput(e.target.value)
              }
              onKeyDown={handleTagInputKeyDown}
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
          disabled={!isValid || isSubmitting}
          className={styles.submitBtn}
          text={isSubmitting ? "Создание…" : "Создать проект"}
        />
      </form>
      {displayError && <ValidationError messages={[displayError]} />}
    </div>
  );
}
