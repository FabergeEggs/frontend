export enum ApiRoutes {
  // AUTH
  LOGIN = "/api/v1/auth/login",
  REGISTER = "/api/v1/auth/register",
  REFRESH_TOKEN = "/api/v1/auth/refresh",
  LOGOUT = "/api/v1/auth/logout",
  ME = "/api/v1/auth/me",
  VERIFY_EMAIL = "/api/v1/auth/verify-email", // Email confirmation by link from email message

  EMAIL_RESEND_VERIFICATION = "/auth/resend-verification-public",
  FORGOT_PASSWORD = "/api/v1/auth/forgot-password",
  RESET_PASSWORD = "/api/v1/auth/reset-password",
  CHANGE_PASSWORD = "/api/v1/auth/password-change",

  // PROFILE
  PROFILE = "/profile",

  // PROJECT
  PROJECT = "/project", // Create, /[id] - Update
  
}
