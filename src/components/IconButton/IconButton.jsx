import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./IconButton.module.css";

export default function IconButton({icone = "question-circle", texto = "Clique Aqui", onClick}) {
    return(
        <button className={styles.iconButton} onClick={onClick}>
            <FontAwesomeIcon icon={icone}/>
            {texto}
        </button>
    )
}