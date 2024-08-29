import styles from "./iconInput.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const TIPOS_PERMITIDOS = ["text", "password"]

export default function IconInput({ label, type="text", icon="magnifying-glass", onChange}){

    // Se o tipo não for permitido, dá exception.
    if (!TIPOS_PERMITIDOS.includes(type)) throw new Error("Tipo não permitido ou não implementado. Medida de qualidade.")

    // Criando a label, caso tenha sido informada.
    let tagLabel = null;
    if (label !== undefined){
        tagLabel = <label>{label}</label>
    }

    return (
        <div className={styles.textInput}>
            {tagLabel}
            <div>
                <input type={type} onChange={onChange}/>
                <FontAwesomeIcon className={styles.icon} icon={icon}></FontAwesomeIcon>
            </div>
        </div>
    )
}
                    