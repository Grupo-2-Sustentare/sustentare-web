import styles from "./checkbox.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

export default function Checkbox({
        ticadaPorPadrao = false,
        onChange
    }) {
    const [visibilidade, setVisibilidade] = useState(
        ticadaPorPadrao ? 1 : 0
    )

    function ticarCheckbox(){
        // if (visibilidade === 1){
        //     setVisibilidade(0)
        //     console.log("nao esta ticada")
        // } else {
        //     setVisibilidade(1)
        //     console.log("esta ticada")
        // }
        const novoValor = visibilidade === 1 ? 0 : 1;
        setVisibilidade(novoValor);
        onChange && onChange(novoValor);
    }

    return(
        <>
            <span className={styles.checkbox} onClick={()=>ticarCheckbox()}>
                <FontAwesomeIcon icon="fa-solid fa-check" style={{opacity: visibilidade}}/>
            </span>
        </>
    )
}
