import React from 'react';
import styles from './menuSuperior.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MenuSuperior ({title}) {
  return (
    <div className={styles.menuSuperior}>
      <div className={styles.iconDiv}>
      {/* <FontAwesomeIcon className={styles.icon} icon="fa-solid fa-arrow-left"/> */}
      <FontAwesomeIcon className={styles.icon} icon="fa-solid fa-bars"/>
      </div>
      <div className={styles.titleDiv}>
      <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
};