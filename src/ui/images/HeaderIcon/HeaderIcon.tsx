import styles from './HeaderIcon.module.css'

/*{image}: {image: string}*/
export default function HeaderIcon({className} : {className?: string}) { 
    // Import image
    return (
        <div className={`${styles.icon} ${className ?? ''}`}>
        </div>
    )
}