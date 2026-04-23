"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/src/lib/api/auth";
import { useState } from "react";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

export default function VerifyEmailPage({
  params,
}: {
  params: { key: string };
}) {
  const { key } = params; // <!> does it work?

  const router = useRouter();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!key) return;
    verifyEmail(key)
      .then(() => router.push("/login?verified=true"))
      .catch((error) => setServerError(error));
  }, [key]);

  return (
    <div
      className="centered"
    >
      Подтверждение email...
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
  );
}
