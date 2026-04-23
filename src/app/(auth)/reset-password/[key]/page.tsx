"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/src/lib/api/auth";
import { useState } from "react";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";

export default function ResetPasswordFromLinkPage({
  params,
}: {
  params: { key: string };
}) {
  const { key } = params; // <!> does it work?

  const router = useRouter();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (!key) return;
    resetPassword(key, "new passwrod")
      .then(() => router.push("/login"))
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
