"use client";

import { useState, Fragment } from "react";
import FeedHeader from "@/src/ui/headers/FeedHeader/FeedHeader";
import FeedCard from "@/src/ui/info/FeedCard/FeedCard";
import { useGlobalFeed } from "@/src/lib/query/feed";


export default function Page() {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGlobalFeed();

  const items: FeedItem[] = (data?.pages.flatMap((p: FeedPage) => p.items) ?? [])
    .filter((item: FeedItem) => item.source_type !== "response");

  const filtered: FeedItem[] = search.trim()
    ? items.filter((item) => {
        const q = search.toLowerCase();
        return (
          item.label?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.actor_name?.toLowerCase().includes(q)
        );
      })
    : items;

  return (
    <>
      <FeedHeader search={search} onSearchChange={setSearch} />
      <div className="pagecontainer basic-flex-column">
        {isLoading && <p>Загрузка…</p>}
        {isError && <p>Не удалось загрузить ленту</p>}
        {!isLoading && !isError && filtered.length === 0 && (
          <p>{search.trim() ? "Ничего не найдено" : "Лента пуста"}</p>
        )}
        {filtered.map((item: FeedItem) => (
          <Fragment key={item.id}>
            <FeedCard item={item} />
          </Fragment>
        ))}
        {hasNextPage && !search.trim() && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Загрузка…" : "Загрузить ещё"}
          </button>
        )}
      </div>
    </>
  );
}
