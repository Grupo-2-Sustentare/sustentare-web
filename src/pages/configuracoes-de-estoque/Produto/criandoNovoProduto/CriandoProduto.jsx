import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useEffect, useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StrechList from "../../../../components/StrechList/StrechList";
import RedirectionList from "../../../../components/RedirectionList/RedirectionList";
import TextInput from "../../../../components/TextInput/TextInput"
import styles from "./CriandoProduto.module.css";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../../../components/TopBar/TopBar"
import Button from "../../../../components/Button/Button";
import ImageUploader from "../../../../components/ImageUploader/ImageUploader"
import api from "../../../../api";
import { successToast } from "../../../../components/Toast/Toast";
import { faL } from "@fortawesome/free-solid-svg-icons";

const CriandoProduto = () => {
    const navigate = useNavigate()
    sessionStorage.paginaRequisicao = "/criando-produto"
    const responsavelString = sessionStorage.getItem("responsavel");
    const responsavel = responsavelString ? JSON.parse(responsavelString) : null; 
    const idResponsavel = responsavel ? responsavel.id : null;
    const [imagem, setImagem] = useState(null);

    const defaultItem = {
        heading: "Selecione...",
        subheading: "Sem informação disponível"
    };

    // Verifica se o item existe no sessionStorage e faz o parse, ou usa o valor padrão
    let itemUM = "";
    let itemC = "";

    const storedUnidadeMedida = sessionStorage.getItem("selectedUnidadeMedida");
    const storedCategoria = sessionStorage.getItem("selectedCategoria");

    if (storedUnidadeMedida) {
        try {
            itemUM = JSON.parse(storedUnidadeMedida) || null; // Se o parse falhar, usa o defaultItem
        } catch (error) {
            // Se o parse falhar, o item será o defaultItem
            itemUM = null;
        }
    }
    if (storedCategoria) {
        try {
            itemC = JSON.parse(storedCategoria) || null; // Se o parse falhar, usa o defaultItem
        } catch (error) {
            // Se o parse falhar, o item será o defaultItem
            itemC = null;
        }
    }

    const [preco, setPreco] = useState(0);
    const [qtdProduto, setQtdProduto] = useState(0);
    const [qtdProdutoTotal, setQtdProdutoTotal] = useState(0);
    const [qtdMedida, setQtdMedida] = useState(0);

    const [nome, setNome] = useState(sessionStorage.getItem("nome") || "");
    const [diasVencimento, setDiasVencimento] = useState(sessionStorage.getItem("diasVencimento") || "");
    const [isChecked, setIsChecked] = useState(
        JSON.parse(sessionStorage.getItem("perecivel")) || false
    );

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

    var itemId = 0;

    function Salvar() {
        console.log(isChecked)
        const item = {
            nome,
            perecivel: isChecked,
            dias_vencimento: diasVencimento,
            imagem: imagem,
            ativo: true
        };
    
        const produto = {
            preco: preco,
            qtdProduto: qtdProduto,
            qtdProdutoTotal: qtdProdutoTotal,
            qtdMedida: qtdMedida,
            ativo: true
        };
    
        // Primeiro, cria o item
        api.post(`/itens?unidadeMedidaId=${itemUM.id}&categoriaItemId=${itemC.id}&idResponsavel=${idResponsavel}`, item)
            .then((response) => {
                itemId = response.data.id;
                // console.log(response.data.id)
            })
            .then(() => {
                // successToast("Item criado com sucesso");
                // setTimeout(() => {
                //     navigate("/configuracoes-de-produtos");
                // }, 1000);
                api.post(`/produtos?idResponsavel=${idResponsavel}&fkItem=${itemId}`, produto)
                .then((response) => {
                    console.log(response)
                })
                .then(() => {
                    successToast("Produto criado com sucesso");
                    const toastDurationImagem = 2000 
                    setTimeout(() => {
                        successToast("Pode levar alguns instantes para atualizar a imagem");
                    }, toastDurationImagem);
                    setTimeout(() => {
                        navigate("/configuracoes-de-produtos");
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Erro ao criar o produto:", error);
                    // Adicione um toast de erro ou outra lógica de tratamento de erros aqui
                });
            })
            .catch((error) => {
                console.error("Erro ao criar o produto:", error);
                // Adicione um toast de erro ou outra lógica de tratamento de erros aqui
            });

    }

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleImageChange = async (file) => {
        if (file) {
            const base64Image = await toBase64(file);
            setImagem(base64Image);
        }
    };

    return (
        <div>
            <TopBar title={"Criando Novo Produto"} showBackArrow={true} backNavigationPath={"/configuracoes-de-produtos"} />
            <div className={styles.divPrincipal}>
                <ImageUploader onImageSelect={handleImageChange}/>
                <div className={styles.TextInput}>
                    <TextInput 
                    label="Nome:" 
                    value={nome}
                    onChange={handleNomeChange}
                    />
                </div>
                <div className={styles.TextInput}>

                    {/* <StrechList title="Categoria"/> */}
                    <RedirectionList
                        title={"Categoria"} value={itemC.id} hint={itemC.nome} redirectUrl={"/categoria-produto"}
                    />
                </div>
                <div className={styles.TextInput}>
                    {/* <StrechList title="Unidade de medida:"/> */}
                    <RedirectionList
                        title={"Unidade de medida"} value={itemUM.id} hint={itemUM.nome} redirectUrl={"/unidade-de-medida-do-produto"}
                    />
                </div>

                <div className={styles.divPerecivel}>
                    <p>Perecível</p>
                    <Checkbox ticadaPorPadrao={isChecked ? 1 : 0} onChange={handleCheckboxChange} />
                </div>

                {isChecked && (
                <MeasurementUnitInput
                    measurementUnit={"dias para vencer"}
                    type={Number}
                    value={diasVencimento}
                    onChange={handleDiasVencimentoChange}
                />
            )}
            </div>
            <div className={styles.divBotao}>
                <Button insideText={"Salvar novo produto"} onClick={Salvar} />
            </div>
        </div>
    );
};

export default CriandoProduto;
