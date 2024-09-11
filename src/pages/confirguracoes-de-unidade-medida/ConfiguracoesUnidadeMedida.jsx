import styles from "./ConfiguracoesUnidadeMedida.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StreachList from "../../components/StrechList/StrechList";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import IconInput from "../../components/IconInput/IconInput";
import Product from "../../components/ProductItem/Product";

const ConfiguracoesUnidadeMedida = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-unidade-medida");
    };

    return (
        <>
            <TopBar title={"configurações de Unidade de Medida"}/>
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput/>
                    <StreachList showTitle={false} titulo=" "/>
                </div>
                <Product addressImg={false} name="Mililitro"  quantity={["Tipo: Volume", <br />, "Abreviação: ml"]}  showCheckbox={false} icon="fa-solid fa-cube" />
                <Product addressImg={false} name="Quilograma"    quantity={["Tipo: Massa", <br />, "Abreviação: kg"]}  showCheckbox={false} icon="fa-solid fa-hippo"/>
                <Product addressImg={false} name="Sacas"    quantity={["Tipo: Massa", <br />, "Abreviação: kg"]}  showCheckbox={false} icon="fa-solid fa-hippo"/>
                <Product addressImg={false} name="Quantidade Genérica"    quantity={["Tipo: Massa", <br />, "Abreviação: sacas"]}  showCheckbox={false} icon="fa-solid fa-circle"/> 
            </div>
            <div className={styles.divBotao}>
            <Button insideText="Cadastrar nova unidade de medida" onClick={handleSave}/>
            </div>
        </>
    );
};

export default ConfiguracoesUnidadeMedida;
