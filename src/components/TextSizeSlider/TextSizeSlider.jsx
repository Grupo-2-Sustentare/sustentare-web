import styles from "./textSizeSlider.module.css"
import {useState} from "react";

const TAMANHO_PADRAO = 24
const TAMANHO_MAXIMO = 34

export default function TextSizeSlider(){

    const [tamanho, setTamanho] = useState(24)

    function handleChange(e) {
        const tamanhoFonte = e.target.value

        setTamanho(tamanhoFonte)
        document.documentElement.style.setProperty(
            '--tamanho-padrao', tamanhoFonte + "px", "important");
    }

    return(
        <div className={styles.textSizeSlider}>
            <h4>Texto de exemplo</h4>
            <div>
                <p style={{"fontSize": tamanho + "px"}}>
                    Aprender não existe apenas para interpretar o mundo, mas também para mudá-lo.
                </p>
            </div>
            <input
                type={"range"} className={styles.barra}
                defaultValue={TAMANHO_PADRAO}
                min={TAMANHO_PADRAO}
                max={TAMANHO_MAXIMO}
                onChange={handleChange}
            />
        </div>
    )
}