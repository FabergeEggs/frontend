"use client"

import GreenButton from "@/src/ui/buttons/GreenButton/GreenButton"
import Tag from "@/src/ui/info/Tag/Tag"
import Logo from "@/src/ui/info/Logo/Logo"

export default function CreateProfilePage() {

    return (
        <div>
            <p>Feed Page *</p>
            <GreenButton text="Создать проект" onClick={() => console.log("Test")} width="149"/>
            <Tag text="Урбанистика"/>
            <Logo></Logo>
        </div>
    )
}