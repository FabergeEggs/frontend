"use client"
import { useState } from 'react';
 
function Header({ title }) {
    return <h1>{title ? title : "Default title"}</h1>
}

export default function HomePage() {
    const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]

    const [likes, setLikes] = useState(0)

    function handleClick() {
        setLikes(likes + 1)
    }

    const [text, setText] = useState("")

    async function loadService(name) {
        const r = await fetch(`http://localhost:8080/${name}/`);
        const text = await r.text();
        setText(text);
    }

    return (
        <div>
        <Header title="Develop. Preview. Ship.fdfdf" />
        <ul>
            {names.map((name) => (
            <li key={name}>{name}</li>
            ))}
        </ul>

        <button onClick={handleClick}>Like ({likes})</button>

        <h1>Citizen Science</h1>

		<button onClick={() => loadService("auth")}>Auth service</button>
		<button onClick={() => loadService("project")}>Project service</button>

		<p id="result">{text}</p>

        </div>
        
    )
}
