import styles from "./button.module.css"

export default function Button({insideText}){
    return (
        <>
            <button className={styles.customButton}>{insideText}</button>
        </>
    )
}