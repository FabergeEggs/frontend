import styles from './UserInfo.module.css'
import Image from "next/image";
import ProfilePicturePlug from "@/public/assets/project/profile_picture_plug.svg"

export default function UserInfo({username, created_at}: {username: string, created_at: string}) {
    return (
    <div className={styles.user}>
            <Image src={ProfilePicturePlug} alt="Profile picture"/>
            <div className={styles.username}>
              {username}
              <div className={styles.date}>
                {created_at}
              </div>
            </div>
          </div>)
}