"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/src/lib/api/auth";
import { useState } from "react";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";
import {use} from "react"

export default function VerifyEmailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const {key} = use(params); // <!> does it work?

  const router = useRouter();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!key) return;
    verifyEmail(key)
      .then(() => router.push("/login?verified=true"))
      .catch((error) => setServerError("Произошла ошибка."));
  }, [key, router]);

  return (
    <div
      className="centered basic-flex-column"
    >
      <p>Подтверждение email...</p>
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
  );
}
