import styles from "./textSizeSlider.module.css"

export default function TextSizeSlider(){
    return(
        <div className={styles.textSizeSlider}>
            <h4>Texto de exemplo</h4>
            <div>
                <p>Aprender não existe para só interpretar o mundo; também para mudá-lo.</p>
            </div>
            <input type={"range"} className={styles.barra}/>
        </div>
    )
}