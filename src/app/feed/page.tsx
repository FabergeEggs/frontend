"use client"

import FeedHeader from "@/src/ui/headers/FeedHeader/FeedHeader";
import styles from './feedpage.module.css'
import {useState} from "react";
import FilterButton from "@/src/ui/buttons/FilterButton/FilterButton";
import FilterDateButton from "@/src/ui/buttons/FilterDateButton/FilterDateButton";
import FeedCard from "@/src/ui/info/FeedCard/FeedCard";

export default function Page() {
  const [filter, setFilter] = useState({
    'new': true,
    'popular': false,
    'subscriptions': false,
    'dateFrom': '',
    'dateTo': '',
  });

  return (
    <div className={styles.container}>
      <FeedHeader />
      <div className={styles.pageContainer}>
        <div className={`basic-flex-column ${styles.left}`}>
          <div className={styles.filters}>
            <FilterButton text="Новые" chosen={filter['new']} onClick={() => setFilter({...filter, 'new': true, 'popular': false, 'subscriptions': false})} />
            <FilterButton text="Популярные" chosen={filter['popular']} onClick={() => setFilter({...filter, 'new': false, 'popular': true, 'subscriptions': false})} />
            <FilterButton text="Подписки" chosen={filter['subscriptions']} onClick={() => setFilter({...filter, 'new': false, 'popular': false, 'subscriptions': true})} />
            <FilterDateButton text="C..." chosen={filter['dateFrom'] ? true : false} onClick={() => {
              const from = prompt('Введите дату "От" в формате ГГГГ-ММ-ДД', filter['dateFrom']);
              setFilter({...filter, 'dateFrom': from || ''});
            }} />
            <FilterDateButton text="До..." chosen={filter['dateTo'] ? true : false} onClick={() => {
              const to = prompt('Введите дату "До" в формате ГГГГ-ММ-ДД', filter['dateTo']);
              setFilter({...filter, 'dateTo': to || ''});
            }} />
          </div>
          <div className={`basic-flex-column ${styles.feed}`}>
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </div>
          <div className={`basic-flex-column ${styles.right}`}>
              
          </div>
        </div>
      </div>
    </div>
  );
}
