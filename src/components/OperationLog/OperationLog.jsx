import React, {useState} from 'react';
import styles from './operationLog.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function OperationLog({ title, action, authorName, adressImg, time }) {
    function expandLog(){
        if (expanded){
            setClasses(styles.operationLog)
        } else {
            setClasses(styles.operationLog + " " + styles.expandedLog)
        }
        setExpanded(!expanded)
    }

    const [expanded, setExpanded] = useState(false)
    const [classes, setClasses] = useState(styles.operationLog)

    return (
        <div className={classes} onClick={()=>expandLog()}>
            <img src={adressImg} alt={`Foto de perfil de ${authorName}`} />
            <span className={styles.nameBubble}>
                {authorName}
                <FontAwesomeIcon icon={"caret-down"} className={styles.bubbleCaret}/>
            </span>
            <div>
                <h4 className={styles.title}>{title}</h4>
                <span className={styles.act}>{action}</span>
                <span className={styles.time}>{time}</span>
            </div>
        </div>
    );
}
