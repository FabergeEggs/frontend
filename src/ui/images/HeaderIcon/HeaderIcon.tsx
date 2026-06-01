import styles from './HeaderIcon.module.css'

const DEFAULT_AVATAR = "/assets/project/example.png";

export default function HeaderIcon({ className, src }: { className?: string; src?: string }) {
    return (
        <div className={`${styles.icon} ${className ?? ''}`}>
            <img
                src={src || DEFAULT_AVATAR}
                alt="Аватар"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
            />
        </div>
    )
}