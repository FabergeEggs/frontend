interface ProfileDTO {
    id: string
    user_id: string
    username: string
    email: string
    first_name: string
    last_name: string
    bio: string
    avatar_url: string
    created_at: Date
    is_active: boolean
}

const emptyProfile = (): ProfileDTO => ({
  id: "",
  user_id: "",
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  bio: "",
  avatar_url: "",
  created_at: new Date(),
  is_active: false,
})

const profile = emptyProfile()

interface UpdateProfileRequestDTO { 
  first_name: string
  last_name: string
  bio: string
  avatar_url: string
}
