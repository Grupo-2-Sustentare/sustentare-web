import styles from "./textInput.module.css"

export default function Input({ value, type, onChange }){
    return (
        <>
            <input value={value} type={type} onChange={onChange} className={styles.customInput}/>
        </>
    )
}