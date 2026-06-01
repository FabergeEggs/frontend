export enum ResponseStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}

export interface CommentDTO {
    id?: string;
    post_id: string;
    user_id: string;
    user_name?: string;
    content: string;
    created_at?: string;
    updated_at?: string;
}

export interface ResponseDTO {
    id: string;
    task_id: string;
    user_id: string;
    user_name?: string;  // denormalized by response-service; may be empty until Kafka propagates
    text: string;
    status: ResponseStatus;
    attached_files: string[];
    created_at: string;
    updated_at: string;
}
