import styles from "./RedirectionList.module.css";

export default function RedirectionList({
        titulo = "Escolha uma opção:",
        itens=["Adicione", "seus itens", "à lista"]
    }){
    return(
        <div className={styles.container}>
            <label>{titulo}</label>
            <input disabled={true}>Selecione...</input>
        </div>
    )
}