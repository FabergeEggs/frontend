"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProfile,
  updateProfile
} from "@/src/lib/api/profile";
import { profileKeys } from "./keys";
import { getApiErrorMessage } from "@/src/lib/api/errors";
import type {
  ProfileDTO,
  UpdateProfileRequestDTO
} from "@/src/lib/models/export/profile";

export function useProfileInfo(profileId: string) {
  return useQuery({
    queryKey: profileKeys.info(profileId),
    queryFn: () => getProfile(profileId),
    enabled: Boolean(profileId),
  });
}

export function useProfiles(userIds: string[]) {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ["profiles", ...userIds],
    queryFn: async () => {
      // Use cached data if available, only fetch missing profiles
      const profiles: Record<string, ProfileDTO> = {};
      const missingIds: string[] = [];
      
      for (const userId of userIds) {
        const cached = queryClient.getQueryData(profileKeys.info(userId));
        if (cached) {
          profiles[userId] = cached as ProfileDTO;
        } else {
          missingIds.push(userId);
        }
      }
      
      // Fetch missing profiles in parallel
      if (missingIds.length > 0) {
        const fetchedProfiles = await Promise.all(
          missingIds.map(id => getProfile(id))
        );
        fetchedProfiles.forEach((profile, i) => {
          profiles[missingIds[i]] = profile;
        });
      }
      
      return profiles;
    },
    enabled: userIds.length > 0,
  });
}

export function useUpdateProfile(profileId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequestDTO) => updateProfile(profileId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.info(profileId) });
    },
  });
}

/** Сообщение об ошибке из query/mutation для UI */
export { getApiErrorMessage };
