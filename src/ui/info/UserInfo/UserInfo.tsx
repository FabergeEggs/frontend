import styles from './UserInfo.module.css'
import Image from "next/image";
const DEFAULT_AVATAR = "/assets/project/example.png";

export default function UserInfo({username, created_at}: {username: string, created_at: string}) {
    return (
    <div className={styles.user}>
            <Image src={DEFAULT_AVATAR} alt="Profile picture" width={40} height={40} />
            <div className={styles.username}>
              {username}
              <div className={styles.date}>
                {created_at}
              </div>
            </div>
          </div>)
}