import styles from "./ConfiguracoesUnidadeMedida.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import StreachList from "../../../../components/StrechList/StrechList";
import Button from "../../../../components/Button/Button";
import TopBar from "../../../../components/TopBar/TopBar";
import IconInput from "../../../../components/IconInput/IconInput";
import api from "../../../../api";
import Product, { DEFAULT_BUTTON_CONFIG } from "../../../../components/ProductItem/Product";
import { errorToast, successToast } from "../../../../components/Toast/Toast";

// Constante JSON mockada
// const MOCK_UNIDADES = [
//     { nome: "Mililitro", tipo: "Volume", abreviacao: "ml", icone: "fa-solid fa-cube" },
//     { nome: "Quilograma", tipo: "Massa", abreviacao: "kg", icone: "fa-solid fa-hippo" },
//     { nome: "Sacas", tipo: "Massa", abreviacao: "sacas", icone: "fa-solid fa-hippo" },
//     { nome: "Mililitro", tipo: "Volume", abreviacao: "ml", icone: "fa-solid fa-cube" },
//     { nome: "Mililitro", tipo: "Volume", abreviacao: "ml", icone: "fa-solid fa-cube" },
//     { nome: "Mililitro", tipo: "Volume", abreviacao: "ml", icone: "fa-solid fa-cube" },
//     { nome: "Quantidade Genérica", tipo: "Massa", abreviacao: "unidades", icone: "fa-solid fa-circle" }
// ];

    // Var que em algum momento vai deixar de receber o mock para se tornar dinâmica
    // let unidades = MOCK_UNIDADES;

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

    let actioUnidadeMedida = { ...DEFAULT_BUTTON_CONFIG };
    actioUnidadeMedida.yellow.style = {}
    actioUnidadeMedida.yellow.icon = "fa-solid fa-pen"
    actioUnidadeMedida.yellow.iconFillInvert = false
    actioUnidadeMedida.yellow.text = "Editar"
    actioUnidadeMedida.yellow.action = () => { navigate("/editando-unidade-de-medida") };

    const icone = ""

    const getIconByCategory = (categoria) => {
        if (categoria === "Volume" || categoria === "volume") {
            return "fa-solid fa-cube"; // Ícone para Volume
        } else if (categoria === "Massa") {
            return "fa-solid fa-hippo"; // Ícone para Massa
        } else if (categoria === "Unidade" || categoria === "unidade" || categoria === "Genérico" || categoria === "genérico") {
            return "fa-solid fa-circle"; // Ícone para Quantidade
        } else {
            return "fa-solid fa-question"; // Ícone padrão para outros tipos
        }
    };
    
    // Função para salvar a categoria na sessionStorage e navegar para a página de edição
    const handleEdit = (unidadeMedida) => {
        sessionStorage.setItem("unidade_selecionada", JSON.stringify(unidadeMedida)); // Salva a categoria na sessionStorage
        navigate("/editando-unidade-de-medida"); // Redireciona para a página de edição
    };
    
    const handleRemove = (unidadeMedida) => {
        const confirmRemove = window.confirm(`Você realmente deseja desativar a unidade de medida "${unidadeMedida.nome}"?`);

        if (confirmRemove) {
            // Suponha que você tenha o ID do responsável disponível
            const idResponsavel = 100; // Substitua pelo valor correto
            // Ao logar pegar o Id do Usuário na sessionStorage

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

    return (
        <>
            <TopBar title={"configurações de Unidade de Medida"} showBackArrow={true} backNavigationPath={"/configuracoes-de-estoque"} />
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput />
                    <StreachList showTitle={false} titulo=" " />
                </div>
                <hr></hr>
                {unidades.map(u => {
                    return (
                        <Product
                            // key={u.id}
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