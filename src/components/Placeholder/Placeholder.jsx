import styles from './placeholder.module.css';

export default function Placeholder({onClick}) {
    return (<div className={styles.placeholder} onClick={onClick}>
        <p>Componente placeholder/temporário</p>
    </div>)
}