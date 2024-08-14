import React from 'react';
import styles from './itemLista.module.css';

export default function ItemLista({desc}) {
    return (
        <div className={styles.itemLista}>
            <div className={styles.text}>
                <span className={styles.text}>{desc}</span>
            </div>
        </div>
    );
}
