import styles from "./ConfiguracoesCategoria.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StreachList from "../../components/StrechList/StrechList";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import IconInput from "../../components/IconInput/IconInput";
import Product from "../../components/ProductItem/Product";

const ConfiguracoesCategorias = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-produto");
    };

    return (
        <>
            <TopBar title={"configurações de categorias"}/>
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput/>
                    <StreachList titulo=" "/>
                </div>
                <Product name="Sobremesa encomenda" showCheckbox={false} addressImg="https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/categorias/doces%20encomenda.jpg"/>
                <Product name="Bebidas" showCheckbox={false} addressImg="https://github.com/Grupo-2-Sustentare/sustentare-web/blob/main/src/assets/images/categorias/bebidas.jpg?raw=true"/>
                <Product name="self-service" showCheckbox={false} addressImg="https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/categorias/Self%20service.png"/>
                <Product name="Descartaveis" showCheckbox={false} addressImg="https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/categorias/descartaveis.jpg"/>
            </div>
            <div className={styles.divBotao}>
            <Button insideText="Cadastrar nova categoria" onClick={handleSave}/>
            </div>
        </>
    );
};

export default ConfiguracoesCategorias;
