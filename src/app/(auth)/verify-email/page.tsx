"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/src/lib/api/auth";
import { useState } from "react";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = searchParams.get("key");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!key) return;
    verifyEmail(key)
      .then(() => router.push("/login?verified=true"))
      .catch((error) => setServerError(error));
  }, [key]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Подтверждение email...
      {serverError && <ValidationError messages={[serverError]} />}
    </div>
  );
}
