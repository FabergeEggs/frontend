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
    quantity_count: number  // Кол-во проектов, помеченных данным тегом
}

interface ProjectCreateDTO {
    label: string,
    short_description: string,
    description: string,
    tags: string[],
    creator: string
    status: ProjectStatusEnum
}

interface ProjectUpdateDTO {
    label: string,
    short_description: string,
    description: string,
    tags: string[],
    creator: string,
    status: ProjectStatusEnum
}

interface ProjectInfoDTO {
    id: string,
    label: string,
    creator: string,
    short_description: string,
    description: string,
    tags: Tag[],
    created_at: Date, // <!> С датами обычно всегда весело
    updated_at: Date,
    status: ProjectStatusEnum
}

interface ProjectStatisticsDTO {
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
    short_description: string,
    description: string,
    tags: Tag[],
    created_at: Date, 
    updated_at: Date,
    status: ProjectStatusEnum,

    // statistics
    tasks_count: number,
    participants_count: number,
    answers_count: number
}