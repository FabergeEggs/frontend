import styles from './TextLink.module.css'
import Link from "next/link"


export default function TextLink({className, href, children}: {className?: string, href: string, children: React.ReactNode}) {
    return (
        <Link className={styles.link} href={href}>
            <span className={className}>{children}</span>
        </Link>
    )
}