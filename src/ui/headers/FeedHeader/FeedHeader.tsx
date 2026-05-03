"use client"

import styles from './FeedHeader.module.css'

import Logo from '../../info/Logo/Logo'
import GreenButton from '../../buttons/GreenButton/GreenButton'
import HeaderIcon from '../../images/HeaderIcon/HeaderIcon'

import SearchInput from '../../inputs/SearchInput/SearchInput'
import { useState } from 'react'

import Link from 'next/link'

export default function FeedHeader() {
    const [search, setSearch] = useState("")

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
    }

    return (
        <header className="basic-header basic-flex">
            <Logo />
            <SearchInput onChange={handleSearchChange}/>
            <div className="basic-flex">
                <Link href="/feed/create">
                {/* <!> В зависимости от положения дел пользователя будет "Создать проект" со ссылкой на создание проекта, 
                "Мой проект", если проект есть и он один, "Мои проекты" с якорной ссылкой на профиль на список проектов */}
                    <GreenButton className={styles.projectBtn} text="Создать проект"/>
                </Link>
                <HeaderIcon />
            </div>
        </header>
    )
}