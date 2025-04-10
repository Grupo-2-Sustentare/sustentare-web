import styles from "./selecaoProdutos.module.css"
import IconInput from "../../../components/IconInput/IconInput";
import StrechList from "../../../components/StrechList/StrechList";
import Product from "../../../components/ProductItem/Product";
import TopBar from "../../../components/TopBar/TopBar";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { useEffect, useState } from "react";
import { errorToast } from "../../../components/Toast/Toast";
import { EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa } from "../../../tools/ModuloBusca";
import axios from "axios";
import LoadingIcon from "../../../components/LoadingIcon/LoadingIcon";
import {URL_S3} from "../../../tools/ImageHelper";

export default function SelecaoProdutos() {

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

    async function carregarImagemAwsS3(nomeItem, idUsuario) {
        return axios.get(URL_S3 + idUsuario).then(() => {return URL_S3 + idUsuario})
            .catch(() => {
                return `https://placehold.co/400/F5FBEF/22333B?text=${nomeItem}`;
            });
    }

    // Carrega os produtos selecionados anteriomente & busca produtos do back-end.
    useEffect(() => {
        const movement = JSON.parse(sessionStorage.getItem("movement"));
        if (movement && movement.products) {
            setProdutosSelecionados(movement.products);
            sessionStorage.setItem("produtosSelecionados", JSON.stringify(movement.products));
        }

        api.get("/proxy-java-api/produtos")
            .then(async (res) => {
                const produtosBrutos = res.data
                const produtos = await Promise.all(produtosBrutos.map(async produto => {
                    const imageUrl = await carregarImagemAwsS3(produto.item.nome, produto.item.id);
                    return { ...produto, imageUrl };
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

    function finalizarSelecao() {
        // Recupera os produtos previamente marcados da sessionStorage
        const productCheckedStates = JSON.parse(sessionStorage.getItem("productCheckedStates")) || [];

        // Filtra os produtos que estão marcados como 'checked'
        const produtosMarcados = productCheckedStates.filter((produto) => produto.checked);

        // Verifica se o produto marcado já está na lista de produtos selecionados
        const produtosParaAdicionar = produtosMarcados.filter((produto) => {
            // Encontra o produto correspondente na lista de produtos da API
            const produtoEncontrado = produtos.find((p) => p.item.id === produto.id);
            // Verifica se o produto não está na lista de produtos selecionados
            const isAlreadySelected = produtosSelecionados.some((p) => p.item.id === produto.id);
            return produtoEncontrado && !isAlreadySelected; // Se o produto for encontrado e não estiver selecionado
        }).map((produto) => {
            // Encontra novamente o produto na lista da API e retorna ele
            return produtos.find((p) => p.item.id === produto.id);
        });

        // Atualiza a lista de produtos selecionados
        setProdutosSelecionados((prevSelecionados) => {
            const novosProdutosSelecionados = [...prevSelecionados, ...produtosParaAdicionar];

            // Atualiza o sessionStorage com a nova lista de produtos selecionados
            sessionStorage.setItem("produtosSelecionados", JSON.stringify(novosProdutosSelecionados));

            return novosProdutosSelecionados;
        });

        // Aguarda 2 segundos antes de validar
        setTimeout(() => {
            // Verifica se há produtos selecionados
            const produtosSelecionados = JSON.parse(sessionStorage.getItem("produtosSelecionados")) || [];
            if (produtosSelecionados.length === 0) {
                errorToast("Nenhum produto selecionado.");
                return;
            }

            // Salva os produtos selecionados no movimento e redireciona
            let movement = JSON.parse(sessionStorage.getItem("movement")) || {};
            movement.products = produtosSelecionados;
            sessionStorage.setItem("movement", JSON.stringify(movement));

            // Navega para a próxima página
            navigate("/cadastros-de-estoque");
        }, 500);
    }


    return (
        <>
            <TopBar title={"Seleção de Produtos"} showBackArrow={true} backNavigationPath={"/cadastros-de-estoque"} />
            <div className={styles.divPrincipal}>
                <div className={styles.barraDeBusca}>
                    <IconInput onChange={(v) => setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por nome"} />
                    <StrechList
                        showTitle={false} items={OPCOES_ORDENACAO.Produto} hint={"Opções de ordenação"}
                        onChange={(v) => setOrdenacao(v)}
                    />
                </div><hr />
                <div className={styles.containerProdutos}>
                    <LoadingIcon carregando={carregando} />
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
            </div>
            <div className={styles.containerBotao}>
                <Button insideText={"Confirmar seleção"} onClick={finalizarSelecao} />
            </div>
        </>
    )
}