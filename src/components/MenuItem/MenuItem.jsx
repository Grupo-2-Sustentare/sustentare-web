import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MenuItem.module.css';

export default function ItemMenu({icon, title})  {
  return (
    <div className={styles.MenuItem}>
      <FontAwesomeIcon icon={icon} className={styles.icon}/>
      <span className={styles.title}>{title}</span>
    </div>
  );
}

