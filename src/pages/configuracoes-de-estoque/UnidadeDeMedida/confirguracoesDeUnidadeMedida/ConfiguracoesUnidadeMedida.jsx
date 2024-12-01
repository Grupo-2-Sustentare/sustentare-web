import styles from "./ConfiguracoesUnidadeMedida.module.css";
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import StreachList from "../../../../components/StrechList/StrechList";
import Button from "../../../../components/Button/Button";
import TopBar from "../../../../components/TopBar/TopBar";
import IconInput from "../../../../components/IconInput/IconInput";
import api from "../../../../api";
import Product from "../../../../components/ProductItem/Product";
import { errorToast, successToast } from "../../../../components/Toast/Toast";
import StrechList from "../../../../components/StrechList/StrechList";
import { EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa } from "../../../../tools/ModuloBusca";
import { UNIT_ICONS } from "../../../../tools/TiposUnidadeMedida";
import LoadingIcon from "../../../../components/LoadingIcon/LoadingIcon";

const ConfiguracoesUnidadeMedida = () => {
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(true);

    const [unidades, setUnidades] = useState([]);
    const [unidadesVisiveis, setUnidadesVisiveis] = useState([])
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)

    const location = useLocation();
    const unidadeMedidaRemovida = location.state?.unidadeMedidaRemovida;

    useEffect(() => {
        if (unidadeMedidaRemovida != undefined) {
            setUnidades((prevUnidades) =>
                prevUnidades.filter((uni) => uni.id !== unidadeMedidaRemovida.id)
            );
        }

        api.get('/proxy-java-api/unidades-medida').then((res) => setUnidades(res.data))
            .catch((err) => {
                errorToast("Erro ao buscas unidades de medida. Contate o suporte.")
                console.error("Erro ao buscar unidades de medida:", err);
            }).finally(()=>setCarregando(false));
    }, []);

    const handleEdit = (unidadeMedida) => {
        sessionStorage.setItem("unidade_selecionada", JSON.stringify(unidadeMedida)); // Salva a categoria na sessionStorage
        navigate("/editando-unidade-de-medida"); // Redireciona para a página de edição
    };

    useEffect(() => {
        setUnidadesVisiveis(ordenacaoComPesquisa(unidades, queryPesquisa, ordenacao, EnumObjetosBusca.UNIDADE_DE_MEDIDA))
    }, [unidades, queryPesquisa, ordenacao])

    return (
        <>
            <TopBar title={"configurações de Unidade de Medida"} showBackArrow={true}
                backNavigationPath={"/configuracoes-de-estoque"} />
            <div className={styles.divPrincipal}>
                <div className={styles.barraDeBusca}>
                    <IconInput onChange={(v) => setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por usuário"} />
                    <StrechList
                        showTitle={false} items={OPCOES_ORDENACAO["Unidade de medida"]} hint={"Opções de ordenação"}
                        onChange={(v) => setOrdenacao(v)}
                    />
                </div><hr />
                <div className={styles.principal}>
                    <LoadingIcon carregando={carregando}/>
                    {unidadesVisiveis?.map(u => {
                        return (
                            <Product
                                key={u.id} addressImg={false} name={u.nome} showCheckbox={false}
                                icon={UNIT_ICONS[u.categoria.toUpperCase()]}
                                quantity={[`Categoria: ${u.categoria}`, <br />, `Abreviação: ${u.simbolo}`]}
                                buttonsConfig={{
                                    yellow: { icon: "fa-solid fa-pen", text: "Editar", action: () => handleEdit(u) },
                                    red: {
                                        icon: "fa-solid fa-trash", text: "Remover",
                                        action: () => navigate("/tela-de-confirmacao", { state: { unidadeDeMedida: u } }),
                                    }
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles.divBotao}>
                <Button insideText="Cadastrar nova unidade de medida" onClick={() => navigate("/criando-unidade-medida")} />
            </div>
        </>
    );
};

export default ConfiguracoesUnidadeMedida;
