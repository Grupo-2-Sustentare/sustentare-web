import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './menuSuperior.module.css';

export default function MenuSuperior ({title}) {
  return (
    <div className={styles.menuSuperior}>
      <div className={styles.iconDiv}>
      <FontAwesomeIcon icon={faBars} className={styles.icon} />
      </div>
      <div className={styles.titleDiv}>
      <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
};