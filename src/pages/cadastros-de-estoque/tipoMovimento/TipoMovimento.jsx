import styles from "./tipoMovimento.module.css"
import TopBar from "../../../components/TopBar/TopBar";
import Product from "../../../components/ProductItem/Product";
import IconButton from "../../../components/IconButton/IconButton";
import {useNavigate} from "react-router-dom";
import ListItem from "../../../components/ListItem/ListItem";

export default function TipoMovimento(){
    const navigate = useNavigate()
    let p = JSON.parse(sessionStorage.getItem("productBeingEdited"))

    function selecionarQuantidade(saida){
        p.quantidade = saida ? -1 : 1
        sessionStorage.setItem("productBeingEdited", JSON.stringify(p))
        navigate("/quantidade-movimento")
    }

    return (<div>
        <TopBar title={"Tipo de movimento"} showBackArrow={true} backNavigationPath={"/cadastros-de-estoque"}/>
        <div className={styles.cabecalho}>
            <p>Você selecionou</p>
            <ListItem adressImg={"https://placehold.co/400/F5FBEF/22333B?text=Produto"} heading={p.nome} subheading={  `${p.quantidade} ${p.unidade}`}  fullBorderRadius={true}/>
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