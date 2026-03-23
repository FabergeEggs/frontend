import styles from './SignupHeader.module.css'

import Logo from '../../info/Logo/Logo'
import GreenButton from '../../buttons/GreenButton/GreenButton'
import HeaderIcon from '../../images/HeaderIcon/HeaderIcon'

import Link from 'next/link'

export default function SignupHeader() {
    return (
        <header className={styles.header}>
            <Logo />
            <div>
                <Link href="/login">
                    <GreenButton className={styles.loginBtn} text="Войти"/>
                </Link>
                <HeaderIcon />
            </div>
        </header>
    )
}