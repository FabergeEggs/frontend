export enum ApiRoutes {
  // AUTH
  LOGIN = "/api/v1/auth/login",
  REGISTER = "/api/v1/auth/register",
  REFRESH_TOKEN = "/api/v1/auth/refresh",
  LOGOUT = "/api/v1/auth/logout",
  ME = "/api/v1/auth/me",
  VERIFY_EMAIL = "/api/v1/auth/verify-email", // Email confirmation by link from email message

  EMAIL_RESEND_VERIFICATION = "/auth/resend-verification-public",
  FORGOT_PASSWORD = "/auth/forgot_password",
  RESET_PASSWORD = "/auth/reset_password",

  // PROFILE
  PROFILE = "/profile",

  // PROJECT
  PROJECT = "/project",
}
