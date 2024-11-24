import styles from "./selecaoProdutos.module.css"
import IconInput from "../../../components/IconInput/IconInput";
import StrechList from "../../../components/StrechList/StrechList";
import Product from "../../../components/ProductItem/Product";
import TopBar from "../../../components/TopBar/TopBar";
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import {useEffect, useState} from "react";
import { errorToast } from "../../../components/Toast/Toast";
import {EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa} from "../../../tools/ModuloBusca";
import axios from "axios";
import loading from "../../../loading.gif"

export default function SelecaoProdutos(){

    const navigate = useNavigate()

    const [carregando, setCarregando] = useState(true)

    // Todos os produtos vindos back-end.
    const [produtos, setProdutos] = useState([]);

    // Produtos marcados como selecionados.
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);

    // Do módulo de busca e ordenação.
    const [produtosVisiveis, setProdutosVisiveis] = useState([])
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)

    async function carregarImagemAwsS3 (idUsuario)  {
        return axios.get(`https://teste-sustentare.s3.us-east-1.amazonaws.com//itens/imagens/${idUsuario}`)
            .then(() => {
                return `https://teste-sustentare.s3.us-east-1.amazonaws.com//itens/imagens/${idUsuario}`;
            })
            .catch(() => {
                return `https://placehold.co/400/F5FBEF/22333B?text=Produto`;
            });
    }

    // Carrega os produtos selecionados anteriomente & busca produtos do back-end.
    useEffect(() => {
        const movement = JSON.parse(sessionStorage.getItem("movement"));
        if (movement && movement.products) {
            setProdutosSelecionados(movement.products);
            sessionStorage.setItem("produtosSelecionados", JSON.stringify(movement.products));
        }

        api.get("/produtos")
            .then(async (res) => {
                const produtosBrutos = res.data
                const produtos = await Promise.all(produtosBrutos.map(async produto => {
                    const imageUrl = await carregarImagemAwsS3(produto.item.id);
                    return {...produto, imageUrl};
                }))
                console.log(produtos)
                setProdutos(produtos)
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error); // Trata erros
            })
            .finally(() => setCarregando(false));
    }, []);

    //Ao mudar os produtos selecionados, atualiza sua variável no session storage.
    useEffect(() => {
        sessionStorage.setItem("produtosSelecionados", JSON.stringify(produtosSelecionados));
    }, [produtosSelecionados]);

    useEffect(() => {
        setProdutosVisiveis(ordenacaoComPesquisa(produtos, queryPesquisa, ordenacao, EnumObjetosBusca.PRODUTO))
    }, [produtos, queryPesquisa, ordenacao])

    // Marca e desmarca produtos
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

    // Salva as alterações feitas e volta à tela do movimento.
    function finalizarSelecao() {
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

    return(
    <>
        <TopBar title={"Seleção de Produtos"} showBackArrow={true} backNavigationPath={"/cadastros-de-estoque"}/>
        <div className={styles.divPrincipal}>
            <div className={styles.barraDeBusca}>
                <IconInput onChange={(v)=>setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por nome"}/>
                <StrechList
                    showTitle={false} items={OPCOES_ORDENACAO.Produto} hint={"Opções de ordenação"}
                    onChange={(v)=>setOrdenacao(v)}
                />
            </div><hr/>
            {carregando && (<img src={loading} alt={"Carregando..."}/>)}
            {produtosVisiveis?.map((produto) => (
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
        </div>
        <div className={styles.containerBotao}>
            <Button insideText={"Confirmar seleção"} onClick={finalizarSelecao}/>
        </div>
    </>
)
}