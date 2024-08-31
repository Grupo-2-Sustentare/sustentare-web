import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './toast.module.css';
import {toast} from "react-hot-toast";


export function Toast ({title, variant = "success"}){
    return (
    <div className={styles[variant]}>
      <span>{title}</span>
    </div>
  );
}

function renderToast(text, variant){
    let cssVariables = getComputedStyle(document.body)
    let white = cssVariables.getPropertyValue("--white")
    let gunmetal = cssVariables.getPropertyValue("--gunmetal")

    const TOAST_CONFIG = {
        className: styles[variant], iconTheme: {primary: white, secondary: gunmetal}
    }
    let component = <Toast title={text} variant={variant}/>

    switch (variant){
        case "success":
            toast.success(component, TOAST_CONFIG)
            break
        case "alert":
            toast(component, TOAST_CONFIG)
            break
        case "error":
            toast.error(component, TOAST_CONFIG)
            break
    }
}

export function successToast(text) {renderToast(text, "success")}
export function alertToast(text) {renderToast(text, "alert")}
export function errorToast(text) {renderToast(text, "error")}
