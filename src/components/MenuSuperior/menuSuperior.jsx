import React, { useState } from 'react';
import styles from './menuSuperior.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuLateral from '../MenuLateral/menuLateral';

var userImage = "https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1";
var userName = "Antônio";

export default function MenuSuperior({ title, showBackArrow }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    if (!showBackArrow) {
      setMenuOpen(!isMenuOpen);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  let icon;

  if (showBackArrow) {
    icon = "fa-solid fa-arrow-left";
  } else {
    icon = "fa-solid fa-bars";
  }

  return (
    <div>
      <div className={styles.menuSuperior}>
        <div className={styles.iconDiv} onClick={handleMenuClick}>
          <FontAwesomeIcon className={styles.icon} icon={icon} />
        </div>
        <div className={styles.titleDiv}>
          <span className={styles.title}>{title}</span>
        </div>
      </div>
      {!showBackArrow && isMenuOpen && (
        <div>
          <MenuLateral class="duration-1" userName={userName} userImage={userImage} />
          <div className={styles.overlay} onClick={closeMenu}></div>
        </div>
      )}
    </div>
  );
}
