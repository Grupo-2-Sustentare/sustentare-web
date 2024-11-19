import styles from "./TelaParaNegarDelecao.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "../../components/Button/Button";
import TopBar from "../../components/TopBar/TopBar";
import Product from "../../components/ProductItem/Product";
import { successToast } from "../../components/Toast/Toast";

const NegarDelecao = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias carregadas da API

    useEffect(() => {
        api.get("/categorias")
            .then((response) => {
                setCategorias(response.data); // Armazena os dados da API no estado
            })
            .catch((error) => {
                console.error("Erro ao buscar categorias:", error); // Trata erros
            });
    }, []);


    const handleInfo = () => {
        navigate("/configuracoes-de-estoque")
    };

    // Função para salvar a categoria na sessionStorage e navegar para a página de edição
    const handleEdit = (categoria) => {
        sessionStorage.setItem("categoria_selecionada", JSON.stringify(categoria)); // Salva a categoria na sessionStorage
        navigate("/editando-categoria"); // Redireciona para a página de edição
    };
    
    const handleRemove = (categoria) => {
        const confirmRemove = window.confirm(`Você realmente deseja desativar a categoria "${categoria.nome}"?`);

        if (confirmRemove) {
            
            const responsavelString = sessionStorage.getItem("responsavel");
            const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
            const idResponsavel = responsavel ? responsavel.id : null;


        }
    };

    // var actionCategoria = DEFAULT_BUTTON_CONFIG
    // actionCategoria.yellow.style = {}
    // actionCategoria.yellow.icon = "fa-solid fa-pen"
    // actionCategoria.yellow.iconFillInvert = false
    // actionCategoria.yellow.text = "Editar"
    // actioCategoria.yellow.action = ()=>{navigate("/editando-categoria")}

    var oQueSeraDeletado = "Categoria"

    return (
        <>
            <TopBar title={"Solicitação Negada"} showBackArrow={false}/>
            <div className={styles.divPrincipal}>
                <div className={styles.principal}>
                    <span>Não será possivel deletar a {oQueSeraDeletado}, pois há os seguintes produtos associados: </span>
                    <hr />
                    <div>
                        <li>Produto 1</li>
                        <li>Produto 2</li>
                        <li>Produto 3</li>
                        <li>Produto 4</li>
                        <li>Produto 5</li>
                        <li>Produto 6</li>
                        <span>...Outros</span>
                    </div>
                    <div className={styles.instrucoes}>Para deletar a {oQueSeraDeletado}, você pode seguir ou deletando os produtos associados ou atualiza-los para outra {oQueSeraDeletado}</div>
                </div>
            </div>
            <div className={styles.divBotao}>
                <Button insideText="Ok" onClick={handleInfo} />
            </div>
        </>
    );
};

export default NegarDelecao;
