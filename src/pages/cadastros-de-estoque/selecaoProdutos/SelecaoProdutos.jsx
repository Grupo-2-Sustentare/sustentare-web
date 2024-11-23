import styles from "./selecaoProdutos.module.css"
import IconInput from "../../../components/IconInput/IconInput";
import StrechList from "../../../components/StrechList/StrechList";
import Product from "../../../components/ProductItem/Product";
import TopBar from "../../../components/TopBar/TopBar";
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import {useEffect, useRef, useState} from "react";
import { errorToast } from "../../../components/Toast/Toast";
import axios from "axios";

const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"
const OPCOES_ORDENACAO = ["Alfabética - Crescente", "Alfabética - Decrescente"]

export default function SelecaoProdutos(){

    const navigate = useNavigate()

    const [produtos, setProdutos] = useState([]);
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);

    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                const response = await api.get("/produtos");
                const produtos = response.data;
    
                const produtosComImagens = await Promise.all(
                    produtos.map(async (produto) => {
                        const imageUrl = await carregarImagemAwsS3(produto.item.id);
                        return { ...produto, imageUrl };
                    })
                );
    
                setProdutos(produtosComImagens);
            } catch (error) {
                console.error("Erro ao carregar produtos ou imagens:", error);
            }
        };
    
        carregarProdutos();
    }, []);


    // function buscarProdutos(e){
    //     let query = e.target.value.toUpperCase()

    //     if (query.empty){
    //         setProdutos(mock_produtos)
    //         return
    //     }

    //     let produtosFiltrados = []
    //     for (let i in mock_produtos){
    //         if (mock_produtos[i].nome.toUpperCase().indexOf(query) !== -1){
    //             produtosFiltrados.push(mock_produtos[i])
    //         }
    //     }
    //     setProdutos(produtosFiltrados)
    // }

    // function ordenar(){
    //     let produtosOrdenados = produtos
    //     produtosOrdenados.sort() // TODO Não funciona - arrumar
    //     setProdutos(produtosOrdenados)
    // }

    // function adicionarProdutos(){
    //     // Colocar toast de alerta caso nenhum produto tenha sido selecionado.

    //     let movement = JSON.parse(sessionStorage.getItem("movement"))

    //     if (movement.products.length === 0){
    //         movement.products.push(
    //             {"urlImagem": MOCK_URL + "sobrecoxa.jpg", "nome": "Sobrecoxa", "quantidade": 1, "unidade": "kilograma"},
    //             {"urlImagem": MOCK_URL + "coca300.jpeg", "nome": "Coca 300", "quantidade": 1, "unidade": "unidade"},
    //             {"urlImagem": undefined, "nome": "Guaraná Jesus", "quantidade": 1, "unidade": "unidade"}
    //         )
    //     }

    //     sessionStorage.setItem("movement", JSON.stringify(movement))
    //     navigate("/cadastros-de-estoque")
    // }

    useEffect(() => {
        const movement = JSON.parse(sessionStorage.getItem("movement"));
        if (movement && movement.products) {
            setProdutosSelecionados(movement.products);
            sessionStorage.setItem("produtosSelecionados", JSON.stringify(movement.products));
        }
    }, []);
    
    useEffect(() => {
        sessionStorage.setItem("produtosSelecionados", JSON.stringify(produtosSelecionados));
    }, [produtosSelecionados]);

    const toggleProdutoSelecionado = (produto) => {
        setProdutosSelecionados((prevSelecionados) => {
            if (prevSelecionados.some((p) => p.item.id === produto.item.id)) {
                // Remove o produto se já estiver selecionado
                return prevSelecionados.filter((p) => p.item.id !== produto.item.id);
            } else {
                // Adiciona o produto se não estiver selecionado
                return [...prevSelecionados, produto];
            }
        });
    };

    function adicionarProdutos() {
        if (produtosSelecionados.length === 0) {
            errorToast("Nenhum produto selecionado.");
            return;
        }

        // Salva os produtos selecionados no movimento e redireciona
        let movement = JSON.parse(sessionStorage.getItem("movement")) || {};
        movement.products = produtosSelecionados;
        sessionStorage.setItem("movement", JSON.stringify(movement));
        navigate("/cadastros-de-estoque");
    }

    async function carregarImagemAwsS3 (idUsuario)  {
        return axios.get(`https://teste-sustentare.s3.us-east-1.amazonaws.com//itens/imagens/${idUsuario}`)
            .then(() => {
                return `https://teste-sustentare.s3.us-east-1.amazonaws.com//itens/imagens/${idUsuario}`;
            })
            .catch(() => {
                return `https://placehold.co/400/F5FBEF/22333B?text=Produto`;
            });
    };


    return(
    <>
        <TopBar title={"Seleção de Produtos"} showBackArrow={true} backNavigationPath={"/cadastros-de-estoque"}/>
        <div className={styles.divPrincipal}>
            {/* <div className={styles.barraDeBusca}>
                <IconInput 
                // onChange={buscarProdutos} 
                placeholder={"Pesquisa por nome"}/>
                <StrechList
                    showTitle={false} items={OPCOES_ORDENACAO} hint={"Opções de ordenação"}
                    // onChange={ordenar}
                />
            </div> */}
            {/* <div className={styles.containerProdutos}> */}
            {/* <hr></hr> */}
            {produtos.length === 0 ? <p>Carregando usuarios...</p> : <p></p>}
            {produtos.map((produto) => (
                    <Product
                        key={produto.item.id}
                        id={produto.item.id}
                        addressImg={produto.imageUrl}
                        name={produto.item.nome}
                        quantity={`${produto.qtdProdutoTotal} ${produto.item.unidade_medida.nome}`}
                        checkboxVariant={true}
                        checked={produtosSelecionados.some((p) => p.id === produto.id)}
                        onChange={() => toggleProdutoSelecionado(produto)}
                    />
                ))}
                
            {/* </div> */}
        </div>
            <div className={styles.containerBotao}>
                <Button insideText={"Confirmar seleção"} onClick={adicionarProdutos}/>
            </div>
    </>
)
}