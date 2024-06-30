import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./IconButton.module.css";

export default function IconButton() {
    return(
        <button className={styles.iconButton}>
            <FontAwesomeIcon icon={"question-circle"}/>
            Gerenciar estoque
        </button>
    )
}