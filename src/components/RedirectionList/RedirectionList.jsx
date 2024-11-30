import { useState } from "react";
import styles from "./RedirectionList.module.css";
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function RedirectionList({title=undefined, redirectUrl, hint="Selecione..."}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (redirectUrl === undefined){
            throw new Error("A RedirecionList criada não tem uma URL de destino definida!")
        }
        navigate(redirectUrl);
    };
    
    return (
        <div className={styles.container}>
            {(title !== undefined) && (<label>{title}</label>)}
            <span onClick={handleClick}>
                {hint}
                <FontAwesomeIcon icon={"chevron-down"}/>
            </span>
        </div>
    );
}


