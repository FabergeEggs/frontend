"use client";
import { useEffect } from "react";
import ValidationError from "@/src/ui/forms/ValidationError/ValidationError";
import { useVerifyEmailMutation } from "@/src/lib/query/auth";
import { getMutationStatus } from "@/src/lib/query/status";
import { use } from "react";

export default function VerifyEmailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const {key} = use(params);
  const verifyMutation = useVerifyEmailMutation();
  const mutationStatus = getMutationStatus(verifyMutation);

  useEffect(() => {
    if (!key) return;
    verifyMutation.mutate(key);
  }, [key]);

  if (mutationStatus.isSubmitting) {
    return (
      <div className="centered basic-flex-column">
        <p>Подтверждение email...</p>
      </div>
    );
  }

  if (mutationStatus.isError) {
    return (
      <div className="centered basic-flex-column">
        <ValidationError messages={[mutationStatus.errorMessage ?? "Ошибка подтверждения"]} />
      </div>
    );
  }

  return null;
}
