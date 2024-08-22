import styles from "./RedirectionList.module.css";
import { useNavigate } from 'react-router-dom';

export default function RedirectionList({

}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/outra-pagina');
    };
    
    return (
        <select className={styles.button} onClick={handleClick}>
            <option value="">Selecione...</option>
        </select>
    );
}


