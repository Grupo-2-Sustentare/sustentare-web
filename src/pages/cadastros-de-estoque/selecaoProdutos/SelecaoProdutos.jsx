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

const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"
const OPCOES_ORDENACAO = ["Alfabética - Crescente", "Alfabética - Decrescente"]

export default function SelecaoProdutos(){

    const navigate = useNavigate()

    // Todos os produtos vindos back-end.
    const [produtos, setProdutos] = useState([]);

    // Produtos marcados como selecionados.
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);

    // Produtos exibidos para o usuário (evita recarregar o back-end ao aplicar filtros.
    const [produtosVisiveis, setProdutosVisiveis] = useState([])

    // Carrega os produtos selecionados anteriomente.
    useEffect(() => {
        const movement = JSON.parse(sessionStorage.getItem("movement"));
        if (movement && movement.products) {
            setProdutosSelecionados(movement.products);
            sessionStorage.setItem("produtosSelecionados", JSON.stringify(movement.products));
        }
    }, []);

    // Busca produtos do back-end.
    useEffect(() => {
        api.get("/produtos")
            .then((response) => {
                setProdutos(response.data); // Armazena os dados da API no estado
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error); // Trata erros
            });
    }, []);

    // Ao recarregar produtos do back, altera os visíveis
    useEffect(() => {
        setProdutosVisiveis(produtos)
    }, [produtos]);

    //Ao mudar os produtos selecionados, atualiza sua variável no session storage.
    useEffect(() => {
        sessionStorage.setItem("produtosSelecionados", JSON.stringify(produtosSelecionados));
    }, [produtosSelecionados]);

    // Filtra os produtos por nome.
    function filtrarPorNome(e) {
        let query = e.target.value.toUpperCase()

        if (query.empty) {
            setProdutosVisiveis(produtos)
            return
        }

        let produtosFiltrados = []
        for (let i in produtos) {
            if (produtos[i].item.nome.toUpperCase().indexOf(query) !== -1) {
                produtosFiltrados.push(produtos[i])
            }
        }
        setProdutosVisiveis(produtosFiltrados)
    }

    function ordenar(){
        //ToDo
    }

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
                <IconInput onChange={filtrarPorNome} placeholder={"Pesquisa por nome"}/>
                <StrechList
                    showTitle={false} items={OPCOES_ORDENACAO} hint={"Opções de ordenação"} onChange={ordenar}
                />
            </div>
            <hr/>
            {produtosVisiveis.map((produto) => (
                    <Product
                        key={produto.item.id}
                        id={produto.item.id}
                        addressImg={produto.urlImagem}
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