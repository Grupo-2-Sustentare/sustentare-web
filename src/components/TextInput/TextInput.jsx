import styles from "./textInput.module.css"

export default function Input(){
    return (
        <>
            <input type="text" className={styles.customInput} />
        </>
    )
}