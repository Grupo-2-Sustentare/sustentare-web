import styles from "./ConfiguracoesCategoria.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../../../api";
import StreachList from "../../../../components/StrechList/StrechList";
import Button from "../../../../components/Button/Button";
import TopBar from "../../../../components/TopBar/TopBar";
import IconInput from "../../../../components/IconInput/IconInput";
import Product from "../../../../components/ProductItem/Product";
import {errorToast} from "../../../../components/Toast/Toast";
import StrechList from "../../../../components/StrechList/StrechList";
import {EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa} from "../../../../tools/ModuloBusca";
import LoadingIcon from "../../../../components/LoadingIcon/LoadingIcon";

const ConfiguracoesCategorias = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [carregando, setCarregando] = useState(true)

    // Do módulo de busca e ordenação.
    const [categoriasVisiveis, setCategoriasVisiveis] = useState([])
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)

    useEffect(() => {
        api.get("/proxy-java-api/categorias").then((res) => setCategorias(res.data))
            .catch((err) => {
                errorToast("Erro ao buscar categorias.")
                console.log("Erro ao buscar categorias:", err);
            }).finally(() => setCarregando(false));;
    }, []);

    useEffect(() => {
        setCategoriasVisiveis(ordenacaoComPesquisa(categorias, queryPesquisa, ordenacao, EnumObjetosBusca.CATEGORIA))
    }, [categorias, queryPesquisa, ordenacao])

    // Função para salvar a categoria na sessionStorage e navegar para a página de edição
    const handleEdit = (categoria) => {
        sessionStorage.setItem("categoria_selecionada", JSON.stringify(categoria)); // Salva a categoria na sessionStorage
        navigate("/editando-categoria"); // Redireciona para a página de edição
    };

    return (
        <>
            <TopBar title={"configurações de categorias"} showBackArrow={true} 
                backNavigationPath={"/configuracoes-de-estoque"} />
            <div className={styles.divPrincipal}>
                <div className={styles.barraDeBusca}>
                    <IconInput onChange={(v) => setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por nome"}/>
                    <StrechList
                        showTitle={false} items={OPCOES_ORDENACAO.Categoria} hint={"Opções de ordenação"}
                        onChange={(v) => setOrdenacao(v)}
                    />
                </div><hr/>
                <div className={styles.principal}>
                    <LoadingIcon carregando={carregando}/>
                    {categoriasVisiveis?.map((categoria) => (
                        <Product
                            key={categoria.id} name={categoria.nome} showImageOrIcon={false}
                            buttonsConfig={{
                                yellow: {icon: "fa-solid fa-pen", text: "Editar", action: () => handleEdit(categoria),},
                                red: {
                                    icon: "fa-solid fa-trash", text: "Remover",
                                    action: () => navigate("/tela-de-confirmacao", {state: {categoria: categoria}})
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.divBotao}>
                <Button insideText="Cadastrar nova categoria" onClick={()=>navigate("/criando-nova-categoria")} />
            </div>
        </>
    );
};

export default ConfiguracoesCategorias;
