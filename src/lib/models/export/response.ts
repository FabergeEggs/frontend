export enum ResponseStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}

export interface CommentDTO {
    id?: number;
    response_id: string;
    user_id: string;
    content: string;
    created_at?: string;
    updated_at?: string;
}

export interface ResponseDTO {
    id: string;
    task_id: string;
    user_id: string;
    text: string;
    status: ResponseStatus;
    attached_files: string[];
    created_at: string;
    updated_at: string;
}
