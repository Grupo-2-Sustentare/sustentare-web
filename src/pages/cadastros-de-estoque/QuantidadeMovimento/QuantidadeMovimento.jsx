import styles from "./quantidadeMovimento.module.css"
import TopBar from "../../../components/TopBar/TopBar";
import {useNavigate} from "react-router-dom";
import Product from "../../../components/ProductItem/Product";
import MeasurementUnitInput from "../../../components/MeasumentTextInput/MeasurementUnitInput";
import Switch from "../../../components/Switch/Switch";
import Button from "../../../components/Button/Button";

export function QuantidadeMovimento(){
    const navigate = useNavigate()
    let p = JSON.parse(sessionStorage.getItem("productBeingEdited"))

    return(<div>
        <TopBar showBackArrow={true} title={"Quantidade de movimento"}/>
        <div className={styles.cabecalho}>
            <p>Você selecionou</p>
            <Product name={p.nome} addressImg={p.urlImagem} quantity={  `${p.quantidade} ${p.unidade}`}/>
        </div>
        <div className={styles.principal}>
            <p>Quanto do produto entrou em estoque?</p>
            <MeasurementUnitInput measurementUnit={p.unidade}/>
            <Switch label={"É ajuste de uma marcação anterior errada?"}/>
            <Switch label={"Compra de última hora?"}/>
        </div>
        <div className={styles.containerBotao}>
            <Button insideText={"Confirmar definições"}/>
        </div>

    </div>)
}