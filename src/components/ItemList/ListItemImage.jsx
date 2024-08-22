import React from 'react';
import styles from './ListItem.module.css';

export default function ItemListaImg({ title, desc, adressImg, descImg }) {
    return (
        <div className={styles.itemList}>
            <img src={adressImg} className={styles.img} alt={descImg} />
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                <span className={styles.desc}>{desc}</span>
            </div>
        </div>
    );
}
