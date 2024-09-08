import styles from "./StrechList.module.css";

export default function StrechList({
        title = "Escolha uma opção:",
        showTitle = true,
        hint = "Selecione...",
        items = ["Adicione", "seus itens", "à lista"]
    }){
    return(
        <div className={styles.container}>
            {showTitle && (<label>{title}</label>)}
            <select defaultValue={"hint"}>
                {/* Opção placeholder padrão e não-selecionável */}
                <option value={"hint"} disabled={true}>{hint}</option>
                {items.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
        </div>
    )
}