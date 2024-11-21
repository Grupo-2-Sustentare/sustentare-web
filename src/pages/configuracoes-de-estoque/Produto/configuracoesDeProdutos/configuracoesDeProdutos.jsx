import styles from "../configuracoesDeProdutos/ConfiguracoesDeProdutos.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import StreachList from "../../../../components/StrechList/StrechList";
import Button from "../../../../components/Button/Button";
import TopBar from "../../../../components/TopBar/TopBar";
import IconInput from "../../../../components/IconInput/IconInput";
import api from "../../../../api";
import Product, { DEFAULT_BUTTON_CONFIG } from "../../../../components/ProductItem/Product";
import { successToast } from "../../../../components/Toast/Toast";
import axios from "axios";

const ConfiguracoesProdutos = () => {
    const [imagens, setImagens] = useState({});
    sessionStorage.removeItem('paginaRequisicao');
    sessionStorage.removeItem('selectedUnidadeMedida');
    sessionStorage.removeItem('selectedCategoria');
    sessionStorage.removeItem("nome");
    sessionStorage.removeItem("diasVencimento");
    sessionStorage.removeItem("perecivel");
    sessionStorage.removeItem("produto_selecionado");
    sessionStorage.removeItem("selectedUnidadeMedida");
    sessionStorage.removeItem("selectedCategoria");
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);


  
    async function carregarImagemAwsS3 (idUsuario)  {
        return axios.get(`https://teste-sustentare.s3.us-east-1.amazonaws.com//itens/imagens/${idUsuario}`)
            .then(() => {
                return `https://teste-sustentare.s3.us-east-1.amazonaws.com//itens/imagens/${idUsuario}`;
            })
            .catch(() => {
                return `https://placehold.co/400/F5FBEF/22333B?text=Produto`;
            });
    };
    


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
    

    const handleSave = () => {
        navigate("/criando-produto");
    };

    // Função para salvar a categoria na sessionStorage e navegar para a página de edição
    const handleEdit = (produto) => {
        sessionStorage.setItem("produto_selecionado", JSON.stringify(produto)); // Salva a categoria na sessionStorage
        navigate("/editando-produto"); // Redireciona para a página de edição
    };

    const handleRemove = (produto) => {

        const confirmRemove = window.confirm(`Você realmente deseja desativar o produto "${produto.item.nome}"?`);

        if (confirmRemove) {
            // Suponha que você tenha o ID do responsável disponível
            const responsavelString = sessionStorage.getItem("responsavel");
            const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
            const idResponsavel = responsavel ? responsavel.id : null;

            // Armazena o item associado ao produto antes da remoção do produto
            const itemId = produto.item.id;

        }
    };

    let actioProduto = DEFAULT_BUTTON_CONFIG
    actioProduto.yellow.style = {}
    actioProduto.yellow.icon = "fa-solid fa-pen"
    actioProduto.yellow.iconFillInvert = false
    actioProduto.yellow.text = "Editar"
    actioProduto.yellow.action = () => { navigate("/editando-produto") }

    return (
        <>
            <div className={styles.divTopBar}>
                <TopBar title={"configurações de produtos"} showBackArrow={true} backNavigationPath={"/configuracoes-de-estoque"} />
            </div>
            <div className={styles.divPrincipal}>
                
                {produtos.map( (produto) => {
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
            <div className={styles.divBotao}>
                <Button insideText="Cadastrar novo produto" onClick={handleSave} />
            </div>
        </>
    );

};

export default ConfiguracoesProdutos;
