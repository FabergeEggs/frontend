import styles from './Logo.module.css'
import Image from 'next/image'
import EggIcon from '@/public/assets/mdi_egg-easter.svg'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link href="/feed" className={styles.logo}>
            <Image src={EggIcon} alt="Eggs" width={40} height={40} />
            <span className={styles.text}>Eggs</span>
        </Link>
    )
}
