export const ApiRoutes = {
  // Auth
  AUTH: {
    REGISTER: '/api/v1/auth/register',
    LOGIN: '/api/v1/auth/login',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
    REFRESH: '/api/v1/auth/refresh',
    LOGOUT: '/api/v1/auth/logout',
    LOGOUT_ALL: '/api/v1/auth/logout-all',
    VERIFY_EMAIL: '/api/v1/auth/verify-email',
    EMAIL_RESEND_VERIFICATION: '/api/v1/auth/verify-email',
    CHANGE_PASSWORD: '/api/v1/auth/change-password',
  },

  // Profile
  PROFILE: {
    GET: (userId: string) => `/profile/${userId}`,
    UPDATE: (userId: string) => `/profile/${userId}`,
    DELETE: (userId: string) => `/profile/${userId}`,
  },

  // Project
  PROJECT: {
    HEALTH: '/project/health',
    CREATE: '/project',
    BATCH: '/project/batch',
    GET_INFO: (projectId: string) => `/project/${projectId}/info`,
    GET_STATS: (projectId: string) => `/project/${projectId}/statistics`,
    UPDATE: (projectId: string) => `/project/${projectId}`,

    // Tasks
    CREATE_TASK: (projectId: string) => `/project/${projectId}/task`,
    GET_TASK: (projectId: string, taskId: string) => `/project/${projectId}/task/${taskId}`,
    UPDATE_TASK: (projectId: string, taskId: string) => `/project/${projectId}/task/${taskId}`,

    // Posts
    CREATE_POST: (projectId: string) => `/project/${projectId}/post`,
    GET_POST: (projectId: string, postId: string) => `/project/${projectId}/post/${postId}`,
    UPDATE_POST: (projectId: string, postId: string) => `/project/${projectId}/post/${postId}`,
    DELETE_POST: (projectId: string, postId: string) => `/project/${projectId}/post/${postId}`,
    // Комментарии — response_service (projectId в URL не используется, только postId)
    GET_POST_COMMENTS: (_projectId: string, postId: string) =>
      `/response/posts/${postId}/comments`,
    CREATE_POST_COMMENT: (_projectId: string, postId: string) =>
      `/response/posts/${postId}/comments`,

    // Responses (for tasks)
    GET_TASK_RESPONSES: (projectId: string, taskId: string) => `/project/${projectId}/task/${taskId}/responses`,
    CHANGE_RESPONSE_STATUS: (projectId: string, taskId: string, responseId: string) =>
      `/project/${projectId}/task/${taskId}/responses/${responseId}/status`,

    // Members
    ADD_MEMBER: (projectId: string) => `/project/${projectId}/member`,
    REMOVE_MEMBER: (projectId: string, userId: string) => `/project/${projectId}/member/${userId}`,

    // Publications & Memberships
    GET_PUBLICATIONS: (projectId: string) => `/project/${projectId}/publications`,
    GET_MEMBERSHIPS: (profileId: string) => `/project/profile/${profileId}`,
  },

  FEED: {
    GET: '/feed',
  },
} as const;
