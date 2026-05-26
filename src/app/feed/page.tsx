"use client";

import FeedHeader from "@/src/ui/headers/FeedHeader/FeedHeader";
import FeedCard from "@/src/ui/info/FeedCard/FeedCard";
import { useGlobalFeed } from "@/src/lib/query/feed";

export default function Page() {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGlobalFeed();

  const items: FeedItem[] =
    data?.pages.flatMap((p: FeedPage) => p.items) ?? [];

  return (
    <>
      <FeedHeader />
      <div className="pagecontainer basic-flex-column">
        {isLoading && <p>Загрузка…</p>}
        {isError && <p>Не удалось загрузить ленту</p>}
        {!isLoading && !isError && items.length === 0 && <p>Лента пуста</p>}
        {items.map((item: FeedItem) => (
          <FeedCard key={item.id} item={item} />
        ))}
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Загрузка…" : "Загрузить ещё"}
          </button>
        )}
      </div>
    </>
  );
}
