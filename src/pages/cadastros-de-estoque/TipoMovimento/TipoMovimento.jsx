import styles from "./tipoMovimento.module.css"
import TopBar from "../../../components/TopBar/TopBar";
import Product from "../../../components/ProductItem/Product";
import IconButton from "../../../components/IconButton/IconButton";

export default function TipoMovimento(){
    let p = JSON.parse(sessionStorage.getItem("productBeingEdited"))

    return (<div>
        <TopBar title={"Tipo de movimento"} showBackArrow={true}/>
        <div className={styles.cabecalho}>
            <p>Você selecionou</p>
            <Product name={p.nome} addressImg={p.urlImagem} quantity={p.quantidade}/>
        </div>
        <div className={styles.principal}>
            <p>Qual tipo de movimento você deseja realizar?</p>
            <IconButton texto={"Entrada no estoque"} icone={"right-to-bracket"}/>
            <IconButton texto={"Redução no estoque"} icone={"right-from-bracket"}/>
        </div>
    </div>)
}