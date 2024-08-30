import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../components/StrechList/StrechList"
import TextInput from "../../components/TextInput/TextInput"
import styles from "./CriandoProduto.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../components/TopBar/TopBar"
import Button from "../../components/Button/Button";

const CriandoProduto = () => {


    return (
        <div>
            <TopBar title={"Criando Novo Produto"} />
            <div className={styles.divPrincipal}>
                
                <div className={styles.TextInput}>
                    <h4>Nome:</h4>
                    <TextInput />
                </div>
                <div className={styles.TextInput}>
                    <h4>Categoria</h4>
                    <StreachList titulo="" />
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
                <div className={styles.divBotao}>
                    <Button insideText={"Salvar produto"}/>
                </div>
                
            </div>
        </div>
    );
};

export default CriandoProduto;
