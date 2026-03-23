import styles from './TextLink.module.css'
import Link from "next/link"


export default function TextLink({href, children}: {href: string, children: React.ReactNode}) {
    return (
        <Link className={styles.link} href={href}>
            {children}
        </Link>
    )
}