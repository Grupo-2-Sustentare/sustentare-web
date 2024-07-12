import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './toast.module.css';

const ToastSucesso = ({icon, title}) => {
  return (
    <div className={styles.Toast}>
      <FontAwesomeIcon icon={icon} className={styles.icon}/>
      <span className={styles.title}>{title}</span>
    </div>
  );
}

export default ToastSucesso;
