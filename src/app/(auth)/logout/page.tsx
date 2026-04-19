"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { logout } from "@/src/lib/api/auth";
import { useState } from "react";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    logout()
      .then(() => router.push("/login"))
      .catch((error) => setServerError(error));
  }, []);

  return (
    <div
      className="centered"
    >
      Выход из аккаунта...
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
  );
}
