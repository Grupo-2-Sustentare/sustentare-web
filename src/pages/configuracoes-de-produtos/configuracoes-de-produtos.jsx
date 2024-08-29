import styles from "../configuracoes-de-produtos/Configuracoes-de-produtos.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StreachList from "../../components/StrechList/StrechList";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

const ConfiguracoesProdutos = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-produto");
    };

    return (
        <div >
            <div className={styles.divBusca}>
                <TextInput/>
                <StreachList titulo=" "/>
            </div>
            <Button insideText="Cadastrar novo produto" onClick={handleSave}/>
        </div>
    );
};

export default ConfiguracoesProdutos;
