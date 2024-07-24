import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MenuSuperior.module.css';

export default function MenuSuperior ({icon, title}){
  return (
    <div className={styles.MenuSuperior}>
      <FontAwesomeIcon icon={icon} className={styles.icone}/>
      <span className={styles.title}>{title}</span>
      <span></span>
    </div>
  );
}
