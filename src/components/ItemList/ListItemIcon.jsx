import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ListItem.module.css';

export default function ItemListaIcone({icon ,desc}) {
    return (
        <div className={styles.itemList}>
             <FontAwesomeIcon icon={icon} className={styles.icon}/>
            <div className={styles.text}>
                <span className={styles.text}>{desc}</span>
            </div>
        </div>
    );
}
