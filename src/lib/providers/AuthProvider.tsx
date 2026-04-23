"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { refreshToken } from "@/src/lib/api/auth";
import { usePathname } from "next/navigation"

interface AuthContextType {
  userId: string
  isLoading: boolean
  setUserId: (id: string) => void
}

const AuthContext = createContext<AuthContextType>({
  userId: "",
  isLoading: true,
  setUserId: () => {},
});

const AUTH_ROUTES = ["/login", "/signup", "/reset-password", "/email-confirm", "/verify-email"]

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname()

  useEffect(() => {
    const isAuthPage = AUTH_ROUTES.some(route => pathname.startsWith(route))
    
    if (isAuthPage) {
      setIsLoading(false)
      return
    }

    refreshToken()
      .then((data) => {
        // setUserId(data.user_id) <!>
        // setUserId("1e1ccc01-f31d-4cee-8c6a-b60dede271ac")
        setUserId("08bbe2d4-824d-4eac-8984-001ff1954429")
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, []);

  return (
    <AuthContext.Provider value={{ userId, isLoading, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
