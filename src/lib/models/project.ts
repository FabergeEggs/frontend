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
    tag_id: string,
    name: string,
    quantity_count: number // Кол-во проектов, помеченных данным тегом
}

interface ProjectCreateDTO {
    creator_id: string,
    label: string,
    short_description: string,
    description: string,
    tags: string[],
    status: ProjectStatusEnum
}

interface ProjectUpdateDTO {
    project_id: string,
    label: string,
    short_description: string,
    description: string,
    tags: string[],
    status: ProjectStatusEnum
}

interface ProjectInfoDTO {
    id: string,
    label: string,
    creator: string,
    creator_id: string,
    description: string,
    tags: Tag[],
    created_at: Date, 
    status: ProjectStatusEnum
}

interface ProjectDetailDTO {
    short_description: string, // Теперь прилетает отсюда
    activities: (Task | Post)[];
    // Вместо Task и Post будет сокращённый DTO
}

interface ProjectStatsDTO {
    project_id: string,
    tasks_count: number,
    participants_count: number,
    answers_count: number
}

interface ProjectFull { 
    // info
    id: string,
    label: string,
    creator: string,
    creator_id: string,
    description: string,
    tags: Tag[],
    created_at: Date, 
    status: ProjectStatusEnum,

    // statistics
    tasks_count: number,
    participants_count: number,
    answers_count: number

    // detail
    short_description: string,
}


interface Post {
    post_id: string,
    project_id: string,
    creator_id: string,
    label: string,
    creator: string,
    short_description: string,
    description: string,
    created_at: Date
}

interface PostCreateDTO {
    project_id: string,
    creator_id: string,
    label: string,
    short_description: string,
    description: string,
}

interface PostUpdateDTO {
    post_id: string,
    project_id: string, // Нужен для проверки, что делается из нужного проекта
    label: string,
    short_description: string,
    description: string,
}

interface Task {
    task_id: string,
    project_id: string,
    creator_id: string,
    label: string,
    creator: string,
    short_description: string,
    description: string,
    created_at: Date,
    answers_count: number
    status: TaskStatusEnum,
}

interface TaskCreateDTO {
    project_id: string,
    creator_id: string,
    label: string,
    short_description: string,
    description: string,
}

interface TaskUpdateDTO {
    task_id: string,
    project_id: string,
    label: string,
    short_description: string,
    description: string,
    status: TaskStatusEnum
}

interface TaskShortDTO {
  label: string,
  short_description: string,
  answers_count: number,
  status: TaskStatusEnum
}

interface PostShortDTO {
  label: string,
  short_description: string,
  comments_count: number,
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