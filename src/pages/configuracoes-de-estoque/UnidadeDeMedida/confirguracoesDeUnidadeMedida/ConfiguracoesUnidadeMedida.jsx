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

const ConfiguracoesUnidadeMedida = () => {
    const UNIT_ICONS = {
        "VOLUME": "fa-solid fa-cube", "MASSA": "fa-solid fa-hippo", "GENÉRICA": "fa-solid fa-circle",
        "PADRAO": "fa-solid fa-question"
    }

    const navigate = useNavigate();
    const [unidades, setUnidades] = useState([]);

    const location = useLocation();
    const unidadeMedidaRemovida = location.state?.unidadeMedidaRemovida;

    useEffect(() => {
        if(unidadeMedidaRemovida != undefined){
            setUnidades((prevUnidades) =>
                prevUnidades.filter((uni) => uni.id !== unidadeMedidaRemovida.id)
            );
        }

        api.get('/unidades-medida').then((res) => setUnidades(res.data))
            .catch((err)=>{
                errorToast("Erro ao buscas unidades de medida. Contate o suporte.")
                console.error("Erro ao buscar unidades de medida:", err);
        })
    }, []);

    const handleEdit = (unidadeMedida) => {
        sessionStorage.setItem("unidade_selecionada", JSON.stringify(unidadeMedida)); // Salva a categoria na sessionStorage
        navigate("/editando-unidade-de-medida"); // Redireciona para a página de edição
    };

    return (
        <>
            <TopBar title={"configurações de Unidade de Medida"} showBackArrow={true} backNavigationPath={"/configuracoes-de-estoque"} />
            <div className={styles.divPrincipal}>
                {unidades.map(u => {
                    return (
                        <Product
                            key={u.id} addressImg={false} name={u.nome} showCheckbox={false}
                            icon={UNIT_ICONS[u.categoria.toUpperCase()]}
                            quantity={[`Categoria: ${u.categoria}`, <br />, `Abreviação: ${u.simbolo}`]}
                            buttonsConfig={{
                                yellow: {icon: "fa-solid fa-pen", text: "Editar", action: () => handleEdit(u)},
                                red: {
                                    icon: "fa-solid fa-trash", text: "Remover",
                                    action: () => navigate("/tela-de-confirmacao", { state: { unidadeDeMedida: u } }),
                                }
                            }}
                        />
                    );
                })}
            </div>
            <div className={styles.divBotao}>
                <Button insideText="Cadastrar nova unidade de medida" onClick={()=>navigate("/criando-unidade-medida")}/>
            </div>
        </>
    );
};

export default ConfiguracoesUnidadeMedida;
