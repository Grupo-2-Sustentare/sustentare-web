import styles from "./ConfiguracoesUnidadeMedida.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StreachList from "../../components/StrechList/StrechList";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import IconInput from "../../components/IconInput/IconInput";
import ProductItem from "../../components/ProductItem/ProductItem"

const ConfiguracoesUnidadeMedida = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-unidade-medida");
    };

    return (
        <div>
            <TopBar title={"configurações de Unidade de Medida"}/>
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput/>
                    <StreachList titulo=" "/>
                </div>
                <ProductItem title="Mililitro"    weight={["Tipo: Volume", <br />, "Abreviação: ml"]}  showCheckbox={false} />
                <ProductItem title="Quilograma"    weight={["Tipo: Massa", <br />, "Abreviação: kg"]}  showCheckbox={false} />
                <ProductItem title="Sacas"    weight={["Tipo: Massa", <br />, "Abreviação: kg"]}  showCheckbox={false} />
                <ProductItem title="Quilograma"    weight={["Tipo: Massa", <br />, "Abreviação: sacas"]}  showCheckbox={false} />
                <ProductItem title="Pack de refrigerante"    weight={["Tipo: Genérico", <br />, "Abreviação: packs"]}  showCheckbox={false} />
            </div>
            <div className={styles.divBotao}>
            <Button insideText="Cadastrar nova unidade de medida" onClick={handleSave}/>
            </div>
        </div>
    );
};

export default ConfiguracoesUnidadeMedida;
