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
        <div>
            <TopBar title={"configurações de categorias"}/>
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput/>
                    <StreachList titulo=" "/>
                </div>
                <Product title="Sobremesa" showCheckbox={false} />
                <Product title="Balcão" showCheckbox={false} />
                <Product title="self-service" showCheckbox={false} />
                <Product title="Bebidas" showCheckbox={false} />
            </div>
            <div className={styles.divBotao}>
            <Button insideText="Cadastrar nova categoria" onClick={handleSave}/>
            </div>
        </div>
    );
};

export default ConfiguracoesCategorias;
