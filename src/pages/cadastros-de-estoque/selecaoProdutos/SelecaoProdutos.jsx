import styles from "./selecaoProdutos.module.css"
import IconInput from "../../../components/IconInput/IconInput";
import StrechList from "../../../components/StrechList/StrechList";
import Product from "../../../components/ProductItem/Product";
import TopBar from "../../../components/TopBar/TopBar";
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";

const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"
const OPCOES_ORDENACAO = ["Alfabética - Crescente", "Alfabética - Decrescente"]

export default function SelecaoProdutos(){
    // Mock, para testes
    const mock_produtos = [
        {"urlImagem": MOCK_URL + "sobrecoxa.jpg", "nome": "Sobrecoxa", "quantidade": 12, "unidade": "kilogramas"},
        {"urlImagem": MOCK_URL + "coca300.jpeg", "nome": "Coca 300", "quantidade": 32, "unidade": "unidades"},
        {"urlImagem": undefined, "nome": "Guaraná Jesus", "quantidade": 75, "unidade": "unidades"},
        {"urlImagem": MOCK_URL + "feijão.png", "nome": "Feijão", "quantidade": 4, "unidade": "sacos"}
    ]

    const navigate = useNavigate()
    const [produtos,setProdutos] = useState(mock_produtos)

    function buscarProdutos(e){
        let query = e.target.value.toUpperCase()

        if (query.empty){
            setProdutos(mock_produtos)
            return
        }

        let produtosFiltrados = []
        for (let i in mock_produtos){
            if (mock_produtos[i].nome.toUpperCase().indexOf(query) !== -1){
                produtosFiltrados.push(mock_produtos[i])
            }
        }
        setProdutos(produtosFiltrados)
    }

    function ordenar(){
        let produtosOrdenados = produtos
        produtosOrdenados.sort() // TODO Não funciona - arrumar
        setProdutos(produtosOrdenados)
    }

    function adicionarProdutos(){
        // Colocar toast de alerta caso nenhum produto tenha sido selecionado.

        let movement = JSON.parse(sessionStorage.getItem("movement"))

        if (movement.products.length === 0){
            movement.products.push(
                {"urlImagem": MOCK_URL + "sobrecoxa.jpg", "nome": "Sobrecoxa", "quantidade": 1, "unidade": "kilograma"},
                {"urlImagem": MOCK_URL + "coca300.jpeg", "nome": "Coca 300", "quantidade": 1, "unidade": "unidade"},
                {"urlImagem": undefined, "nome": "Guaraná Jesus", "quantidade": 1, "unidade": "unidade"}
            )
        }

        sessionStorage.setItem("movement", JSON.stringify(movement))
        navigate("/cadastros-de-estoque")
    }

    return(
    <>
        <TopBar title={"Seleção de Produtos"} showBackArrow={true} backNavigationPath={"/cadastros-de-estoque"}/>
        <div className={styles.divPrincipal}>
            <div className={styles.barraDeBusca}>
                <IconInput onChange={buscarProdutos} placeholder={"Pesquisa por nome"}/>
                <StrechList
                    showTitle={false} items={OPCOES_ORDENACAO} hint={"Opções de ordenação"}
                    onChange={ordenar}
                />
            </div>
            {/* <div className={styles.containerProdutos}> */}
            <hr></hr>
            {produtos.map((p,i) => {
                    return <Product
                        key={i}
                        addressImg={p.urlImagem} name={p.nome}
                        quantity={`${p.quantidade} ${p.unidade}`} checkboxVariant={true}
                    />
             })}
                
            {/* </div> */}
        </div>
            <div className={styles.containerBotao}>
                <Button insideText={"Confirmar seleção"} onClick={adicionarProdutos}/>
            </div>
    </>
)
}