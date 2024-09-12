import styles from "./quantidadeMovimento.module.css"
import TopBar from "../../../components/TopBar/TopBar";
import {useNavigate} from "react-router-dom";
import Product from "../../../components/ProductItem/Product";
import Switch from "../../../components/Switch/Switch";
import Button from "../../../components/Button/Button";
import RedirectionList from "../../../components/RedirectionList/RedirectionList";
import MeasurementUnitInput from "../../../components/MeasumentTextInput/MeasurementUnitInput";

export function QuantidadeMovimento(){
    const navigate = useNavigate()
    let p = JSON.parse(sessionStorage.getItem("productBeingEdited"))

    let ehSaida = p.quantidade < 0
    let acao = ehSaida ? "saiu do":"entrou no"

    function salvarEdicao(){
        navigate("/cadastros-de-estoque")
    }

    return(<div>
        <TopBar showBackArrow={true} title={"Quantidade de movimento"} backNavigationPath={"/tipo-movimento"}/>
        <div className={styles.cabecalho}>
            <p>Você selecionou</p>
            <Product name={p.nome} addressImg={p.urlImagem} quantity={  `${p.quantidade} ${p.unidade}`}/>
        </div>
        <div className={styles.principal}>
            <p>Quanto do produto {acao} estoque?</p>
            <MeasurementUnitInput measurementUnit={p.unidade} placeholder={0}/>
            {ehSaida &&
                (<RedirectionList
                    title={"Categoria do consumo"} hint={p.categoriaConsumo} redirectUrl={"/categoria-consumo"}
                />)
            }
            {!ehSaida &&
                (<>
                    <Switch label={"É ajuste de uma marcação anterior errada?"}/>
                    <Switch label={"Compra de última hora?"}/>
                </>)
            }
        </div>
        <div className={styles.containerBotao}>
            <Button insideText={"Confirmar definições"} onClick={salvarEdicao}/>
        </div>

    </div>)
}