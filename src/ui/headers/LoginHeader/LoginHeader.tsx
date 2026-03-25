import styles from './LoginHeader.module.css'

import Logo from '../../info/Logo/Logo'
import GreenButton from '../../buttons/GreenButton/GreenButton'
import HeaderIcon from '../../images/HeaderIcon/HeaderIcon'

import Link from 'next/link'

export default function LoginHeader() {
    return (
        <header className={styles.header}>
            <Logo />
            <div>
                <Link href="/signup">
                    <GreenButton className={styles.signupBtn} text="Зарегистрироваться"/>
                </Link>
                <HeaderIcon className={styles.headerIcon}/>
            </div>
        </header>
    )
}