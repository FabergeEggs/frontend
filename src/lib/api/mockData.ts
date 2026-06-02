import type {
  ProfileDTO,
  UpdateProfileRequestDTO,
} from "@/src/lib/models/export/profile";
import type {
  ProjectInfoDTO,
  ProjectStatsDTO,
  ProjectFull,
  Task,
  Post,
  PublicationsResponse,
  PublicationDTO,
  MembershipsDTO,
} from "@/src/lib/models/export/project";
import type { CommentDTO, ResponseDTO } from "@/src/lib/models/export/response";
import { ProjectStatusEnum, TaskStatusEnum, PublicationTypeEnum } from "@/src/lib/models/export/project";
import { ResponseStatus } from "@/src/lib/models/export/response";

const BASE_PROJECT_ID = "mock-project-1";
const BASE_TASK_ID = "mock-task-1";
const BASE_POST_ID = "mock-post-1";
const BASE_USER_ID = "mock-user-1";
const BASE_PROFILE_ID = "mock-profile-1";

const MOCK_PROFILE: ProfileDTO = {
  id: BASE_PROFILE_ID,
  user_id: BASE_USER_ID,
  username: "alexey",
  email: "alexey@example.com",
  first_name: "Алексей",
  last_name: "Новиков",
  bio: "Научный руководитель проекта по исследованию городской миграции.",
  avatar_url: "",
  created_at: new Date("2026-01-15T10:00:00.000Z"),
  is_active: true,
};

let currentProfile: ProfileDTO = { ...MOCK_PROFILE };

const MOCK_PROJECT_INFO: ProjectInfoDTO = {
  project_id: BASE_PROJECT_ID,
  creator_id: BASE_USER_ID,
  creator: "Алексей Новиков",
  label: "Перепись населения в городе Ижевск",
  description:
    "В связи с приходом весны жители Буммаша начали активно почковаться, внося диссонанс в статистику населения столицы России. С целью обновления статистических данных нам необходимо собрать информацию о текущем населении Ижевска.",
  tags: [
    { tag_id: "tag-1", name: "Урбанистика" },
    { tag_id: "tag-2", name: "Сбор данных" },
  ],
  created_at: "2026-04-16T10:00:00.000Z",
  status: ProjectStatusEnum.ACTIVE,
};

const MOCK_PROJECT_STATS: ProjectStatsDTO = {
  project_id: BASE_PROJECT_ID,
  tasks_count: 3,
  participants_count: 14,
  answers_count: 7,
};

const MOCK_TASK: Task = {
  task_id: BASE_TASK_ID,
  project_id: BASE_PROJECT_ID,
  creator_id: BASE_USER_ID,
  label: "Собрать данные о миграции населения",
  creator: "Алексей Новиков",
  short_description:
    "Провести короткий опрос жителей и зафиксировать изменения численности семейных групп.",
  description:
    "Необходимо собрать ответы минимум от 30 семей в историческом центре города. Инструкция: задать вопросы о составе семьи, возрасте членов, месте работы и планах на переезд.",
  created_at: "2026-05-01T08:00:00.000Z",
  updated_at: "2026-05-01T08:30:00.000Z",
  answers_count: 2,
  status: TaskStatusEnum.ACTIVE,
};

const MOCK_POST: Post = {
  post_id: BASE_POST_ID,
  project_id: BASE_PROJECT_ID,
  creator_id: BASE_USER_ID,
  label: "Итоги первого этапа опроса",
  creator: "Алексей Новиков",
  short_description:
    "Мы завершили сбор данных по четырём районам, результаты уже загружены в таблицу.",
  description:
    "Первый этап показал, что основная часть респондентов живёт в арендованном жилье и планирует остаться в городе на следующий год. Следующий этап — анализ демографических групп.",
  comments_count: 2,
  created_at: "2026-05-10T11:00:00.000Z",
  updated_at: "2026-05-10T11:45:00.000Z",
};

const MOCK_PUBLICATIONS: PublicationDTO[] = [
  {
    id: BASE_POST_ID,
    project_id: BASE_PROJECT_ID,
    label: MOCK_POST.label,
    short_description: MOCK_POST.short_description,
    created_at: MOCK_POST.created_at,
    creator_id: MOCK_POST.creator_id,
    creator_name: MOCK_POST.creator,
    type: PublicationTypeEnum.POST,
    answers_count: MOCK_POST.comments_count,
    status: null,
  },
  {
    id: BASE_TASK_ID,
    project_id: BASE_PROJECT_ID,
    label: MOCK_TASK.label,
    short_description: MOCK_TASK.short_description,
    created_at: MOCK_TASK.created_at,
    creator_id: MOCK_TASK.creator_id,
    creator_name: MOCK_TASK.creator,
    type: PublicationTypeEnum.TASK,
    answers_count: MOCK_TASK.answers_count,
    status: MOCK_TASK.status,
  },
];

const MOCK_MEMBERSHIPS: MembershipsDTO = {
  scientist: [
    {
      project_id: BASE_PROJECT_ID,
      label: MOCK_PROJECT_INFO.label,
      short_description: MOCK_PROJECT_INFO.description.slice(0, 120),
      created_at: MOCK_PROJECT_INFO.created_at,
      status: MOCK_PROJECT_INFO.status,
      creator_name: MOCK_PROJECT_INFO.creator,
    },
  ],
  volunteer: [
    {
      project_id: "mock-project-2",
      label: "OpenMentor — платформа менторства",
      short_description:
        "Соединяем опытных специалистов с начинающими. MVP готов, нужна помощь с UI/UX и маркетингом.",
      created_at: "2026-05-25T14:30:00.000Z",
      status: ProjectStatusEnum.ACTIVE,
      creator_name: "Мария Соколова",
    },
  ],
};

const MOCK_FEED_PAGE: FeedPage = {
  items: [
    {
      id: "feed-mock-1",
      source_type: "project",
      source_id: BASE_PROJECT_ID,
      project_id: null,
      actor_id: BASE_USER_ID,
      actor_name: MOCK_PROJECT_INFO.creator,
      actor_avatar_url: null,
      verb: "created",
      label: MOCK_PROJECT_INFO.label,
      short_description: MOCK_PROJECT_INFO.description.slice(0, 120),
      description: null,
      media: [],
      occurred_at: "2026-05-26T10:00:00Z",
      payload: {},
    },
  ],
  next_cursor: null,
  has_more: false,
};

const MOCK_POST_COMMENTS: CommentDTO[] = [
  {
    id: 1,
    response_id: "mock-response-1",
    user_id: "mock-user-2",
    content: "Отличная заметка, спасибо! Помогло быстрее разобраться в следующем этапе.",
    created_at: "2026-05-11T09:30:00.000Z",
    updated_at: "2026-05-11T09:30:00.000Z",
  },
  {
    id: 2,
    response_id: "mock-response-2",
    user_id: "mock-user-3",
    content: "Интересно увидеть результаты, особенно по молодым семьям.",
    created_at: "2026-05-11T10:15:00.000Z",
    updated_at: "2026-05-11T10:15:00.000Z",
  },
];

const MOCK_TASK_RESPONSES: ResponseDTO[] = [
  {
    id: "mock-response-1",
    task_id: BASE_TASK_ID,
    user_id: "mock-user-2",
    user_name: "Мария Соколова",
    text: "Собрал первые 50 анкет и загрузил данные в таблицу. Осталось обработать фотографии документов.",
    status: ResponseStatus.PENDING,
    attached_files: [],
    created_at: "2026-05-13T12:00:00.000Z",
    updated_at: "2026-05-13T12:00:00.000Z",
  },
  {
    id: "mock-response-2",
    task_id: BASE_TASK_ID,
    user_id: "mock-user-3",
    user_name: "Дмитрий Козлов",
    text: "Провёл 20 интервью, все участники готовы продолжать. Отправил результаты в общий файл.",
    status: ResponseStatus.ACCEPTED,
    attached_files: [],
    created_at: "2026-05-14T15:20:00.000Z",
    updated_at: "2026-05-14T15:20:00.000Z",
  },
];

export function getMockProfile(id: string): ProfileDTO {
  if (id === MOCK_PROFILE.id || id === MOCK_PROFILE.user_id) {
    return { ...currentProfile };
  }
  return {
    ...MOCK_PROFILE,
    id: `mock-profile-${id}`,
    user_id: id,
    username: `user_${id}`,
    email: `${id}@example.com`,
    first_name: "Пользователь",
    last_name: "Тестовый",
    bio: "Автоматически созданный тестовый профиль.",
    avatar_url: "",
    created_at: new Date(),
    is_active: true,
  };
}

export function updateMockProfile(
  id: string,
  request: UpdateProfileRequestDTO,
): ProfileDTO {
  const base = getMockProfile(id);
  const updated = {
    ...base,
    first_name: request.first_name,
    last_name: request.last_name,
    bio: request.bio,
    avatar_url: request.avatar_url ?? base.avatar_url ?? "",
  };

  if (id === MOCK_PROFILE.id || id === MOCK_PROFILE.user_id) {
    currentProfile = updated;
  }

  return updated;
}

export function getMockProjectInfo(id: string): ProjectInfoDTO {
  if (id === BASE_PROJECT_ID) {
    return { ...MOCK_PROJECT_INFO };
  }
  return {
    ...MOCK_PROJECT_INFO,
    project_id: id,
    label: `${MOCK_PROJECT_INFO.label} (${id})`,
  };
}

export function getMockProjectStatistics(id: string): ProjectStatsDTO {
  return { ...MOCK_PROJECT_STATS, project_id: id };
}

export function getMockProject(id: string): ProjectFull {
  return {
    ...getMockProjectInfo(id),
    ...getMockProjectStatistics(id),
  };
}

export function getMockPublications(
  projectId: string,
  limit = 20,
  cursor?: string,
): PublicationsResponse {
  return {
    items: MOCK_PUBLICATIONS.filter((item) => item.project_id === projectId),
    next_cursor: null,
    has_more: false,
  };
}

export function getMockUserMemberships(profileId: string): MembershipsDTO {
  if (profileId === BASE_USER_ID) {
    return { ...MOCK_MEMBERSHIPS };
  }
  return {
    scientist: [],
    volunteer: [],
  };
}

export function getMockTask(projectId: string, taskId: string): Task {
  if (projectId === BASE_PROJECT_ID && taskId === BASE_TASK_ID) {
    return { ...MOCK_TASK };
  }
  return {
    ...MOCK_TASK,
    project_id: projectId,
    task_id: taskId,
    label: `${MOCK_TASK.label} (${taskId})`,
  };
}

export function getMockPost(projectId: string, postId: string): Post {
  if (projectId === BASE_PROJECT_ID && postId === BASE_POST_ID) {
    return { ...MOCK_POST };
  }
  return {
    ...MOCK_POST,
    project_id: projectId,
    post_id: postId,
    label: `${MOCK_POST.label} (${postId})`,
  };
}

export function getMockPostComments(
  projectId: string,
  postId: string,
): CommentDTO[] {
  return MOCK_POST_COMMENTS.map((comment) => ({
    ...comment,
    response_id: `${postId}-${comment.id}`,
  }));
}

export function getMockTaskResponses(
  projectId: string,
  taskId: string,
): ResponseDTO[] {
  return MOCK_TASK_RESPONSES.map((response) => ({
    ...response,
    task_id: taskId,
  }));
}

export function getMockFeedPage(
  limit: number = 20,
  cursor?: string,
): FeedPage {
  return { ...MOCK_FEED_PAGE };
}
