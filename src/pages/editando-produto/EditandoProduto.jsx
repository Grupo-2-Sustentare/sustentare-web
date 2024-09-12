import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../components/StrechList/StrechList"
import TextInput from "../../components/TextInput/TextInput"
import styles from "./EditandoProduto.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../components/TopBar/TopBar"
import Button from "../../components/Button/Button";
import ImageUploader from "../../components/ImageUploader/ImageUploader"

const EditandoProduto = () => {

    const githubPath = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"

    return (
        <div>
            <TopBar title={"Editando Produto"} />
            <div className={styles.divPrincipal}>
                <div className={styles.editarImagem}>
                    <ImageUploader oldImage={githubPath + "feijão.png"}/>
                </div>
                {/* <div className={styles.TextInput}> */}
                    <TextInput label={"Nome: "} />
                {/* </div> */}
               
                <StreachList title={"Categoria"} />
                <StreachList title={"Unidade de medida: "}/>

                <div className={styles.divPerecivel}>
                    <span>Perecível: </span>
                    <Checkbox />
                </div>

                <MeasurementUnitInput measurementUnit={"dias para vencer"}/>
                
            </div>
                <div className={styles.divBotao}>
                    <Button insideText={"Salvar edição"}/>
                </div>
        </div>
    );
};

export default EditandoProduto;
