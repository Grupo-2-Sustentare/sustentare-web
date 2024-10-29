import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import StreachList from "../../../../components/StrechList/StrechList"
import RedirectionList from "../../../../components/RedirectionList/RedirectionList";
import TextInput from "../../../../components/TextInput/TextInput"
import styles from "./EditandoProduto.module.css";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../../../components/TopBar/TopBar"
import Button from "../../../../components/Button/Button";
import ImageUploader from "../../../../components/ImageUploader/ImageUploader"
import { errorToast, successToast } from "../../../../components/Toast/Toast";

const EditandoProduto = () => {
    const navigate = useNavigate();
    sessionStorage.paginaRequisicao = "/editando-produto"
    const responsavelString = sessionStorage.getItem("responsavel");
    const responsavel = responsavelString ? JSON.parse(responsavelString) : null; 
    const idResponsavel = responsavel ? responsavel.id : null;

    const defaultItem = {
        heading: "Selecione...",
        subheading: "Sem informação disponível"
    };

    let produtoSelecionado = "";


    const storedProduto = sessionStorage.getItem("produto_selecionado");
    const storedUnidadeMedida = sessionStorage.getItem("selectedUnidadeMedida");
    const storedCategoria = sessionStorage.getItem("selectedCategoria");

    if (storedProduto) {
        try {
            produtoSelecionado = JSON.parse(storedProduto) || defaultItem;
        } catch (error) {
            produtoSelecionado = defaultItem;
        }
    }

    const defaultUnidadeMedia = {
        nome: produtoSelecionado.item.unidade_medida.nome,
        subheading: "Sem informação disponível"
    };
    let itemUM = defaultUnidadeMedia;

    const defaultCategoria = {
        nome: produtoSelecionado.item.categoria.nome,
        subheading: "Sem informação disponível"
    };
    let itemC = defaultCategoria;

    if (storedUnidadeMedida) {
        try {
            itemUM = JSON.parse(storedUnidadeMedida) || produtoSelecionado.item.unidade_medida;
        } catch (error) {
            itemUM = produtoSelecionado.item.unidade_medida;
        }
    }
    if (storedCategoria) {
        try {
            itemC = JSON.parse(storedCategoria) || produtoSelecionado.item.categoria;
        } catch (error) {
            itemC = produtoSelecionado.item.categoria;
        }
    }

    const [preco, setPreco] = useState(produtoSelecionado?.preco || 0);
    const [qtdProduto, setQtdProduto] = useState(produtoSelecionado?.qtdProduto || 0);
    const [qtdMedida, setQtdMedida] = useState(produtoSelecionado?.qtdMedida || 0);

    const [nome, setNome] = useState(sessionStorage.getItem("nome") || produtoSelecionado.item?.nome || "");
    const [diasVencimento, setDiasVencimento] = useState(sessionStorage.getItem("diasVencimento") || produtoSelecionado.item?.dias_vencimento || "");
    const [isChecked, setIsChecked] = useState(JSON.parse(sessionStorage.getItem("perecivel")) ?? !!produtoSelecionado?.item?.perecivel);

    // Sincroniza os valores com sessionStorage apenas quando mudam
    useEffect(() => {
        sessionStorage.setItem("nome", nome);
    }, [nome]);

    useEffect(() => {
        sessionStorage.setItem("diasVencimento", diasVencimento);
    }, [diasVencimento]);

    useEffect(() => {
        sessionStorage.setItem("perecivel", isChecked);
    }, [isChecked]);

    // Atualiza sessionStorage ao alterar os campos
    const handleNomeChange = (e) => {
        setNome(e.target.value);
        sessionStorage.setItem("nome", e.target.value);
    };

    const handleDiasVencimentoChange = (e) => {
        setDiasVencimento(e.target.value);
        sessionStorage.setItem("diasVencimento", e.target.value);
    };

    const handleCheckboxChange = (novoValor) => {
        setIsChecked(novoValor === 1);
        sessionStorage.setItem("perecivel", novoValor === 1);
    
    };

    useEffect(() => {
        if (!isChecked) {
            setDiasVencimento(null);
        }
    }, [isChecked]);

    const API_BASE_URL = "http://localhost:8080";
    const salvarEdicao = async () => {
        try {
            // Usa o ID atual da unidade de medida e da categoria se o usuário não selecionou uma nova
            const unidadeMedidaId = itemUM?.id || produtoSelecionado.item.unidade_medida.id;
            const categoriaItemId = itemC?.id || produtoSelecionado.item.categoria.id;

            const itemUpdate = {
                nome,
                perecivel: isChecked,
                dias_vencimento: diasVencimento,
                ativo: true
            };

            const itemResponse = await fetch(`${API_BASE_URL}/itens/${produtoSelecionado.item.id}?unidadeMedidaId=${unidadeMedidaId}&categoriaItemId=${categoriaItemId}&idResponsavel=${idResponsavel}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemUpdate),
            });

            if (!itemResponse.ok) {
                errorToast("Erro ao atualizar Produto");
                throw new Error('Falha na atualização do item');
                return;
            } 
            else {
                successToast("Produto editado com sucesso");
                const toastDuration = 1000;
                setTimeout(() => {
                    sessionStorage.removeItem("produto_selecionado");
                    navigate("/configuracoes-de-produtos");
                }, toastDuration);
            }

            //     // Atualiza o produto somente se a atualização do item for bem-sucedida
            //     const produtoUpdate = {
            //         preco,
            //         qtdProduto,
            //         qtdMedida,
            //         ativo: true
            //     };

            //     const produtoResponse = await fetch(`${API_BASE_URL}/produtos/${produtoSelecionado.id}?idResponsavel=${idResponsavel}&fkItem=${produtoSelecionado.item.id}`, {
            //         method: 'PUT',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(produtoUpdate),
            //     });

            //     if (!produtoResponse.ok) {
            //         // errorToast("Erro ao atualizar produto");
            //         throw new Error('Falha na atualização do produto');
            //     }
            // }

            // successToast("Produto editado com sucesso");
            // const toastDuration = 1000;
            // setTimeout(() => {
            //     sessionStorage.removeItem("produto_selecionado");
            //     navigate("/configuracoes-de-produtos");
            // }, toastDuration);

        } catch (error) {
            console.error('Erro ao atualizar:', error);
        }
    };


    return (
        <div>
            <TopBar title={"Editando Produto"} showBackArrow={true} backNavigationPath={"/configuracoes-de-produtos"} />
            <div className={styles.divPrincipal}>
                <div className={styles.editarImagem}>
                    <ImageUploader />
                </div>
                <TextInput
                    label={"Nome: "}
                    placeholder={produtoSelecionado.item.nome}
                    value={nome}
                    onChange={handleNomeChange}
                />
                <RedirectionList
                    title={"Categoria"} value={itemC.id} hint={itemC.nome} redirectUrl={"/categoria-produto"}
                />

                <RedirectionList
                    title={"Unidade de medida"} value={itemUM.id} hint={itemUM.nome} redirectUrl={"/unidade-de-medida-do-produto"}
                />
                <div className={styles.divPerecivel}>
                    <span>Perecível: </span>
                    <Checkbox ticadaPorPadrao={isChecked ? 1 : 0} onChange={handleCheckboxChange} />
                </div>
                {isChecked && (
                <MeasurementUnitInput
                    measurementUnit={"dias para vencer"}
                    placeholder={produtoSelecionado.item.dias_vencimento}
                    type={Number}
                    value={diasVencimento}
                    onChange={handleDiasVencimentoChange}
                />
            )}
            </div>
            <div className={styles.divBotao}>
                <Button insideText={"Salvar edição"} onClick={salvarEdicao} />
            </div>
        </div>
    );
};

export default EditandoProduto;