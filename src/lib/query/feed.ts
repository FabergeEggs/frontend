"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed } from "@/src/lib/api/feed";

export const feedKeys = {
  all: ["feed"] as const,
  global: () => [...feedKeys.all, "global"] as const,
};

export function useGlobalFeed(limit = 20) {
  return useInfiniteQuery({
    queryKey: feedKeys.global(),
    queryFn: ({ pageParam }) =>
      getFeed(limit, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: FeedPage) =>
      lastPage.has_more && lastPage.next_cursor
        ? lastPage.next_cursor
        : undefined,
  });
}
