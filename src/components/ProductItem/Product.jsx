import React, {useState} from 'react';
import styles from './productItem.module.css';
import checkbox_styles from "../Checkbox/checkbox.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {alertToast} from "../Toast/Toast";

export const DEFAULT_BUTTON_CONFIG = {
    "yellow": {
        "style": {},
        "icon": "fa-solid fa-pen",
        "text": "Editar quantidade",
        "action": () => alertToast("Defina uma ação para esse botão.")
    },
    "red": {
        "style": {},
        "icon": "fa-solid fa-trash",
        "text": "Remover",
        "action": () => alertToast("Defina uma ação para esse botão.")
    }
}
export default function Product(
    {
        addressImg, name, quantity, checkboxVariant = false, checkedByDefault = false,
        buttonsConfig = undefined, fullBorderRadius=false
    }
    ) {
    // Inicializando o parâmetro que customiza os botões.
    // Para usar, respeite o schema abaixo:
    if (buttonsConfig === undefined){
        buttonsConfig = DEFAULT_BUTTON_CONFIG
    }

    // Imagem padrão quando nenhuma foi definida.
    if (addressImg === undefined){
        addressImg = "https://placehold.co/400/F5FBEF/22333B?text=Produto"
    }

    let [checked, setChecked] = useState(checkedByDefault);
    let [expanded, setExpanded] = useState(false);

    const handleClick = (e) => {
      if (checkboxVariant){
        setChecked(!checked)
      } else {
        setExpanded(!expanded)
      }
    }

    return (
      <div className={styles.product}>
        <div className={styles.mainInfo} onClick={handleClick}>
          <img src={addressImg} alt={"Ícone do produto"} className={fullBorderRadius ? styles.profileImage:""}/>

          <span className={styles.info}>
            <h4>{name}</h4>
            <h5>{quantity}</h5>
          </span>

          {checkboxVariant && (
              <span className={checkbox_styles.checkbox} onClick={() => handleClick()}>
                <FontAwesomeIcon icon="fa-solid fa-check" style={{opacity: checked ? 1:0}}/>
              </span>
          )}
        </div>

          {expanded && (
              <div className={styles.buttons}>
                  <button
                      className={styles.editBtn} id='botaoEdt' onClick={buttonsConfig.yellow.action}
                      style={buttonsConfig.yellow.style}
                  >
                      <FontAwesomeIcon className={styles.icon} icon={buttonsConfig.yellow.icon}/>
                      {buttonsConfig.yellow.text}
                  </button>
                  <button
                      className={styles.removeBtn} id='botaoRemove' onClick={buttonsConfig.red.action}
                      style={buttonsConfig.red.style}
                  >
                      <FontAwesomeIcon className={styles.icon} icon={buttonsConfig.red.icon}/>
                      {buttonsConfig.red.text}
                  </button>
          </div>
        )}
      </div>
    );
}
