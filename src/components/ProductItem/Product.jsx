import React, { useState } from 'react';
import styles from './productItem.module.css';
import checkbox_styles from "../Checkbox/checkbox.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { alertToast } from "../Toast/Toast";

export const DEFAULT_BUTTON_CONFIG = {
  yellow: {
    style: {},
    icon: "fa-solid fa-pen",
    iconFillInvert: false,
    text: "Editar",
    action: () => alertToast("Defina uma ação para esse botão.")
  },
  red: {
    style: {},
    icon: "fa-solid fa-trash",
    iconFillInvert: false,
    text: "Remover",
    action: () => alertToast("Defina uma ação para esse botão."),
  }
};
export default function Product(
  {
    addressImg, icon, name, quantity, checkboxVariant = false, checkedByDefault = false,
    buttonsConfig = undefined, fullBorderRadius = false, showImageOrIcon = true, infoUsuario
  }
) {
  // Inicializando o parâmetro que customiza os botões.
  // Para usar, respeite o schema abaixo:
  if (buttonsConfig === undefined) {
    buttonsConfig = DEFAULT_BUTTON_CONFIG
  }

  const noImageOrIcon = !showImageOrIcon;

  if (!showImageOrIcon) {
    addressImg = null;  // Deixa ambos como null ou undefined para não exibir nada
    icon = null;
  } else if (showImageOrIcon && addressImg === undefined) {
    // Imagem padrão quando somente addressImg é indefinido
    addressImg = "https://placehold.co/400/F5FBEF/22333B?text=Produto";
  }

  let [checked, setChecked] = useState(checkedByDefault);
  let [expanded, setExpanded] = useState(false);

  const handleClick = (e) => {
    if (checkboxVariant) {
      setChecked(!checked)
    } else {
      setExpanded(!expanded)
    }
  }


  // Define imagem padrão ou ícone padrão
  if (icon === undefined) {
    icon = "fa-solid fa-question";
  }

  if (addressImg === undefined) {
    addressImg = "https://placehold.co/400/F5FBEF/22333B?text=Produto";
  }

  return (
    <div className={`${styles.product} ${noImageOrIcon ? styles.noImageOrIcon : ""}`}>
      <div className={styles.mainInfo} onClick={handleClick}>
        {addressImg ? (
            <img src={addressImg} alt={"Ícone do produto"} className={fullBorderRadius ? styles.profileImage : ""} />
        ) : icon ? (
            // Renderiza o ícone somente se 'icon' não for null
            <FontAwesomeIcon icon={icon} className={styles.icon} />
        ) : null}  {/* Se 'icon' for null, não renderiza nada */}

        <span className={styles.info}>
          <h4>{name}</h4>
          <h5>{quantity}</h5>
        </span>

        {checkboxVariant && (
          <span className={checkbox_styles.checkbox} onClick={() => handleClick()}>
            <FontAwesomeIcon icon="fa-solid fa-check" style={{ opacity: checked ? 1 : 0 }} />
          </span>
        )}
      </div>

      {expanded && (
        <div className={styles.buttons}>
          <button
            className={styles.editBtn} id='botaoEdt' onClick={() => buttonsConfig.yellow.action(infoUsuario)}
            style={buttonsConfig.yellow.style}
          >

            <FontAwesomeIcon
              // Aplica a classe de ícone e, se for para inverter a cor para branco, aplica essa classe
              // também.
              className={styles.icon + " " + (buttonsConfig.yellow.iconFillInvert ? styles.inverse : "")}
              icon={buttonsConfig.yellow.icon}
            />
            {buttonsConfig.yellow.text}
          </button>
          <button
            className={styles.removeBtn} id='botaoRemove'
            onClick={() => buttonsConfig.red.action(infoUsuario)}
            style={buttonsConfig.red.style}
          >
            <FontAwesomeIcon
              className={styles.icon + " " + (buttonsConfig.red.iconFillInvert ? styles.inverse : "")}
              icon={buttonsConfig.red.icon}
            />
            {buttonsConfig.red.text}
          </button>

        </div>
      )}
    </div>
  );
}
