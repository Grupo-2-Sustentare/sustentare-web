import styles from './Checkbox.module.css';

export default function Checkbox({
        texto = "Texto da Checkbox",
        ticada = false
    }) {
    let textoTicada
    ticada ? textoTicada = "" : textoTicada = "checked"

    function ticarCheckbox(){

    }

    return(
        <>
            <label className={styles.containerCheckbox}>
                <input type="checkbox" checked={textoTicada}/>
                <span className={styles.control_indicator} >✓</span>
                {texto}
            </label>
        </>
    )
}