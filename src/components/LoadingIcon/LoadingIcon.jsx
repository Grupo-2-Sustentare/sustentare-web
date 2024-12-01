import styles from './loadingIcon.module.css'
import loading from '../../assets/images/loading.svg'

export default function LoadingIcon({carregando=true}){

    return (<div className={styles.containerLoading}>
        {
            carregando &&
            (<img src={loading} alt={"Carregando..."}/>)
        }
    </div>)
}