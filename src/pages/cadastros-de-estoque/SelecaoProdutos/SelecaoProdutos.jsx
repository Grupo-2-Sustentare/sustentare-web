import styles from "./selecaoProdutos.module.css"
import IconInput from "../../../components/IconInput/IconInput";
import StrechList from "../../../components/StrechList/StrechList";
import Product from "../../../components/ProductItem/Product";
import TopBar from "../../../components/TopBar/TopBar";
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";

const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"
const OPCOES_ORDENACAO = ["Alfabética - Crescente", "Alfabética - Decrescente"]

export default function SelecaoProdutos(){
    const navigate = useNavigate()

    // Mock, para testes
    let produtos = [
        {id: 0, "urlImagem": MOCK_URL + "sobrecoxa.jpg", "nome": "Sobrecoxa", "quantidade": "12 kilogramas"},
        {id: 1, "urlImagem": MOCK_URL + "coca300.jpeg", "nome": "Coca 300", "quantidade": "32 unidades"},
        {id: 2, "urlImagem": undefined, "nome": "Guaraná Jesus", "quantidade": "75 unidades"},
        {id: 3, "urlImagem": MOCK_URL + "feijão.png", "nome": "Feijão", "quantidade": "4 sacos"},
    ]

    return(<div className={styles.selecaoProdutos}>
        <TopBar title={"Seleção de Produtos"} showBackArrow={true}/>
        <div className={styles.barraDeBusca}>
            <IconInput />
            <StrechList showTitle={false} items={OPCOES_ORDENACAO} hint={"Opções de ordenação"}/>
        </div>
        <div className={styles.containerProdutos}>
            {produtos.map((p) => {
                return <Product
                    key={p.id} addressImg={p.urlImagem} name={p.nome} quantity={p.quantidade} checkboxVariant={true}
                />
            })}
        </div>
        <div className={styles.containerBotao}>
            <Button insideText={"Confirmar seleção"} onClick={() => navigate("../cadastros-de-estoque")}/>
        </div>
    </div>)
}