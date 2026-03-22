import styles from './Logo.module.css'
import HeaderIcon from '../../images/HeaderImage/HeaderIcon'

export default function Logo() {
    return (
        <div className={styles.logo}>
            <HeaderIcon/>
            <span className={styles.text}>Название</span>
        </div>
    )
}
