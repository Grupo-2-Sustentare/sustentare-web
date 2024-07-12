import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './itemMenu.module.css';

const itemMenu = ({ icon = "question-circle", title = "Clique Aqui", onClick }) => {
  return (
    <div className={styles.itemMenu} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={styles.icon}/>
      <span className={styles.title}>{title}</span>
    </div>
  );
}

export default itemMenu;
