"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { refreshToken } from "@/src/lib/api/auth";
import { getUserId as readUserId, setUserId as persistUserId } from "@/src/lib/store/userStore";
import { usePathname } from "next/navigation";

interface AuthContextType {
  userId: string;
  isLoading: boolean;
  setUserId: (id: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  userId: "",
  isLoading: true,
  setUserId: () => {},
});

const AUTH_ROUTES = [
  "/login",
  "/logout",
  "/signup",
  "/reset-password",
  "/verify-email",
  "/testcli",
  "/testsrv",
];

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [userId, setUserIdState] = useState(() => readUserId() ?? "");
  const [isLoading, setIsLoading] = useState(true);

  const setUserId = (id: string) => {
    setUserIdState(id);
    persistUserId(id);
  };

  // Сессию восстанавливаем один раз при загрузке приложения, не при каждом переходе
  useEffect(() => {
    if (isAuthRoute(pathname)) {
      setIsLoading(false);
      return;
    }

    const storedUserId = readUserId();
    if (storedUserId) {
      setUserIdState(storedUserId);
      setIsLoading(false);
      return;
    }

    refreshToken()
      .then((data) => {
        if (data.user_id) {
          setUserId(data.user_id);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
    // pathname намеренно не в deps — нужен только снимок при первом mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ userId, isLoading, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
