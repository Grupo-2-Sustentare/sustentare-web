import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './toast.module.css';

export default function Toast ({icon, title}){
  return (
    <div className={styles.Toast}>
      <FontAwesomeIcon icon={icon} className={styles.icone}/>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
