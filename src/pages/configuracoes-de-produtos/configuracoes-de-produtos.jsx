import styles from "../configuracoes-de-produtos/Configuracoes-de-produtos.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StreachList from "../../components/StrechList/StrechList";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import IconInput from "../../components/IconInput/IconInput";
import ProductItem from "../../components/ProductItem/ProductItem"

const ConfiguracoesProdutos = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-produto");
    };

    return (
        <div>
            <TopBar title={"configurações de produtos"}/>
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput/>
                    <StreachList titulo=" "/>
                </div>
                <ProductItem title="Feijão" weight="25 kilogramas"  showCheckbox={false} />
                <ProductItem title="Frango" weight="15 kilogramas"  showCheckbox={false} />
                <ProductItem title="Coca-Cola" weight="100 unidades"  showCheckbox={false} />
                <ProductItem title="Pepsi" weight="85 unidades"  showCheckbox={false} />
                <ProductItem title="Água" weight="110 unidades"  showCheckbox={false} />
                <ProductItem title="Arroz" weight="50 kilogramas"  showCheckbox={false} />
            </div>
            <div className={styles.divBotao}>
            <Button insideText="Cadastrar novo produto" onClick={handleSave}/>
            </div>
        </div>
    );
};

export default ConfiguracoesProdutos;
