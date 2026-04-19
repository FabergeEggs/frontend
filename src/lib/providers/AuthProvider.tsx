"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { refreshToken } from "@/src/lib/api/auth";
import { setAccessToken } from "../api/tokenStore";

interface AuthContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  setUserId: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    refreshToken()
      .then((data) => {
        // setUserId(data.user_id)
      })
      .catch(() => {});
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
