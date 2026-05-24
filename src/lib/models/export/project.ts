export enum ProjectStatusEnum {
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  DELETED = "DELETED",
}

export enum TaskStatusEnum {
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  DELETED = "DELETED",
}
export enum PublicationTypeEnum {
  POST = "post",
  TASK = "task",
}

export enum ProjectRoleEnum {
  SCIENTIST = "SCIENTIST",
  VOLUNTEER = "VOLUNTEER",
  DELETED = "DELETED",
}

export interface Tag {
  tag_id: string;
  name: string;
  quantity_count?: number;
}

export interface ProjectCreateDTO {
  label: string;
  short_description: string;
  description: string;
  tags: string[];
  status?: ProjectStatusEnum;
}

export interface ProjectUpdateDTO {
  label: string;
  short_description: string;
  description: string;
  tags: string[];
  status: ProjectStatusEnum;
}

export interface ProjectDTO {
  id: string;
  label: string;
  creator_id: string;
  creator: string;
  short_description: string;
  description: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
  status: ProjectStatusEnum;
}

export interface ProjectInfoDTO {
  project_id: string;
  creator_id: string;
  label: string;
  creator: string;
  description: string;
  tags: Tag[];
  created_at: string;
  status: ProjectStatusEnum;
}

export interface ProjectStatsDTO {
  project_id: string;
  tasks_count: number;
  participants_count: number;
  answers_count: number;
}

export interface ProjectFull extends ProjectInfoDTO, ProjectStatsDTO {}

export interface Post {
  post_id: string;
  project_id: string;
  creator_id: string;
  label: string;
  creator: string;
  short_description: string;
  description: string;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostCreateDTO {
  label: string;
  short_description: string;
  description: string;
}

export interface PostUpdateDTO {
  project_id?: string | null;
  label?: string | null;
  short_description?: string | null;
  description?: string | null;
}

export interface Task {
  task_id: string;
  project_id: string;
  creator_id: string;
  label: string;
  creator: string;
  short_description: string;
  description: string;
  created_at: string;
  updated_at: string;
  answers_count: number;
  status: TaskStatusEnum;
}

export interface TaskCreateDTO {
  label: string;
  short_description: string;
  description: string;
}

export interface TaskUpdateDTO {
  label: string;
  short_description: string;
  description: string;
  status: TaskStatusEnum;
}

export interface PublicationDTO {
  id: string;
  project_id: string;
  label: string;
  short_description: string;
  created_at: string;
  creator_id: string;
  creator_name: string;
  type: PublicationTypeEnum | "post" | "task";
  answers_count: number;
  status: TaskStatusEnum | null;
}

export interface PublicationsResponse {
  items: PublicationDTO[];
  next_cursor: string | null;
  has_more: boolean;
}

export interface MembershipProjectDTO {
  project_id: string;
  label: string;
  short_description: string;
  created_at: string;
  status: ProjectStatusEnum;
  creator_name: string;
}

export interface MembershipsDTO {
  scientist: MembershipProjectDTO[];
  volunteer: MembershipProjectDTO[];
}

export interface DenormUserDTO {
  id: string;
  name?: string;
  role: ProjectRoleEnum;
  avatar_link?: string;
}
