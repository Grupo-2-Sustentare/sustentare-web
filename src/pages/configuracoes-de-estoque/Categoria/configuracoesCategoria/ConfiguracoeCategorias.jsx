import styles from "./ConfiguracoesCategoria.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../../../api";
import StreachList from "../../../../components/StrechList/StrechList";
import Button from "../../../../components/Button/Button";
import TopBar from "../../../../components/TopBar/TopBar";
import IconInput from "../../../../components/IconInput/IconInput";
import Product, { DEFAULT_BUTTON_CONFIG } from "../../../../components/ProductItem/Product";

const ConfiguracoesCategorias = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias carregadas da API

    useEffect(() => {
        // Fazendo a requisição GET para buscar as categorias
        api.get("/categorias")
            .then((response) => {
                setCategorias(response.data); // Armazena os dados da API no estado
            })
            .catch((error) => {
                console.error("Erro ao buscar categorias:", error); // Trata erros
            });
    }, []); // O array vazio [] faz com que a requisição seja feita apenas uma vez ao carregar o componente

    // const categoriaLista = [
    //     "Sobremesa encomenda", "Bebidas",
    //     "Self-service", "Descartaveis"
    // ]

    const handleSave = () => {
        navigate("/criando-nova-categoria");
    };

    // Função para salvar a categoria na sessionStorage e navegar para a página de edição
    const handleEdit = (categoria) => {
        sessionStorage.setItem("categoria_selecionada", JSON.stringify(categoria)); // Salva a categoria na sessionStorage
        navigate("/editando-categoria"); // Redireciona para a página de edição
    };
    
    const handleRemove = (categoria) => {
        const confirmRemove = window.confirm(`Você realmente deseja desativar a categoria "${categoria.nome}"?`);

        if (confirmRemove) {
            // Suponha que você tenha o ID do responsável disponível
            const idResponsavel = 100; // Substitua pelo valor correto
            // Ao logar pegar o Id do Usuário na sessionStorage

            api.delete(`/categorias/${categoria.id}?idResponsavel=${idResponsavel}`)
                .then((response) => {
                    alert(`Categoria "${categoria.nome}" desativada com sucesso!`);
                    setCategorias((prevCategorias) =>
                        prevCategorias.filter((cat) => cat.id !== categoria.id)
                    );
                })
                .catch((error) => {
                    console.error("Erro ao desativar categoria:", error);
                    alert("Ocorreu um erro ao tentar desativar a categoria.");
                });
        }
    };

    // var actionCategoria = DEFAULT_BUTTON_CONFIG
    // actionCategoria.yellow.style = {}
    // actionCategoria.yellow.icon = "fa-solid fa-pen"
    // actionCategoria.yellow.iconFillInvert = false
    // actionCategoria.yellow.text = "Editar"
    // actioCategoria.yellow.action = ()=>{navigate("/editando-categoria")}

    return (
        <>
            <TopBar title={"configurações de categorias"} showBackArrow={true} backNavigationPath={"/configuracoes-de-estoque"} />
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput />
                    <StreachList showTitle={false} titulo=" " />
                </div>
                <hr></hr>
                <div className={styles.principal}>
                    {/* {categoriaLista.map(categoria=>{
                        return <Product name={categoria} showImageOrIcon={false}/>
                      })} */}

                    {categorias.map((categoria) => (
                        // <Product key={categoria.id} name={categoria.nome} showImageOrIcon={false} />
                        <Product
                            key={categoria.id}
                            name={categoria.nome}
                            showImageOrIcon={false}
                            buttonsConfig={{
                                yellow: {
                                    icon: "fa-solid fa-pen",
                                    text: "Editar",
                                    action: () => handleEdit(categoria),
                                },
                                red: {
                                    icon: "fa-solid fa-trash",
                                    text: "Remover",
                                    action: () => handleRemove(categoria),
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.divBotao}>
                <Button insideText="Cadastrar nova categoria" onClick={handleSave} />
            </div>
        </>
    );
};

export default ConfiguracoesCategorias;
