import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../components/StrechList/StrechList"
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import TextInput from "../../components/TextInput/TextInput"
import styles from "./CriandoProduto.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../components/TopBar/TopBar"
import Button from "../../components/Button/Button";
import ImageUploader from "../../components/ImageUploader/ImageUploader"

const CriandoProduto = () => {
    const navigate = useNavigate()
    let p = JSON.parse(sessionStorage.getItem("productBeingCreated"))

    return (
        <div>
            <TopBar title={"Criando Novo Produto"} />
            <div className={styles.divPrincipal}>
                <ImageUploader/>
                <div className={styles.TextInput}>
                    <h4>Nome:</h4>
                    <TextInput />
                </div>
                <div className={styles.TextInput}>
                    <h4>Categoria</h4>
                    {/* <StreachList titulo="" /> */}
                    <RedirectionList
                    title={"Categoria"} hint={p.categoria} redirectUrl={"/categoria-produto"}
                />
                </div>
                <div className={styles.TextInput}>
                    <h4>Unidade de medida:</h4>
                    <StreachList titulo="" />
                </div>

                <div className={styles.divPerecivel}>
                    <h4>Perecível</h4>
                    <Checkbox />
                </div>

                <MeasurementUnitInput />
                
            </div>
                <div className={styles.divBotao}>
                    <Button insideText={"Salvar novo produto"}/>
                </div>
        </div>
    );
};

export default CriandoProduto;
