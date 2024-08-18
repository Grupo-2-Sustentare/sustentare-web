import React from 'react';
import styles from './OperationLog.module.css';

export default function ItemListaImg({ title, action, adressImg, descImg,time }) {
    return (
        <div className={styles.itemList}>
            <img src={adressImg} className={styles.img} alt={descImg} />
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                <span className={styles.act}>{action}</span>
                <span className={styles.time}>{time}</span>
            </div>
        </div>
    );
}
