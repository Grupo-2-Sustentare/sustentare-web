import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './itemLista.module.css';

export default function ItemListaIcone({icon ,desc}) {
    return (
        <div className={styles.itemLista}>
             <FontAwesomeIcon icon={icon} className={styles.icone}/>
            <div className={styles.text}>
                <span className={styles.text}>{desc}</span>
            </div>
        </div>
    );
}
