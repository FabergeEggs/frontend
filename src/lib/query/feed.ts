"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed, type FeedFilter } from "@/src/lib/api/feed";

export const feedKeys = {
  all: ["feed"] as const,
  global: (filter?: FeedFilter) => [...feedKeys.all, "global", filter ?? "all"] as const,
};

export function useGlobalFeed(limit = 20, filter?: FeedFilter) {
  return useInfiniteQuery({
    queryKey: feedKeys.global(filter),
    queryFn: ({ pageParam }) =>
      getFeed(limit, pageParam as string | undefined, filter),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: FeedPage) =>
      lastPage.has_more && lastPage.next_cursor
        ? lastPage.next_cursor
        : undefined,
  });
}
