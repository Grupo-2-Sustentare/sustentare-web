import { useState } from "react";
import styles from "./RedirectionList.module.css";
import { useNavigate } from 'react-router-dom';

export default function RedirectionList({redirectUrl}) {
    const navigate = useNavigate();

    const handleClick = () => {
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


