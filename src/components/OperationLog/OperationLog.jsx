import React from 'react';
import styles from './OperationLog.module.css';

export default function ItemListaImg({ title, acao, adressImg, descImg,tempo }) {
    return (
        <div className={styles.itemLista}>
            <img src={adressImg} className={styles.img} alt={descImg} />
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                <span className={styles.acao}>{acao}</span>
                <span className={styles.tempo}>{tempo}</span>
            </div>
        </div>
    );
}
