import { z } from "zod";

export const signupSchema = z.object({ 
    first_name: z.string().min(1, "Имя пользователя не может быть пустым"),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Некорректный формат почты"),
    password: z.string()
        .min(8, "Пароль должен быть не менее 8 символов")
        .regex(/\d.*\d/, "Пароль должен содержать минимум 2 цифры")
        .regex(/[!@#$%^&*]/, "Пароль должен содержать минимум 1 спецсимвол"),
    confirmPassword: z.string(),
    about: z.string().optional(),
    
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({ 
    login: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), // (email)
    password: z.string()
        .min(1)
})
