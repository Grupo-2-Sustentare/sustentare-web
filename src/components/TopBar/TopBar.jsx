import React, {useEffect, useState} from 'react';
import styles from './topBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideMenu from '../SideMenu/SideMenu';
import {useNavigate} from "react-router-dom";
import {alertToast} from "../Toast/Toast";

export default function TopBar({ title, showBackArrow, backNavigationPath }) {
  const navigate = useNavigate()
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [imagem, setImagem] = useState("");

  let icon;
  let onClickHandler;

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

  if (showBackArrow) {
    icon = "fa-solid fa-arrow-left";
    onClickHandler = handleBackArrowClick;
  } else {
    icon = "fa-solid fa-bars";
    onClickHandler = handleMenuClick;
  }

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const pegarImg = (nome)=>{
    if (nome === null) return
    let img = "https://placehold.co/400/F5FBEF/22333B?text="
    return img + nome.substring(0, 1)
  }

  useEffect(() => {
    const userName = sessionStorage.getItem("nome_usuario")
    setNomeUsuario(userName)

    if (userName === null || userName === "null") {
      alertToast("Sessão expirada.")
      navigate("/")
    }

    const sessionStorageImg = sessionStorage.getItem("imagem_responsavel")
    if (sessionStorageImg === null || sessionStorageImg === undefined || sessionStorageImg === "null") {
      setImagem(pegarImg(userName))
    } else {
      setImagem("data:image/jpeg;base64," + sessionStorageImg)
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
          <SideMenu userName={nomeUsuario} userImage={imagem} />
          <div className={styles.overlay} onClick={closeMenu}></div>
        </div>
      )}
      <div className={styles.bloco}>
      </div>
    </>
  );
}