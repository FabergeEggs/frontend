import styles from './FileInfo.module.css'

export default function FileInfo({name, index}: {name: string, index: number}) {
    return (<div className={`basic-box ${styles.file}`} key={index}>
                        {name}
                    </div>)
}