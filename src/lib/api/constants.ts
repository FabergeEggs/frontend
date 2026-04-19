export enum ApiRoutes {
  // AUTH
  LOGIN = "/api/v1/auth/login",
  REGISTER = "/api/v1/auth/register", // POST -> ID юзера
  REFRESH_TOKEN = "/api/v1/auth/refresh",
  LOGOUT = "/api/v1/auth/logout",
  ME = "/api/v1/auth/me",
  VERIFY_EMAIL = "/api/v1/auth/verify-email", // Email confirmation by link from email message

  EMAIL_RESEND_VERIFICATION = "/auth/resend-verification-public", // Email confirmation
  RESET_PASSWORD = "/auth/reset_password", // Password reset request
  FORGOT_PASSWORD = "/auth/forgot_password",
  CHANGE_PASSWORD = "/auth/change-password",

  // PROFILE
  PROFILE = "/profile",

  // PROJECT
  PROJECT = "/project",
}
