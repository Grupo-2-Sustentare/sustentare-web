import React, { useState } from 'react';
import styles from './productItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from "../Checkbox/Checkbox.jsx";

export default function ProductItem({ imageUrl, title, weight, showButtons = false, checked = false, showCheckbox = true }) {
  const [isChecked, setIsChecked] = useState(checked);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheck = (e) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
  };

  const toggleExpand = () => {
    if (!showCheckbox) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div 
      className={`${styles.itemCard} ${isChecked ? styles.checked : ''} ${isExpanded ? styles.expanded : ''}`} 
      onClick={toggleExpand}
    >
      <div className={styles.itemInfo}>
        <div className={styles.moldura}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </div>

        <div className={styles.textProductItem}>
          <span className={styles.text1}>{title}</span>
          <span className={styles.text2}>{weight}</span>
        </div>

        {showCheckbox && (
          <div className={styles.divCheckbox} onClick={handleCheck}>
            <Checkbox checked={isChecked} />
          </div>
        )}

        {!showCheckbox && (
          <div className={styles.divExtensao}>
          </div>
        )}
      </div>
      
      {isExpanded && (
        <div className={styles.buttons}>
          <button className={styles.editBtn} id='botaoEdt'>
            <FontAwesomeIcon className={styles.icon} icon="fa-solid fa-pen"/> Editar quantidade
          </button>
          <button className={styles.removeBtn} id='botaoRemove'>
            <FontAwesomeIcon className={styles.icon} icon="fa-solid fa-trash"/> Remover
          </button>
        </div>
      )}
    </div>
  );
}
