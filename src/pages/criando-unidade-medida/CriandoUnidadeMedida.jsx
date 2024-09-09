import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../components/StrechList/StrechList"
import TextInput from "../../components/TextInput/TextInput"
import styles from "./CriandoUnidadeMedida.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../components/TopBar/TopBar"
import Button from "../../components/Button/Button";
import ImageUploader from "../../components/ImageUploader/ImageUploader"

const CriandoUnidadeMedida = () => {


    return (
        <div>
            <TopBar title={"Criando Unidade de Medida"} />
            <div className={styles.divPrincipal}>

                <div className={styles.TextInput}>
                    <h4>Nome:</h4>
                    <TextInput />
                </div>
                <div className={styles.TextInput}>
                    <h4>Abreviação no singular:</h4>
                    <StreachList titulo="" />
                </div>
                <div className={styles.TextInput}>
                    <h4>Abreviação no plural:</h4>
                    <StreachList titulo="" />
                </div>
                <div className={styles.TextInput}>
                    <h4>Tipo:</h4>
                    <StreachList titulo="" />
                </div>

                <div className={styles.divMeasumentTextInput}>
                    <h4>Uma libra equivale a</h4>
                    <MeasurementUnitInput />
                </div>
                
                
            </div>
                <div className={styles.divBotao}>
                    <Button insideText={"Salvar nova unidade de medida"}/>
                </div>
        </div>
    );
};

export default CriandoUnidadeMedida;
