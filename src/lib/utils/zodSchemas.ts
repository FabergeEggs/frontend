import { z } from "zod";

const password = z.string()
  .min(8, "Пароль должен быть не менее 8 символов")
  .regex(/\d.*\d/, "Пароль должен содержать минимум 2 цифры")
  .regex(/[!@#$%^&*]/, "Пароль должен содержать минимум 1 спецсимвол")

const email = z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Некорректный формат почты")

export const passwordSchema = z.object({
  password: password
})

export const emailSchema = z.object({
  email: email
})

export const signupSchema = z
  .object({
    first_name: z.string().min(1, "Имя пользователя не может быть пустым"),
    email: email,
    password: password,
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
    email: email,
    oldPassword: z.string().min(1, "Введите старый пароль"),
    newPassword: password,
    confirmPassword: z.string(),
    about: z.string(), // .optional() - removed for UpdateRequestDTO
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Пароли не совпадают",
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

export const publicationSchema = z
  .object({
    label: labelSchema,
    short_description: shortDescriptionSchema,
    description: descriptionSchema,
  })

export const responseSchema = z.object({
  text: z
    .string()
    .min(1, "Ответ не может быть пустым")
    .max(5000, "Ответ должен быть не более 5000 символов"),
});

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Комментарий не может быть пустым")
    .max(2000, "Комментарий должен быть не более 2000 символов"),
});
