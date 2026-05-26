"use client";

import { useQuery } from "@tanstack/react-query";
import { getAssets, getAsset } from "@/src/lib/api/media";

export const mediaKeys = {
  avatarUrl: () => ["media", "avatarUrl"] as const,
};

export async function getLatestAvatarUrl(): Promise<string | null> {
  const { items } = await getAssets();
  const latestImage = items
    .filter((item) => item.kind === "image")
    .sort((a, b) => new Date(b.inserted_at).getTime() - new Date(a.inserted_at).getTime())[0];

  if (!latestImage) {
    return null;
  }

  const asset = await getAsset(latestImage.id);
  return asset.download_url;
}

export function useCurrentAvatarUrl() {
  return useQuery({
    queryKey: mediaKeys.avatarUrl(),
    queryFn: getLatestAvatarUrl,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
