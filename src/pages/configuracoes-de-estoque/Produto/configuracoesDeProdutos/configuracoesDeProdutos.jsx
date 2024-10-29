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

const ConfiguracoesProdutos = () => {
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

    useEffect(() => {
        api.get("/produtos")
            .then((response) => {
                setProdutos(response.data); // Armazena os dados da API no estado
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error); // Trata erros
            });
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
            // alert(idResponsavel)
            api.delete(`/produtos/${produto.id}?idResponsavel=${idResponsavel}`)
                .then((response) => {
                    successToast(`Produto "${produto.item.nome}" desativada com sucesso!`);
                    setProdutos((prevProdutos) =>
                        prevProdutos.filter((prod) => prod.id !== produto.id)
                    );
                })
                .catch((error) => {
                    console.error("Erro ao desativar produto:", error);
                    alert("Ocorreu um erro ao tentar desativar o produto.");
                });
        }
    };

    let actioProduto = DEFAULT_BUTTON_CONFIG
    actioProduto.yellow.style = {}
    actioProduto.yellow.icon = "fa-solid fa-pen"
    actioProduto.yellow.iconFillInvert = false
    actioProduto.yellow.text = "Editar"
    actioProduto.yellow.action = ()=>{navigate("/editando-produto")}

    const githubPath = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"

    return (
        <>
            <div className={styles.divTopBar}>
            <TopBar  title={"configurações de produtos"} showBackArrow={true} backNavigationPath={"/configuracoes-de-estoque"}/>
            </div>
            <div className={styles.divPrincipal}>
            <div className={styles.divFiltroEBusca}>
                    <IconInput/>
                    <StreachList showTitle={false}/>
            </div>
            <hr></hr>
                {/* <Product name="Arroz" quantity="50 kilogramas"  showCheckbox={false} addressImg="https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/arroz.webp"/> */}
                {produtos.map((produto) => (
                        // <Product key={categoria.id} name={categoria.nome} showImageOrIcon={false} />
                        <Product
                            // key={produtos.id}
                            name={produto.item.nome}
                            quantity={produto.qtdProduto + " " + produto.item.unidade_medida.nome}
                            showCheckbox={false} 
                            // addressImg=
                            buttonsConfig={{
                                yellow: {
                                    icon: "fa-solid fa-pen",
                                    text: "Editar",
                                    action: () => handleEdit(produto),
                                },
                                red: {
                                    icon: "fa-solid fa-trash",
                                    text: "Remover",
                                    action: () => handleRemove(produto),
                                }
                            }}
                        />
                    ))}
            </div>
            <div className={styles.divBotao}>
            <Button insideText="Cadastrar novo produto" onClick={handleSave}/>
            </div>
        </>
    );
};

export default ConfiguracoesProdutos;
