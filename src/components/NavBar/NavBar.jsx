import styles from './navBar.module.css'

export default function NavBar ({ Icon, InsideText}){
    return (
        <div className={styles.NavBar}>
            <Icon/>
            <p className={styles.Title}>{InsideText}</p>
        </div>
    );
}

