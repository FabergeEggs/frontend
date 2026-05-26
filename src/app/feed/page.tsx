"use client";

import { useState } from "react";
import FeedHeader from "@/src/ui/headers/FeedHeader/FeedHeader";
import styles from './feedpage.module.css';
import FilterButton from "@/src/ui/buttons/FilterButton/FilterButton";
import FilterDateButton from "@/src/ui/buttons/FilterDateButton/FilterDateButton";
import FeedCard from "@/src/ui/info/FeedCard/FeedCard";
import { useGlobalFeed } from "@/src/lib/query/feed";

export default function Page() {
  const [filter, setFilter] = useState({
    new: true,
    popular: false,
    subscriptions: false,
    dateFrom: "",
    dateTo: "",
  });

  const feedFilter = filter.subscriptions ? "mine" : undefined;

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGlobalFeed(20, feedFilter);

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className={styles.container}>
      <FeedHeader />
      <div className={styles.pageContainer}>
        <div className={`basic-flex-column ${styles.left}`}>
          <div className={styles.filters}>
            <FilterButton
              text="Новые"
              chosen={filter.new}
              onClick={() => setFilter({ ...filter, new: true, popular: false, subscriptions: false })}
            />
            <FilterButton
              text="Популярные"
              chosen={filter.popular}
              onClick={() => setFilter({ ...filter, new: false, popular: true, subscriptions: false })}
            />
            <FilterButton
              text="Подписки"
              chosen={filter.subscriptions}
              onClick={() => setFilter({ ...filter, new: false, popular: false, subscriptions: true })}
            />
            <FilterDateButton
              text="C..."
              chosen={Boolean(filter.dateFrom)}
              onClick={() => {
                const from = prompt('Введите дату "От" в формате ГГГГ-ММ-ДД', filter.dateFrom);
                setFilter({ ...filter, dateFrom: from || "" });
              }}
            />
            <FilterDateButton
              text="До..."
              chosen={Boolean(filter.dateTo)}
              onClick={() => {
                const to = prompt('Введите дату "До" в формате ГГГГ-ММ-ДД', filter.dateTo);
                setFilter({ ...filter, dateTo: to || "" });
              }}
            />
          </div>
          <div className={`basic-flex-column ${styles.feed}`}>
            {isLoading && <p>Загрузка…</p>}
            {isError && <p>Не удалось загрузить ленту</p>}
            {!isLoading && !isError && items.length === 0 && <p>Лента пуста</p>}
            {items.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
            {hasNextPage && (
              <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? "Загрузка…" : "Загрузить ещё"}
              </button>
            )}
          </div>
          <div className={`basic-flex-column ${styles.right}`} />
        </div>
      </div>
    </div>
  );
}
