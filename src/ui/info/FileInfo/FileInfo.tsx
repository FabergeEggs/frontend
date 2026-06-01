import styles from './FileInfo.module.css'

export default function FileInfo({name, index}: {name: string, index: number}) {
    const isUrl = name.startsWith("http");
    return (
        <div className={`basic-box ${styles.file}`}>
            {isUrl ? (
                <a
                    href={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--active-dark-color)", textDecoration: "underline" }}
                >
                    📎 Файл {index + 1}
                </a>
            ) : (
                <span>📎 {name}</span>
            )}
        </div>
    );
}