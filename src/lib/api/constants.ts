export enum ApiRoutes {
  // AUTH
  LOGIN = "/api/v1/auth/login",
  REGISTER = "/api/v1/auth/register", // POST -> ID юзера
  REFRESH_TOKEN = "/auth/refresh",
  LOGOUT = "/api/v1/auth/logout",
  ME = "/api/v1/auth/me",

  EMAIL_RESEND_VERIFICATION = "/auth/resend-verification-public", // Email confirmation
  RESET_PASSWORD = "/auth/reset_password", // Password reset request
  FORGOT_PASSWORD = "/auth/forgot_password",
  CHANGE_PASSWORD = "/auth/change-password",

  // PROFILE
  PROFILE = "/profile",

  // PROJECT
  PROJECT = "/project",
  PROJECT_INFO = "/info",
  PROJECT_STATISTICS = "/statistics"
}
