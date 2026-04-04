interface RegisterRequestDTO {
  username?: string;
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
  about?: string;
  phone?: string;
}

interface LoginRequestDTO {
  login: string
  password: string
}

interface MeResponseDTO {
  sub: string
  email?: string
  preferred_username?: string
  name?: string       // Полное имя
  given_name?: string  // Имя
  family_name?: string // Фамилия
  phone?: string      // Телефон
  about?: string      // О себе
  realm_roles: string[]
  client_roles: Record<string, string[]>
  raw_claims: Record<string, unknown>
}

// interface MeResponseDTO {
//   sub: string
//   email?: string | null
//   preferred_username?: string | null
//   name?: string | null        // Полное имя
//   given_name?: string | null  // Имя
//   family_name?: string | null // Фамилия
//   phone?: string | null       // Телефон
//   about?: string | null       // О себе
//   realm_roles: string[]
//   client_roles: Record<string, string[]>
//   raw_claims: Record<string, unknown>
// }