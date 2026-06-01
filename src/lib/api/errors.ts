import axios from "axios";

export interface ValidationErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: ValidationErrorDetail[];

  constructor(
    message: string,
    status: number,
    code?: string,
    details?: ValidationErrorDetail[],
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  get isValidationError(): boolean {
    return this.status === 422;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isConflict(): boolean {
    return this.status === 409;
  }
}

const STATUS_MESSAGES: Record<number, string> = {
  400: "Некорректный запрос",
  403: "Недостаточно прав",
  404: "Не найдено",
  409: "Конфликт данных",
  410: "Ресурс удалён",
  422: "Проверьте правильность заполнения полей",
  500: "Ошибка сервера. Попробуйте позже",
};

export function getApiErrorMessage(error: unknown, fallback = "Что-то пошло не так"): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status && STATUS_MESSAGES[status]) {
      return STATUS_MESSAGES[status];
    }
  }
  return fallback;
}

export function parseAxiosError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return new ApiError("Неизвестная ошибка", 0, "UNKNOWN");
  }

  if (!error.response) {
    const networkMessage =
      error.code === "ECONNREFUSED"
        ? "Сервер API недоступен. Проверьте, что бэкенд запущен и API_INTERNAL_URL указывает на него (в Docker не используйте localhost)."
        : error.message || "Нет ответа от сервера";
    return new ApiError(networkMessage, 0, "NETWORK_ERROR");
  }

  const status = error.response.status;
  const data = error.response?.data as
    | { detail?: string | ValidationErrorDetail[]; message?: string }
    | undefined;

  if (status === 422 && Array.isArray(data?.detail)) {
    return new ApiError(
      STATUS_MESSAGES[422],
      status,
      "VALIDATION_ERROR",
      data.detail,
    );
  }

  if (typeof data?.detail === "string") {
    return new ApiError(data.detail, status);
  }

  if (typeof data?.message === "string") {
    return new ApiError(data.message, status);
  }

  return new ApiError(
    STATUS_MESSAGES[status] ?? error.message ?? "Ошибка запроса",
    status,
  );
}
