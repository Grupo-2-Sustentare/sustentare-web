import React from 'react';
import styles from './ListItem.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ListItem({ heading, subheading, adressImg, descImg, icon}) {
    return (
        <div className={styles.itemList}>
            <img src={adressImg} alt={descImg} />
            <FontAwesomeIcon icon={icon} />
            <div>
                <h4>{heading}</h4>
                <h5>{subheading}</h5>
            </div>
        </div>
    );
}
