import React, {useEffect, useState} from 'react';
import styles from './topBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideMenu from '../SideMenu/SideMenu';
import {useNavigate} from "react-router-dom";
import {alertToast} from "../Toast/Toast";

export default function TopBar({ title, showBackArrow, backNavigationPath }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const [imagem, setImagem] = useState("");

  const handleMenuClick = () => {
    if (!showBackArrow) {
      setMenuOpen(!isMenuOpen);
    }
  };

  const handleBackArrowClick = () => {
    if (showBackArrow && backNavigationPath) {
      // Navega para a rota específica passada pela prop `backNavigationPath`
      navigate(backNavigationPath);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  let icon;
  let onClickHandler;

  if (showBackArrow) {
    icon = "fa-solid fa-arrow-left";
    onClickHandler = handleBackArrowClick;
  } else {
    icon = "fa-solid fa-bars";
    onClickHandler = handleMenuClick;
  }

  const userName = sessionStorage.getItem("nome_usuario")
  const pegarImg = (nome)=>{
    let img = "https://placehold.co/400/F5FBEF/22333B?text="
    return img + nome.substring(0, 1)
  }
  const [userImage, setUserImagem] = useState(pegarImg(userName))

  useEffect(() => {
    if (userName === null) {
      alertToast("Sessão expirada.")
      navigate("/")
    }
    const sessionStorageImg = sessionStorage.getItem("icone_usuario")
    if (sessionStorageImg !== null && sessionStorageImg !== undefined && sessionStorageImg !== "null") {
      setUserImagem(sessionStorageImg)
    }

    const responsavelString = sessionStorage.getItem('imagem_responsavel');
    if (responsavelString) {
      setImagem(responsavelString)
    }else{
      
    }
  }, []);

  return (
    <>
      <div className={styles.menuSuperior}>
        <div className={styles.iconDiv} onClick={onClickHandler}>
          <FontAwesomeIcon className={styles.icon} icon={icon} />
        </div>
        <div className={styles.titleDiv}>
          <span className={styles.title}>{title}</span>
        </div>
      </div>
      {!showBackArrow && isMenuOpen && (
        <div>
          <SideMenu userName={userName} userImage={imagem ? `data:image/jpeg;base64,${imagem}` : userImage} />
          <div className={styles.overlay} onClick={closeMenu}></div>
        </div>
      )}
      <div className={styles.bloco}>
      </div>
    </>
  );
}