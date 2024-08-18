import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './toast.module.css';

const ToastVariants = {
    success: styles.ToastSuccess,
    error: styles.ToastErro,
    alert: styles.ToastAlert
}

export default function Toast ({icon, title, variant = "success"}){
const variantClass = ToastVariants[variant] || ToastVariants.success;
    return (
    <div className={variantClass}>
      <FontAwesomeIcon icon={icon} className={styles.icon}/>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
