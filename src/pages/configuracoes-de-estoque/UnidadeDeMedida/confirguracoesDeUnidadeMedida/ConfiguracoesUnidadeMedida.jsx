import styles from "./ConfiguracoesUnidadeMedida.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import StreachList from "../../../../components/StrechList/StrechList";
import Button from "../../../../components/Button/Button";
import TopBar from "../../../../components/TopBar/TopBar";
import IconInput from "../../../../components/IconInput/IconInput";
import api from "../../../../api";
import Product from "../../../../components/ProductItem/Product";
import { errorToast, successToast } from "../../../../components/Toast/Toast";

const ConfiguracoesUnidadeMedida = () => {
    const navigate = useNavigate();
    const [unidades, setUnidades] = useState([]);

    useEffect(() => {
        // Faz a requisição GET para buscar as unidades de medida
        const fetchUnidades = async () => {
            try {
                const response = await api.get('/unidades-medida'); // Atualize a URL de acordo com sua API
                setUnidades(response.data);
            } catch (error) {
                console.error("Erro ao buscar unidades de medida:", error);
            }
        };
        fetchUnidades();
    }, []);

    const handleSave = () => {
        navigate("/criando-unidade-medida");
    };

    const handleEdit = (unidadeMedida) => {
        sessionStorage.setItem("unidade_selecionada", JSON.stringify(unidadeMedida)); // Salva a categoria na sessionStorage
        navigate("/editando-unidade-de-medida"); // Redireciona para a página de edição
    };

    const handleRemove = (unidadeMedida) => {
        const confirmRemove = window.confirm(`Você realmente deseja desativar a unidade de medida "${unidadeMedida.nome}"?`);

        if (confirmRemove) {
            // Pegando o ID do responsável (pode ser obtido da sessionStorage)
            const responsavelString = sessionStorage.getItem("responsavel");
            const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
            const idResponsavel = responsavel ? responsavel.id : null;

            api.delete(`/unidades-medida/${unidadeMedida.id}?idResponsavel=${idResponsavel}`)
                .then((response) => {
                    successToast(`Unidade "${unidadeMedida.nome}" desativada com sucesso!`);
                    setUnidades((prevUnidades) =>
                        prevUnidades.filter((uni) => uni.id !== unidadeMedida.id)
                    );
                })
                .catch((error) => {
                    console.error("Erro ao desativar unidade de medida:", error);
                    errorToast("Ocorreu um erro ao tentar desativar a unidade de medida.");
                });
        }
    };

    const getIconByCategory = (categoria) => {
        if (categoria === "Volume" || categoria === "volume") {
            return "fa-solid fa-cube"; // Ícone para Volume
        } else if (categoria === "Massa") {
            return "fa-solid fa-hippo"; // Ícone para Massa
        } else if (categoria === "Genérica" || categoria === "genérica") {
            return "fa-solid fa-circle"; // Ícone para Quantidade
        } else {
            return "fa-solid fa-question"; // Ícone padrão para outros tipos
        }
    };

    return (
        <>
            <TopBar title={"configurações de Unidade de Medida"} showBackArrow={true} backNavigationPath={"/configuracoes-de-estoque"} />
            <div className={styles.divPrincipal}>
                {/* <div className={styles.divFiltroEBusca}>
                    <IconInput />
                    <StreachList showTitle={false} titulo=" " />
                </div>
                <hr></hr> */}
                {unidades.map(u => {
                    return (
                        <Product
                            key={u.id}
                            addressImg={false}
                            name={u.nome}
                            quantity={[`Categoria: ${u.categoria}`, <br />, `Abreviação: ${u.simbolo}`]}
                            showCheckbox={false}
                            icon={getIconByCategory(u.categoria)} // Aplica a função para determinar o ícone baseado na categoria
                            buttonsConfig={{
                                yellow: {
                                    icon: "fa-solid fa-pen",
                                    text: "Editar",
                                    action: () => handleEdit(u),
                                },
                                red: {
                                    icon: "fa-solid fa-trash",
                                    text: "Remover",
                                    action: () => handleRemove(u),
                                }
                            }}
                        />
                    );
                })}
            </div>
            <div className={styles.divBotao}>
                <Button insideText="Cadastrar nova unidade de medida" onClick={handleSave} />
            </div>
        </>
    );
};

export default ConfiguracoesUnidadeMedida;
