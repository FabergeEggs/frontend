export enum ResponseStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}

export interface CommentDTO {
    id: string | null;
    response_id: string;
    user_id: string;
    user_name: string;
    content: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface ResponseDTO {
    id: string;
    task_id: string;
    user_id: string;
    user_name: string;
    text: string;
    status: ResponseStatus;
    attached_files: string[];
    created_at: string;
    updated_at: string;
}

export interface CreateResponseRequest {
    task_id: string;
    user_id: string;
    text: string;
    attached_files?: string[];
}

export interface UpdateResponseRequest {
    text?: string | null;
    status?: ResponseStatus | null;
    attached_files?: string[] | null;
}

export interface CreateCommentRequest {
    user_id: string;
    text: string;
}

export interface ChangeStatusRequest {
    status: ResponseStatus;
}
