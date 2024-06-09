import styles from "./button.module.css"

export default function Button({insideText,onClick}){
    return (
        <>
            <button onClick={onClick} className={styles.customButton}>{insideText}</button>
        </>
    )
}