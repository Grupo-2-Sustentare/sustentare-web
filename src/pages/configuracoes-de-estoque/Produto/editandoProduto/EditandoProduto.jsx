import { Navigate, useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../../../components/StrechList/StrechList"
import RedirectionList from "../../../../components/RedirectionList/RedirectionList";
import TextInput from "../../../../components/TextInput/TextInput"
import styles from "./EditandoProduto.module.css";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../../../components/TopBar/TopBar"
import Button from "../../../../components/Button/Button";
import ImageUploader from "../../../../components/ImageUploader/ImageUploader"
import { successToast } from "../../../../components/Toast/Toast";

const EditandoProduto = () => {
    const navigate = useNavigate();
   // Define um valor padrão para o item

   sessionStorage.paginaRequisicao = "/editando-produto"

   const defaultItem = {
    heading: "Selecione...",
    subheading: "Sem informação disponível"
    };

    // Verifica se o item existe no sessionStorage e faz o parse, ou usa o valor padrão
    let itemUM = defaultItem;
    let itemC = defaultItem;

    const storedUnidadeMedida = sessionStorage.getItem("selectedUnidadeMedida");
    const storedCategoria = sessionStorage.getItem("selectedCategoria");

    if (storedUnidadeMedida) {
        try {
            itemUM = JSON.parse(storedUnidadeMedida) || defaultItem; // Se o parse falhar, usa o defaultItem
        } catch (error) {
            // Se o parse falhar, o item será o defaultItem
            itemUM = defaultItem;
        }
    }
    if (storedCategoria) {
        try {
            itemC = JSON.parse(storedCategoria) || defaultItem; // Se o parse falhar, usa o defaultItem
        } catch (error) {
            // Se o parse falhar, o item será o defaultItem
            itemC = defaultItem;
        }
    }

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
               
                <RedirectionList
                    title={"Categoria"} hint={itemC.heading} redirectUrl={"/categoria-produto"}
                />
                <RedirectionList
                    title={"Unidade de medida"} hint={itemUM.heading} redirectUrl={"/unidade-de-medida-do-produto"}
                />

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
