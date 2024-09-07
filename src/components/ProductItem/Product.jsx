import React, {useState} from 'react';
import styles from './productItem.module.css';
import checkbox_styles from "../Checkbox/checkbox.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {alertToast} from "../Toast/Toast";


export default function Product(
    {
        addressImg, name, quantity, checkboxVariant = false, checkedByDefault = false,
        buttonsConfig = undefined
    }
    ) {
    // Inicializando o parâmetro que customiza os botões.
    // Para usar, respeite o schema abaixo:
    if (buttonsConfig === undefined){
        buttonsConfig = {
            "yellow": {
                "icon": "fa-solid fa-pen",
                "text": "Editar quantidade",
                "action": () => alertToast("Defina uma ação para esse botão.")
            },
            "red": {
                "icon": "fa-solid fa-trash",
                "text": "Remover",
                "action": () => alertToast("Defina uma ação para esse botão.")
            }
        }
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
          <img src={addressImg} alt={name} />

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
                  <button className={styles.editBtn} id='botaoEdt' onClick={buttonsConfig.yellow.action}>
                      <FontAwesomeIcon className={styles.icon} icon={buttonsConfig.yellow.icon}/>
                      {buttonsConfig.yellow.text}
                  </button>
                  <button className={styles.removeBtn} id='botaoRemove' onClick={buttonsConfig.red.action}>
                      <FontAwesomeIcon className={styles.icon} icon={buttonsConfig.red.icon}/>
                      {buttonsConfig.red.text}
                  </button>
          </div>
        )}
      </div>
    );
}
