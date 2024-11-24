import styles from "./novoMovimento.module.css"
import Button from "../../../components/Button/Button";
import TopBar from "../../../components/TopBar/TopBar";
import Product, { DEFAULT_BUTTON_CONFIG } from "../../../components/ProductItem/Product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { errorToast, successToast } from "../../../components/Toast/Toast";
import api from "../../../api";

// const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"

export default function NovoMovimento({ }) {
    const navigate = useNavigate()
    const responsavelString = sessionStorage.getItem("responsavel");
    const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
    const idResponsavel = responsavel ? responsavel.id : null;

    // Carrega os produtos selecionados da sessionStorage
    const productCheckedStates = JSON.parse(sessionStorage.getItem("productCheckedStates")) || [];

    // Carrega o movimento e filtra produtos de acordo com `productCheckedStates`
    let jsonMovs = JSON.parse(sessionStorage.getItem("movement"));
    if (jsonMovs === null) {
        jsonMovs = { "products": [] };
        sessionStorage.setItem("movement", JSON.stringify(jsonMovs));
    } else {
        // Filtra produtos em `movement` para incluir apenas os que estão em `productCheckedStates`
        jsonMovs.products = jsonMovs.products.filter(product =>
            productCheckedStates.some(checkedProduct => checkedProduct.id === product.item.id)
        );
        // Certifique-se de que cada produto tenha uma propriedade 'quantidadeMovimento'
        jsonMovs.products = jsonMovs.products.map(product => ({
            ...product,
            quantidadeMovimento: product.quantidadeMovimento || 0  // Adiciona ou preserva a quantidade de movimento
        }));

        // Atualiza `movement` na sessionStorage para remover produtos não selecionados
        sessionStorage.setItem("movement", JSON.stringify(jsonMovs));
    }

    let [movement, setMovement] = useState(jsonMovs)

    // Mock, para testes
    // movement = {"products": [
    //         {"urlImagem": MOCK_URL + "sobrecoxa.jpg", "nome": "Sobrecoxa", "quantidade": 12, "unidade": "kilogramas"},
    //         {"urlImagem": MOCK_URL + "coca300.jpeg", "nome": "Coca 300", "quantidade": 32, "unidade": "unidades"},
    //         {"urlImagem": undefined, "nome": "Guaraná Jesus", "quantidade": 75, "unidade": "unidades"},
    //         {"urlImagem": MOCK_URL + "feijão.png", "nome": "Feijão", "quantidade": 4, "unidade": "sacos"}
    // ]}

    function editarProduto(p, qtdMovimento) {
        // Atualiza a quantidade de movimento para esse produto
        const updatedProduct = {
            ...p,
            quantidadeMovimento: qtdMovimento  // Atualiza a quantidade de movimento
        };

        // Atualiza o produto na lista de movimento
        const updatedProducts = movement.products.map(product =>
            product.item.id === p.item.id ? updatedProduct : product
        );

        // Atualiza o estado e o sessionStorage
        setMovement({ ...movement, products: updatedProducts });
        sessionStorage.setItem("movement", JSON.stringify({ ...movement, products: updatedProducts }));

        // Vai para a página de edição
        sessionStorage.setItem("productBeingEdited", JSON.stringify(updatedProduct));
        // sessionStorage.setItem("qtdMovimentoDoProduto", qtdMovimento);
        navigate("/tipo-movimento");
    }


    function removerProdutoNovoMovimento(produtoParaRemover) {
        // Atualiza o estado 'movement' para remover o produto
        const novosProdutos = movement.products.filter(p => p.item.id !== produtoParaRemover.item.id);

        // Atualiza a lista de produtos verificados (productCheckedStates) removendo o produto
        const novosProductCheckedStates = productCheckedStates.filter(checkedProduct => checkedProduct.id !== produtoParaRemover.item.id);

        // Atualiza o estado com a lista de produtos filtrada
        setMovement(prevMovement => {
            const updatedMovement = { ...prevMovement, products: novosProdutos };
            // Atualiza a sessionStorage com o novo movimento
            sessionStorage.setItem("movement", JSON.stringify(updatedMovement));

            // Atualiza a lista de produtos verificados na sessionStorage
            sessionStorage.setItem("productCheckedStates", JSON.stringify(novosProductCheckedStates));

            return updatedMovement;
        });
    }


    async function finalizar() {
        if (movement.products.length === 0) {
            errorToast("Não é possível registrar uma movimentação sem produtos selecionados!")
            return
        }
    
        const movementData = JSON.parse(sessionStorage.getItem("movement"));
        const { products } = movementData;
    
        try {
            for (const produto of products) {
                const payload = {
                    interacaoEstoqueCriacaoDTO: {
                        categoriaInteracao: produto.categoriaInteracao,
                        dataHora: new Date().toISOString().replace('T', ' ').substring(0, 19)  // Formato "YYYY-MM-DD HH:MM:SS"
                    },
                    produtoCriacaoDTO: {
                        preco: produto.preco,
                        qtdProduto: produto.qtdProduto,
                        qtdMedida: produto.qtdMedida || 0,
                        ativo: true
                    }
                };
    
                await api.post(`/proxy-java-api/interacoes-estoque?fkItem=${produto.item.id}&idResponsavel=${idResponsavel}`, payload);
            }
            successToast("Movimentação concluída com sucesso.");
            sessionStorage.removeItem("movement")
            sessionStorage.removeItem("produtosSelecionados")
            sessionStorage.removeItem("productCheckedStates")
            sessionStorage.removeItem("preco")
            sessionStorage.removeItem("qtdMovimento")
            sessionStorage.removeItem("isUltimaHora")
    
            setTimeout(() => navigate("/menu-inicial"), 2000)
        } catch (error) {
            console.error("Erro ao concluir movimentação:", error);
            errorToast("Erro ao concluir movimentação. Tente novamente.");
        }
    }
    
    

    return (
        <>
            <TopBar title={"Nova Movimentação"} showBackArrow={false} />
            <div className={styles.divPrincipal}>
                {/* <div className={styles.containerProdutos}> */}
                {movement.products.length === 0 && (
                    <p className={styles.avisoVazio}>Nenhum produto adicionado a essa entrada.</p>
                )}
                {movement.products.map((p, i) => {
                    let qtdMovimento = p.quantidadeMovimento || 0;  // Obtém a quantidade de movimento
                    return <Product
                        key={i}
                        id={p.item.id}
                        addressImg={p.urlImagem}
                        name={p.item.nome}
                        quantity={`${p.quantidadeMovimento} ${p.item.unidade_medida.nome}`}
                        buttonsConfig={{
                            yellow: {
                                icon: "fa-solid fa-pen",
                                text: "Editar",
                                action: () => editarProduto(movement.products[i], qtdMovimento),
                            },
                            red: {
                                icon: "fa-solid fa-trash",
                                text: "Remover",
                                action: () => removerProdutoNovoMovimento(movement.products[i]),
                            }
                        }}
                    />
                })}

            </div>
            <div className={styles.botoes}>
                <Button
                    insideText={"Adicionar produto"}
                    onClick={() => navigate("/selecao-produtos")}
                />
                <Button insideText={"Concluir entrada"} onClick={finalizar} />
            </div>
        </>
    )
}