import styles from './loadingIcon.module.css'
import loading from '../../assets/images/loading.svg'
import {useEffect, useState} from "react";

export default function LoadingIcon({carregando=true}){
    const [classe, setClasse] = useState(styles.containerLoading)
    useEffect(() => {
        if (carregando){
            setClasse(`${styles.containerLoading} ${styles.abrir}`)
        } else {
            setClasse(styles.containerLoading)
        }
    }, [carregando]);

    return (
        <div className={classe}>
        {
            carregando &&
            (<img src={loading} alt={"Carregando..."}/>)
        }
        </div>
    )
}