import { z } from "zod";

const passwordSchema = z.string()
  .min(8, "Пароль должен быть не менее 8 символов")
  .regex(/\d.*\d/, "Пароль должен содержать минимум 2 цифры")
  .regex(/[!@#$%^&*]/, "Пароль должен содержать минимум 1 спецсимвол")

const emailSchema = z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Некорректный формат почты")

export const signupSchema = z
  .object({
    first_name: z.string().min(1, "Имя пользователя не может быть пустым"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    about: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  login: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), // (email)
  password: z.string().min(1),
});

export const profileSchema = z
  .object({
    first_name: z.string().min(1, "Имя пользователя не может быть пустым"),
    email: emailSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string(),
    about: z.string(), // .optional() - removed for UpdateRequestDTO
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });


/** Projects */

const labelSchema = z.string().min(3, "Должно быть не менее 3 символов").max(255, "Должно быть не более 255 символов");
const shortDescriptionSchema = z.string().min(1, "Должно быть не пустым").max(500, "Должно быть не более 500 символов");
const descriptionSchema = z.string().min(1, "Должно быть не пустым").max(5000, "Должно быть не более 5000 символов");

export const projectSchema = z
  .object({
    label: labelSchema,
    short_description: shortDescriptionSchema,
    description: descriptionSchema,
    tags: z.array(z.string()).min(1),
  })

export const taskSchema = z
  .object({
    label: labelSchema,
    short_description: shortDescriptionSchema,
    description: descriptionSchema,
  })

export const postSchema = z
  .object({
    label: labelSchema,
    short_description: shortDescriptionSchema,
    text: descriptionSchema,
  })