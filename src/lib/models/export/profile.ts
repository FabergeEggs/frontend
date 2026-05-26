export interface ProfileDTO {
    id: string
    user_id: string
    username: string
    email: string
    first_name: string
    last_name: string
    bio: string
    created_at: Date
    is_active: boolean
}

export interface UpdateProfileRequestDTO { 
  first_name: string
  last_name: string
  bio: string
}
