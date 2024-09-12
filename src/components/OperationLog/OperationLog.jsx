import React, {useState} from 'react';
import styles from './operationLog.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function OperationLog({ title, operation, author, time, adressImg }) {
    function expandLog(){
        if (expanded){
            setClasses(styles.operationLog)
        } else {
            setClasses(styles.operationLog + " " + styles.expandedLog)
        }
        setExpanded(!expanded)
    }

    if (adressImg === undefined){
        adressImg = "https://placehold.co/400/F5FBEF/22333B?text=" + title
    }

    const [expanded, setExpanded] = useState(false)
    const [classes, setClasses] = useState(styles.operationLog)

    return (
        <div className={classes} onClick={()=>expandLog()}>
            <img src={adressImg} alt={`Foto de perfil de ${author}`} />
            <span className={styles.nameBubble}>
                {author}
                <FontAwesomeIcon icon={"caret-down"} className={styles.bubbleCaret}/>
            </span>
            <div>
                <h4 className={styles.title}>{title}</h4>
                <span className={styles.act}>{operation}</span>
                <span className={styles.time}>{time}</span>
            </div>
        </div>
    );
}
