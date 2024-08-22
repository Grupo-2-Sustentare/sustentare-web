import styles from "./StrechList.module.css";

export default function StrechList({
        titulo = "Escolha uma opção:",
        itens=["Adicione", "seus itens", "à lista"]
    }){
    return(
        <div className={styles.container}>
            <label>{titulo}</label>
            <select defaultValue={null}>
                {/* Opção placeholder padrão e não-selecionável */}
                <option value={null} disabled={true}>
                    Selecione...
                </option>
                {itens.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
        </div>
    )
}