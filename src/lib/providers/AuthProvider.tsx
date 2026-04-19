"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { refreshToken } from "@/src/lib/api/auth"
// import { setAccessToken } from "../api/tokenStore"
// import { me } from "../api/auth"

// interface AuthContextType {
//   userId: string | null,
//   setUserId: (id: string | null) => void
// }

// const AuthContext = createContext<AuthContextType>({
//   userId: null,
//   setUserId: () => {}
// })

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    refreshToken().catch(() => {})
  }, [])

  return <>{children}</>
}