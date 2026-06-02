import styles from './FileInfo.module.css'

function filenameFromUrl(url: string, fallbackIndex: number): string {
    try {
        const pathname = new URL(url).pathname;
        const decoded = decodeURIComponent(pathname.split("/").pop() ?? "");
        return decoded || `Файл ${fallbackIndex + 1}`;
    } catch {
        return `Файл ${fallbackIndex + 1}`;
    }
}

export default function FileInfo({name, index}: {name: string, index: number}) {
    const isUrl = name.startsWith("http");
    const label = isUrl ? filenameFromUrl(name, index) : `Файл ${index + 1}`;
    return (
        <div className={`basic-box ${styles.file}`}>
            {isUrl ? (
                <a
                    href={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--active-dark-color)", textDecoration: "underline" }}
                >
                    {label}
                </a>
            ) : (
                <span>{label}</span>
            )}
        </div>
    );
}