import React, { useEffect, useState } from 'react';
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

const STORAGE_KEY = "productCheckedStates";

export default function Product(
  {
    id, // Adicionando id aqui
    addressImg,
    icon,
    name,
    quantity,
    checkboxVariant = false,
    checkedByDefault = false,
    buttonsConfig = undefined,
    fullBorderRadius = false,
    showImageOrIcon = true,
    infoUsuario,
    onChange
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

  // const handleClick = (e) => {
  //   if (checkboxVariant) {
  //     setChecked(!checked)
  //   } else {
  //     setExpanded(!expanded)
  //   }
  // }
  // Recupera o array de produtos selecionados do sessionStorage
    // Recupera o estado de checked do sessionStorage
    useEffect(() => {
      const savedCheckedStates = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
      const productState = savedCheckedStates.find(item => item.id === id);
      if (productState) {
        setChecked(productState.checked);
      }
    }, [id]); // Alterado para escutar mudanças de id
  
    const handleClick = (e) => {
      if (checkboxVariant) {
        setChecked((prevChecked) => {
          const newChecked = !prevChecked;
          console.log(`Produto: ${name}, Checked: ${newChecked}, ID: ${id}`);
  
          // Atualiza o estado no sessionStorage
          const savedCheckedStates = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
          let updatedCheckedStates;
  
          if (newChecked) {
            // Adiciona ou atualiza o produto no sessionStorage
            updatedCheckedStates = savedCheckedStates.filter(item => item.id !== id);
            updatedCheckedStates.push({ id, name, checked: newChecked });
          } else {
            // Remove o produto se estiver desmarcado
            updatedCheckedStates = savedCheckedStates.filter(item => item.id !== id);
          }
  
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCheckedStates));
  
          // Chama a função de callback, se fornecida
          onChange && onChange();
          return newChecked;
        });
      } else {
        setExpanded((prev) => !prev);
      }
    };


  // const handleClick = (e) => {
  //   if (checkboxVariant) {
  //     setChecked((prev) => !prev);
  //     console.log(`Produto: ${name}, Checked: ${checked}`)
  //     onChange && onChange(); // Apenas chama onChange se existir
  //   } else {
  //     setExpanded((prev) => !prev);
  //   }
  // };


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
          <img src={addressImg} alt={"imagem"} className={fullBorderRadius ? styles.profileImage : ""} />
        ) : icon ? (
          // Renderiza o ícone somente se 'icon' não for null
          <FontAwesomeIcon icon={icon} className={styles.icon} />
        ) : null}  {/* Se 'icon' for null, não renderiza nada */}

        <span className={styles.info}>
          <h4>{name}</h4>
          <h5>{quantity}</h5>
        </span>

        {checkboxVariant && (
          <span className={checkbox_styles.checkbox} onClick={(e) => { e.stopPropagation(); handleClick(e); }}>
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
