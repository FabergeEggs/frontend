"use client";

import { useState } from "react";
import FeedHeader from "@/src/ui/headers/FeedHeader/FeedHeader";
import FeedCard from "@/src/ui/info/FeedCard/FeedCard";
import { useGlobalFeed } from "@/src/lib/query/feed";

// ─── Тестовые карточки (hardcoded) ───────────────────────────────────────────
const MOCK_FEED_ITEMS: FeedItem[] = [
  {
    id: "mock-1",
    source_type: "project",
    source_id: "00000000-0000-0000-0000-000000000001",
    project_id: null,
    actor_id: "mock-user-1",
    actor_name: "Алексей Новиков",
    actor_avatar_url: null,
    verb: "created",
    label: "EcoTrack — мониторинг экологии города",
    short_description:
      "Платформа для сбора и анализа данных о состоянии воздуха, воды и почвы в реальном времени. Ищем разработчиков и аналитиков данных.",
    description: null,
    media: [],
    occurred_at: "2026-05-26T10:00:00Z",
    payload: {},
  },
  {
    id: "mock-2",
    source_type: "project",
    source_id: "00000000-0000-0000-0000-000000000002",
    project_id: null,
    actor_id: "mock-user-2",
    actor_name: "Мария Соколова",
    actor_avatar_url: null,
    verb: "created",
    label: "OpenMentor — платформа менторства",
    short_description:
      "Соединяем опытных специалистов с начинающими. MVP готов, нужна помощь с UI/UX и маркетингом.",
    description: null,
    media: [],
    occurred_at: "2026-05-25T14:30:00Z",
    payload: {},
  },
  {
    id: "mock-3",
    source_type: "project",
    source_id: "00000000-0000-0000-0000-000000000003",
    project_id: null,
    actor_id: "mock-user-3",
    actor_name: "Дмитрий Козлов",
    actor_avatar_url: null,
    verb: "updated",
    label: "HealthBot — AI-ассистент пациента",
    short_description:
      "Чат-бот для предварительной диагностики симптомов и записи к врачу. Интегрируемся с государственными медицинскими системами.",
    description: null,
    media: [],
    occurred_at: "2026-05-24T09:15:00Z",
    payload: {},
  },
  {
    id: "mock-4",
    source_type: "project",
    source_id: "00000000-0000-0000-0000-000000000004",
    project_id: null,
    actor_id: "mock-user-4",
    actor_name: "Ольга Петрова",
    actor_avatar_url: null,
    verb: "created",
    label: "LocalFarm — маркетплейс фермерских продуктов",
    short_description:
      "Прямые поставки от фермеров к покупателям. Ищем backend-разработчика и специалиста по логистике.",
    description: null,
    media: [],
    occurred_at: "2026-05-23T16:45:00Z",
    payload: {},
  },
];

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

  const items: FeedItem[] = [
    ...MOCK_FEED_ITEMS,
    ...(data?.pages.flatMap((p: FeedPage) => p.items) ?? []),
  ];

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
          <FeedCard key={item.id} item={item} />
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
