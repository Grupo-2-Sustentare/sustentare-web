import { useState } from "react";
import styles from "./RedirectionList.module.css";
import { useNavigate } from 'react-router-dom';

export default function RedirectionList({redirectUrl}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (redirectUrl == undefined){
            alert("Defina uma URL para redirecionar!")
        }
        navigate(redirectUrl);
    };
    
    return (
        <div className={styles.container}>
            <select className={styles.button} onClick={handleClick}>
                <option value="">Selecione...</option>
            </select>
        </div>
    );
}


