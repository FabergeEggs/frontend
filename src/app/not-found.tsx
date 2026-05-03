import BasicHeader from "@/src/ui/headers/BasicHeader/BasicHeader";
import Link from "next/link";
import styles from './notfound.module.css'
import NotFoundImage from '@/public/assets/404.svg'
import Image from "next/image";

export default function Page() {
//   redirect("/feed");
    return (<>
        <BasicHeader />
        <Image className={styles.image} src={NotFoundImage} alt="404 Image" />
        <div className={styles.container}>
            <h1 className={styles.label}>Страница не найдена</h1>
            <p className={styles.text}>Страница, которую вы ищите, не существует.</p>
            <Link className="basic-link" href="/feed">
                <button className={`basic-btn ${styles.btn}`}>Вернуться на главную страницу</button>
            </Link>
        </div>
    </>)
}