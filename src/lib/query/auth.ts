"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  register,
  verifyEmail,
  emailResendVerification,
  forgotPassword,
  resetPassword,
} from "@/src/lib/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/providers/AuthProvider";

export function useLoginMutation() {
  const router = useRouter();
  const { setUserId } = useAuth();

  return useMutation({
    mutationFn: async (loginData: LoginRequestDTO) => {
      const response = await login(loginData);
      return response;
    },
    onSuccess: (response) => {
      setUserId(response.user_id);
      router.push("/feed");
    },
  });
}

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (registerData: RegisterRequestDTO) => register(registerData),
    onSuccess: (response, registerData) => {
      router.push(
        `/verify-email?email=${encodeURIComponent(registerData.email)}`
      );
    },
  });
}

export function useVerifyEmailMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (key: string) => verifyEmail(key),
    onSuccess: () => {
      router.push("/login?verified=true");
    },
  });
}

export function useEmailResendMutation() {
  return useMutation({
    mutationFn: (email: string) => emailResendVerification(email),
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
}

export function useResetPasswordMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { key: string; new_password: string }) =>
      resetPassword(data.key, data.new_password),
    onSuccess: () => {
      router.push("/login?reset=success");
    },
  });
}
