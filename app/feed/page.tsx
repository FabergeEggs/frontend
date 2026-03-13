"use client"
import { useState } from "react";
export default function FeedPage() {
    const [text, setText] = useState("")

    async function loadService(name: string) {
        const r = await fetch(`http://localhost:8080/${name}/`);
        const text = await r.text();
        setText(text);
    }

    return (
        <div>
            <button onClick={() => loadService("auth")}>Auth service</button>
            <button onClick={() => loadService("project")}>Project service</button>

            <p id="result">{text}</p>
        </div>
    )
}
