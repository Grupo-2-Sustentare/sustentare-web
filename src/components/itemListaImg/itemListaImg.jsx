import React from 'react';
import styles from './itemListaImg.module.css';

export default function ItemListaImg({ title, desc, adressImg}) {
    return (
        <div className={styles.itemListaImg}>
            <img src={adressImg} className={styles.img} alt={title} />
            <div className={styles.text}>
            <span className={styles.title}>{title}</span>
            <span className={styles.desc}>{desc}</span>
            </div>
        </div>
    );
}
