import styles from './UserInfo.module.css'

const DEFAULT_AVATAR = "/assets/project/example.png";

export default function UserInfo({ username, created_at, avatar_url }: { username: string; created_at: string; avatar_url?: string | null }) {
    return (
    <div className={styles.user}>
            <img
              src={avatar_url || DEFAULT_AVATAR}
              alt="Profile picture"
              width={40}
              height={40}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <div className={styles.username}>
              {username}
              <div className={styles.date}>
                {created_at}
              </div>
            </div>
          </div>)
}