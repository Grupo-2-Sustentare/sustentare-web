import React, {useState} from 'react';
import styles from './ListItem.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ListItem(
        { heading, subheading, adressImg, descImg, icon, fullBorderRadius=false}
    ) {
    if (adressImg !== undefined && icon !== undefined){
        throw new Error("Tanto um ícone quanto uma imagem foram definidos para o mesmo ListItem")
    }

    let illustrationClass = ""
    // Deixando icon question quando não for
    icon === undefined ? icon = "question" : illustrationClass = styles.icon

    if (adressImg !== undefined){
        illustrationClass = styles.image
        illustrationClass += fullBorderRadius ? (" " + styles.lessRadius) : ""
    }
    illustrationClass += " " + styles.illustration

    // Adicionamos classe na sub-div se houver um subtítulo.
    let subheadingClass = (subheading === undefined)
        ? styles.itemInfo
        : styles.itemInfo + " " + styles.withSubheading

    return (
        <div className={styles.itemList}>
            <div className={illustrationClass}>
                <img src={adressImg} alt={descImg}/>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className={subheadingClass}>
                <h4>{heading}</h4>
                <h5>{subheading}</h5>
            </div>
        </div>
    );
}
