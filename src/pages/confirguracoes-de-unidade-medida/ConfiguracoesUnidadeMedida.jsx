import styles from "./ConfiguracoesUnidadeMedida.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StreachList from "../../components/StrechList/StrechList";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import IconInput from "../../components/IconInput/IconInput";

const ConfiguracoesUnidadeMedida = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-produto");
    };

    return (
        <div>
            <TopBar title={"configurações de Unidade de Medida"}/>
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput/>
                    <StreachList titulo=" "/>
                </div>

            </div>
            <div className={styles.divBotao}>
            <Button insideText="Cadastrar nova unidade de medida" onClick={handleSave}/>
            </div>
        </div>
    );
};

export default ConfiguracoesUnidadeMedida;
