"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/src/lib/api/auth";
import { useState } from "react";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

export default function LogoutPage() {
  const router = useRouter();
  const { setUserId } = useAuth();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    logout()
      .then(() => {
        setUserId("");
        router.push("/login");
      })
      .catch(() => setServerError("Произошла ошибка."));
  }, []);

  return (
    <div className="centered basic-flex-column">
      Выход из аккаунта...
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
  );
}
