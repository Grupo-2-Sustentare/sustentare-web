import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StrechList from "../../../../components/StrechList/StrechList";
import RedirectionList from "../../../../components/RedirectionList/RedirectionList";
import TextInput from "../../../../components/TextInput/TextInput"
import styles from "./CriandoProduto.module.css";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../../../components/TopBar/TopBar"
import Button from "../../../../components/Button/Button";
import ImageUploader from "../../../../components/ImageUploader/ImageUploader"
import { successToast } from "../../../../components/Toast/Toast";

const CriandoProduto = () => {
    const navigate = useNavigate()
    let p = JSON.parse(sessionStorage.getItem("productBeingCreated"))

    function Salvar(){
        successToast("Produto criado com sucesso")
        const toastDuration = 1000;
        setTimeout(() => {
         navigate("/configuracoes-de-produtos");
       }, toastDuration);
    }

    return (
        <div>
            <TopBar title={"Criando Novo Produto"} showBackArrow={true} backNavigationPath={"/configuracoes-de-produtos"}/>
            <div className={styles.divPrincipal}>
                <ImageUploader/>
                <div className={styles.TextInput}>
                    <TextInput label="Nome:"/>
                </div>
                <div className={styles.TextInput}>
                 
                    {/* <StrechList title="Categoria"/> */}
                    <RedirectionList
                    title={"Categoria"} redirectUrl={"/categoria-produto"}
                />
                </div>
                <div className={styles.TextInput}>
                    {/* <StrechList title="Unidade de medida:"/> */}
                    <RedirectionList
                    title={"Unidade de medida"} redirectUrl={"/unidade-de-medida-do-produto"}
                />
                </div>

                <div className={styles.divPerecivel}>
                    <p>Perecível</p>
                    <Checkbox />
                </div>

                <MeasurementUnitInput measurementUnit="dias para vencer"/>
                
            </div>
                <div className={styles.divBotao}>
                    <Button insideText={"Salvar novo produto"} onClick={Salvar} />
                </div>
        </div>
    );
};

export default CriandoProduto;