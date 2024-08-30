import styles from "../configuracoes-de-produtos/Configuracoes-de-produtos.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StreachList from "../../components/StrechList/StrechList";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import IconInput from "../../components/IconInput/IconInput";

const ConfiguracoesProdutos = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-produto");
    };

    return (
        <div>
            <TopBar title={"configurações de produtos"}/>
            <div className={styles.divPrincipal}>
                <div>
                    <IconInput/>
                    <StreachList titulo=" "/>
                </div>

            <div className={styles.divBusca}>
                <TextInput/>
                <StreachList titulo=" "/>
            </div>
            <Button insideText="Cadastrar novo produto" onClick={handleSave}/>
            </div>
        </div>
    );
};

export default ConfiguracoesProdutos;
