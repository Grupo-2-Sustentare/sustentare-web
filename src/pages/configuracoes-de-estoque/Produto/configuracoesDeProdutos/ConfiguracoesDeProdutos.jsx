import styles from "../configuracoesDeProdutos/ConfiguracoesDeProdutos.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import TopBar from "../../../../components/TopBar/TopBar";
import IconInput from "../../../../components/IconInput/IconInput";
import api from "../../../../api";
import Product, { DEFAULT_BUTTON_CONFIG } from "../../../../components/ProductItem/Product";
import { errorToast } from "../../../../components/Toast/Toast";
import axios from "axios";
import StrechList from "../../../../components/StrechList/StrechList";
import { EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa } from "../../../../tools/ModuloBusca";
import LoadingIcon from "../../../../components/LoadingIcon/LoadingIcon";

const ConfiguracoesProdutos = () => {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    sessionStorage.removeItem('paginaRequisicao')
    sessionStorage.removeItem('selectedUnidadeMedida')
    sessionStorage.removeItem('selectedCategoria')
    sessionStorage.removeItem('nome')
    sessionStorage.removeItem('diasVencimento')
    sessionStorage.removeItem('perecivel')
    sessionStorage.removeItem('produto_selecionado')
    sessionStorage.removeItem('qtdMinItem');

    // Do módulo de busca e ordenação.
    const [produtosVisiveis, setProdutosVisiveis] = useState([])
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)

    async function carregarImagemAwsS3(idUsuario) {
        return axios.get(`https://teste-sustentare.s3.us-east-1.amazonaws.com//itens/imagens/${idUsuario}`)
            .then(() => {
                return `https://teste-sustentare.s3.us-east-1.amazonaws.com//itens/imagens/${idUsuario}`;
            })
            .catch(() => {
                return `https://placehold.co/400/F5FBEF/22333B?text=Produto`;
            });
    }

    useEffect(() => {
        api.get("/proxy-java-api/produtos").then(async (res) => {
            const produtosComImagens = await Promise.all(
                res.data?.map(async (prod) => {
                    const imageUrl = await carregarImagemAwsS3(prod.item.id);
                    return { ...prod, imageUrl };
                })
            );
            setProdutos(produtosComImagens);
        }).catch((err) => {
            errorToast("Erro ao carregar produtos.")
            console.log(err)
        }).finally(()=>setCarregando(false));
    }, []);

    // Função para salvar a categoria na sessionStorage e navegar para a página de edição
    const handleEdit = (produto) => {
        sessionStorage.setItem("produto_selecionado", JSON.stringify(produto)); // Salva a categoria na sessionStorage
        navigate("/editando-produto"); // Redireciona para a página de edição
    };

    let actionProduto = DEFAULT_BUTTON_CONFIG
    actionProduto.yellow.style = {}
    actionProduto.yellow.icon = "fa-solid fa-pen"
    actionProduto.yellow.iconFillInvert = false
    actionProduto.yellow.text = "Editar"
    actionProduto.yellow.action = () => { navigate("/editando-produto") }

    useEffect(() => {
        setProdutosVisiveis(ordenacaoComPesquisa(produtos, queryPesquisa, ordenacao, EnumObjetosBusca.PRODUTO))
    }, [produtos, queryPesquisa, ordenacao])

    return (
        <>
            <TopBar title={"configurações de produtos"} showBackArrow={true} backNavigationPath={"/configuracoes-de-estoque"} />
            <div className={styles.divPrincipal}>
                <div className={styles.barraDeBusca}>
                    <IconInput onChange={(v) => setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por nome"} />
                    <StrechList
                        showTitle={false} items={OPCOES_ORDENACAO.Produto} hint={"Opções de ordenação"}
                        onChange={(v) => setOrdenacao(v)}
                    />
                </div><hr />
                <div className={styles.principal}>
                    <LoadingIcon carregando={carregando}/>
                    {produtosVisiveis?.map((produto) => {
                        return <Product
                            name={produto.item.nome}
                            quantity={produto.qtdProdutoTotal + " " + produto.item.unidade_medida.nome}
                            showCheckbox={false}
                            addressImg={produto.imageUrl}
                            buttonsConfig={{
                                yellow: {
                                    icon: "fa-solid fa-pen",
                                    text: "Editar",
                                    action: () => handleEdit(produto),
                                },
                                red: {
                                    icon: "fa-solid fa-trash",
                                    text: "Remover",
                                    action: () => navigate("/tela-de-confirmacao", { state: { produto: produto } }),
                                }
                            }}
                        />
                    }
                    )}
                </div>
            </div>
            <div className={styles.divBotao}>
                <Button
                    insideText="Cadastrar novo produto"
                    onClick={() => {
                        // sessionStorage.setItem("selectedCategoria", "null");
                        // sessionStorage.setItem("selectedUnidadeMedida", "null");
                        const nome = sessionStorage.getItem("nome"); // Verifica o valor de 'nome' no sessionStorage
                        if (nome && nome.trim() !== "") { // Remove apenas se não estiver vazio ou composto por espaços
                            sessionStorage.removeItem("nome");
                        }
                        navigate("/criando-produto"); // Navega para a página de criar produto
                    }}
                />
            </div>
        </>
    );

};

export default ConfiguracoesProdutos;
