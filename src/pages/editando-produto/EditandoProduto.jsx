import { Navigate, useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../components/StrechList/StrechList"
import TextInput from "../../components/TextInput/TextInput"
import styles from "./EditandoProduto.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../components/TopBar/TopBar"
import Button from "../../components/Button/Button";
import ImageUploader from "../../components/ImageUploader/ImageUploader"
import { successToast } from "../../components/Toast/Toast";

const EditandoProduto = () => {
    const navigate = useNavigate();

    function salvarEdicao(){
        successToast("Produto editado com sucesso")
        const toastDuration = 1000;
        setTimeout(() => {
         navigate("/configuracoes-de-produtos");
       }, toastDuration);
     }

    const githubPath = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"

    return (
        <div>
            <TopBar title={"Editando Produto"} showBackArrow={true} backNavigationPath={"/configuracoes-de-produtos"}/>
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
                    <Button insideText={"Salvar edição"} onClick={salvarEdicao}/>
                </div>
        </div>
    );
};

export default EditandoProduto;
