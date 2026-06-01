export const projectKeys = {
  all: ["project"] as const,
  health: () => [...projectKeys.all, "health"] as const,
  detail: (projectId: string) => [...projectKeys.all, "detail", projectId] as const,
  info: (projectId: string) => [...projectKeys.all, "info", projectId] as const,
  stats: (projectId: string) => [...projectKeys.all, "stats", projectId] as const,
  batch: (ids: string[]) => [...projectKeys.all, "batch", ids] as const,
  /** Префикс для invalidateQueries — все лимиты одного проекта */
  publicationsRoot: (projectId: string) =>
    [...projectKeys.all, "publications", projectId] as const,
  publications: (projectId: string, limit = 20) =>
    [...projectKeys.publicationsRoot(projectId), limit] as const,
  memberships: (profileId: string) =>
    [...projectKeys.all, "memberships", profileId] as const,
  task: (projectId: string, taskId: string) =>
    [...projectKeys.all, "task", projectId, taskId] as const,
  post: (projectId: string, postId: string) =>
    [...projectKeys.all, "post", projectId, postId] as const,
};

export const responseKeys = {
  all: ["response"] as const,
  postComments: (projectId: string, postId: string) =>
    [...responseKeys.all, "postComments", projectId, postId] as const,
  taskResponses: (projectId: string, taskId: string) =>
    [...responseKeys.all, "taskResponses", projectId, taskId] as const,
};

export const profileKeys = {
  all: ["profile"] as const,
  info: (profileId: string) => [...profileKeys.all, "profile", profileId] as const
}
