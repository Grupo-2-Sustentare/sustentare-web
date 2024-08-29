import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MenuItem.module.css';

export default function MenuItem({icon, title, onClick})  {
  return (
    <div className={styles.MenuItem} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={styles.icon}/>
      <span className={styles.title}>{title}</span>
    </div>
  );
}

