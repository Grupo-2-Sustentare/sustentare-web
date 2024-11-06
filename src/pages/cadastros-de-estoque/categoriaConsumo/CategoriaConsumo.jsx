import styles from "./categoriaConsumo.module.css"
import TopBar from "../../../components/TopBar/TopBar";
import Product from "../../../components/ProductItem/Product";
import {useNavigate} from "react-router-dom";
import MeasurementUnitInput from "../../../components/MeasumentTextInput/MeasurementUnitInput";
import Switch from "../../../components/Switch/Switch";
import RedirectionList from "../../../components/RedirectionList/RedirectionList";
import ListItem from "../../../components/ListItem/ListItem";

export default function CategoriaConsumo(){
    const navigate = useNavigate()
    let p = JSON.parse(sessionStorage.getItem("productBeingEdited"))

    const itensLista = [
        "Uso no buffet ou vendas individuais (regular)", "Ajuste por marcação anterior errada",
        "Passou do prazo de validade", "Foi contaminado ou extraviado", "Não se sabe o paradeiro"
    ]

    function marcarCategoria(c){
        p.categoriaConsumo = c
        sessionStorage.setItem("productBeingEdited", JSON.stringify(p))
        navigate("/quantidade-movimento")
    }

    return(<>
        <TopBar title={"Categoria do consumo"} showBackArrow={true} backNavigationPath={"/quantidade-movimento"}/>
        <div className={styles.cabecalho}>
            <p>Você selecionou</p>
            {/* <Product name={p.nome} addressImg={p.urlImagem} quantity={`${p.quantidade} ${p.unidade}`}/> */}
            <ListItem adressImg={"https://placehold.co/400/F5FBEF/22333B?text=Produto"} heading={p.item.nome} subheading={`${p.quantidadeMovimento} ${p.item.unidade_medida.nome}`}  fullBorderRadius={true}/>
        </div>
        <div className={styles.principal}>
            {itensLista.map(item=>{
                return <ListItem heading={item} key={item} onClick={()=>marcarCategoria(item)}/>
            })}
        </div>
    </>)
}