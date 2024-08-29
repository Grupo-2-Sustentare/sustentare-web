import styles from "./measurementTextInput.module.css"

export default function MeasurementUnitInput({ label, measurementUnit, onChange}){
    // Criando a label, caso tenha sido informada.
    let tagLabel = null;
    if (label !== undefined){
        tagLabel = <label>{label}</label>
    }

    return (
        <div className={styles.measurementInput}>
            {tagLabel}
            <span>
                <input type={"text"} onChange={onChange}/>
                <label className={styles.unit}>{measurementUnit}</label>
            </span>
        </div>
    )
}
                    