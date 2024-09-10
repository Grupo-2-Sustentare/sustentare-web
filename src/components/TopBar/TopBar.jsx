import React, { useState } from 'react';
import styles from './topBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideMenu from '../SideMenu/SideMenu';
import {useNavigate} from "react-router-dom";

export default function TopBar({ title, showBackArrow }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()


  const handleMenuClick = () => {
    if (!showBackArrow) {
      setMenuOpen(!isMenuOpen);
    } else {
      navigate(-1)
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

  const userName = sessionStorage.getItem("nome_usuario")
  const userImage = sessionStorage.getItem("icone_usuario")

  return (
    <>
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
          <SideMenu userName={userName} userImage={userImage} />
          <div className={styles.overlay} onClick={closeMenu}></div>
        </div>
      )}
      <div className={styles.bloco}>
      </div>
    </>
  );
}
