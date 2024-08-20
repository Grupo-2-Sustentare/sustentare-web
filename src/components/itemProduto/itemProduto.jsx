import React, { useState } from 'react';
import styles from './itemProduto.module.css';

export default function ItemCard({ imageUrl, title, weight, showButtons, checked }) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`${styles.itemCard} ${isChecked ? styles.checked : ''} ${showButtons ? styles.showButtons : ''}`}>
      <div className={styles.itemInfo}>
        <div className={styles.moldura}>
        <img src={imageUrl} alt={title} className={styles.image} />
        </div>
        <div>
         <span>{title}{weight}</span>
        </div>
        <div className={styles.checkbox} onClick={handleCheck}>
          {isChecked && <span>✔</span>}
        </div>
      </div>
      
      <div className={styles.itemActions}>
        {showButtons && (
          <div className={styles.buttons}>
            <button className={styles.editBtn}>✏️ Editar quantidade</button>
            <button className={styles.removeBtn}>🗑️ Remover</button>
          </div>
        )}
      </div>
    </div>
  );
}