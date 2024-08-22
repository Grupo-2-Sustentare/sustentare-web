import React from 'react';
import styles from './menuSuperior.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MenuSuperior ({title}) {
  return (
    <div className={styles.menuSuperior}>
      <div className={styles.iconDiv}>
      <FontAwesomeIcon icon="fa-solid fa-arrow-left" className={styles.icon}  />
      {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" className={styles.icon}  /> */}
      </div>
      <div className={styles.titleDiv}>
      <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
};