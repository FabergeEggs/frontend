export enum ApiRoutes {
  // AUTH
  LOGIN = "/auth/login",
  REGISTER = "/auth/register", // POST -> ID юзера
  REFRESH_TOKEN = "/auth/refresh",
  LOGOUT = "/auth/logout",
  ME = "/auth/me",

  EMAIL_RESEND_VERIFICATION = "/auth/resend-verification-public", // Email confirmation
  RESET_PASSWORD = "/auth/reset_password", // Password reset request
  FORGOT_PASSWORD = "/auth/forgot_password",
  CHANGE_PASSWORD = "/auth/change-password",

  // PROFILE
  PROFILE = "/profile",
}
