import styles from './Logo.module.css'
import HeaderIcon from '../../images/HeaderIcon/HeaderIcon'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link href="/feed" className={styles.logo}>
            <HeaderIcon/>
            <span className={styles.text}>Eggs</span>
        </Link>
    )
}
