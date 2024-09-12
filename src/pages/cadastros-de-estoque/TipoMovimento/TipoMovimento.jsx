import styles from "./tipoMovimento.module.css"
import TopBar from "../../../components/TopBar/TopBar";
import Product from "../../../components/ProductItem/Product";
import IconButton from "../../../components/IconButton/IconButton";
import {useNavigate} from "react-router-dom";

export default function TipoMovimento(){
    const navigate = useNavigate()
    let p = JSON.parse(sessionStorage.getItem("productBeingEdited"))

    function selecionarQuantidade(saida){
        p.quantidade = saida ? -Math.abs(p.quantidade) : Math.abs(p.quantidade)
        sessionStorage.setItem("productBeingEdited", JSON.stringify(p))
        navigate("/quantidade-movimento")
    }

    return (<div>
        <TopBar title={"Tipo de movimento"} showBackArrow={true} backNavigationPath={"/cadastros-de-estoque"}/>
        <div className={styles.cabecalho}>
            <p>Você selecionou</p>
            <Product name={p.nome} addressImg={p.urlImagem} quantity={  `${p.quantidade} ${p.unidade}`}/>
        </div>
        <div className={styles.principal}>
            <p>Qual tipo de movimento você deseja realizar?</p>
            <IconButton
                texto={"Entrada no estoque"} icone={"right-to-bracket"}
                onClick={() => selecionarQuantidade(false)}
            />
            <IconButton
                texto={"Redução no estoque"} icone={"right-from-bracket"}
                onClick={() => selecionarQuantidade(true)}
            />
        </div>
    </div>)
}