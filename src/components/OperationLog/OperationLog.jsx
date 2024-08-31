import React, {useState} from 'react';
import styles from './operationLog.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function OperationLog({ title, action, adressImg, descImg,time }) {
    function expandLog(){
        if (expanded){
            setClasses(styles.operationLog)
        } else {
            setClasses(styles.operationLog + " " + styles.expandedLog)
        }
            expanded = !expanded
    }

    let expanded = false
    const [classes, setClasses] = useState(styles.operationLog)

    return (
        <div className={classes} onClick={()=>expandLog()}>
            <img src={adressImg} alt={descImg} />
            <span className={styles.nameBubble}>Fulano</span>
            <FontAwesomeIcon icon={"caret-down"} className={styles.bubbleCaret}/>
            <div>
                <h4 className={styles.title}>{title}</h4>
                <span className={styles.act}>{action}</span>
                <span className={styles.time}>{time}</span>
            </div>
        </div>
    );
}
