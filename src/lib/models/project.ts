enum ProjectStatusEnum {
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  DELETED = "DELETED",
}

enum TaskStatusEnum {
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  DELETED = "DELETED",
}

enum ProjectRoleEnum {
  SCIENTIST = "SCIENTIST",
  VOLUNTEER = "VOLUNTEER",
  DELETED = "DELETED",
}

interface Tag {
  tag_id: string;
  name: string;
  quantity_count: number; // Кол-во проектов, помеченных данным тегом
}

interface ProjectCreateDTO {
  // Also used as Update DTO
  label: string;
  short_description: string;
  description: string;
  tags: string[];
  status: ProjectStatusEnum;
}

interface ProjectInfoDTO {
  project_id: string;
  creator_id: string;
  label: string;
  creator: string;
  description: string;
  tags: Tag[];
  created_at: Date;
  status: ProjectStatusEnum;
}

interface ProjectStatsDTO {
  project_id: string;
  tasks_count: number;
  participants_count: number;
  answers_count: number;
}

interface ProjectFull {
  // info
  project_id: string;
  label: string;
  creator: string;
  creator_id: string;
  description: string;
  tags: Tag[];
  created_at: Date;
  status: ProjectStatusEnum;

  // statistics
  tasks_count: number;
  participants_count: number;
  answers_count: number;
}

interface Post {
  post_id: string;
  project_id: string;
  creator_id: string;
  label: string;
  creator: string;
  short_description: string;
  description: string;
  comments_count: number;
  created_at: Date;
  updated_at: Date;
}

interface PostCreateDTO {
  // Also used as PostUpdateDTO
  label: string;
  short_description: string;
  description: string;
}

interface PostUpdateDTO {
  post_id: string;
  project_id: string; // Нужен для проверки, что делается из нужного проекта
  label: string;
  short_description: string;
  description: string;
}

interface Task {
  task_id: string;
  project_id: string;
  creator_id: string;
  label: string;
  creator: string;
  short_description: string;
  description: string;
  created_at: Date;
  answers_count: number;
  status: TaskStatusEnum;
}

interface TaskCreateDTO {
  label: string;
  short_description: string;
  description: string;
}

interface TaskUpdateDTO {
  label: string;
  short_description: string;
  description: string;
  status: TaskStatusEnum;
}

enum PublicationTypeEnum {
  POST = "post",
  TASK = "task",
}

interface PublicationDTO {
  id: string;
  project_id: string;
  label: string;
  short_description: string;
  created_at: Date;
  creator_id: string;
  creator_name: string;
  type: PublicationTypeEnum;
  answers_count: number;
  status: TaskStatusEnum | null; // null для постов, статус для задач
}

interface PublicationsResponse {
  items: PublicationDTO[];
  next_cursor: string | null;
  has_more: boolean;
}

// Membership

interface MembershipProjectDTO {
  project_id: string;
  label: string;
  short_description: string;
  created_at: Date;
  status: TaskStatusEnum;
  creator_name: string;
}

interface MembershipsDTO {
  scientist: MembershipProjectDTO[];
  volunteer: MembershipProjectDTO[];
}

interface AddMemberDTO {
  id: string;
  role: ProjectRoleEnum;
}

/**
 * 
 * 7. models/project.ts mixes enums, interfaces, and DTOs in one file
Consider splitting:
models/
  enums.ts      ← ProjectStatusEnum, TaskStatusEnum, etc.
  project.ts    ← Project-related interfaces
  task.ts       ← Task-related interfaces
  post.ts       ← Post-related interfaces
 * 
 */
