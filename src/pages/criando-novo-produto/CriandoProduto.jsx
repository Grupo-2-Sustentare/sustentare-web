import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../components/StrechList/StrechList"
import TextInput from "../../components/TextInput/TextInput"
import  styles from "./CriandoProduto.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import MeasurementTextInput from "../../components/MeasumentTextInput/MeasurementTextInput"
import MenuSuperior from "../../components/MenuSuperior/menuSuperior"

const CriandoProduto = () => {

   
    return (
        <div className={styles.divPrincipal}>
            <MenuSuperior/>
            <div className={styles.TextInput}>
                <h4>Nome:</h4>
                <TextInput/>
            </div>
            <div  className={styles.TextInput}>
                <h4>Categoria</h4>
                <StreachList titulo=""/>
            </div>
            <div  className={styles.TextInput}>
                <h4>Unidade de medida:</h4>
                <StreachList titulo=""/>
            </div>
            
                <div className={styles.divPerecivel}>
                    <h4>Perecível</h4>
                    <Checkbox/>
                </div>

                <MeasurementTextInput/>
        </div>
    );
};

export default CriandoProduto;
