"use client";

import styles from "./FeedHeader.module.css";

import Logo from "../../info/Logo/Logo";
import HeaderIcon from "../../images/HeaderIcon/HeaderIcon";
import GreenButton from "../../buttons/GreenButton/GreenButton";

import SearchInput from "../../inputs/SearchInput/SearchInput";

import Link from "next/link";

interface FeedHeaderProps {
  search?: string;
  onSearchChange?: (value: string) => void;
}

export default function FeedHeader({ search = "", onSearchChange }: FeedHeaderProps) {
  return (
    <header className="basic-header basic-flex">
      <Logo />
      <SearchInput
        value={search}
        onChange={(e) => onSearchChange?.((e as { target: { value: string } }).target.value)}
        placeholder="Поиск по ленте..."
      />
      <div className="basic-flex">
        <Link
          href="/feed/create"
          className="basic-link"
        >
          {/* <!> В зависимости от положения дел пользователя будет "Создать проект" со ссылкой на создание проекта, 
                "Мой проект", если проект есть и он один, "Мои проекты" с якорной ссылкой на профиль на список проектов */}
          <GreenButton text="Создать проект" className={`${styles.projectBtn}`}/>
        </Link>
        <Link href="/profile" className="basic-link">
          <HeaderIcon />
        </Link>
      </div>
    </header>
  );
}
