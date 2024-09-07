import styles from "./button.module.css"

export default function Button({insideText,onClick}){
    return (
        <>
            <button className={styles.button} onClick={onClick}>{insideText}</button>
        </>
    )
}