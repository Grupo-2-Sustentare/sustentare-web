import styles from "../configuracoes-de-produtos/Configuracoes-de-produtos.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StreachList from "../../components/StrechList/StrechList";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import IconInput from "../../components/IconInput/IconInput";
import Product from "../../components/ProductItem/Product";

const ConfiguracoesProdutos = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-produto");
    };

    return (
        <>
            <div className={styles.divTopBar}>
            <TopBar  title={"configurações de produtos"}/>
            </div>
            <div className={styles.divPrincipal}>
                
                <div className={styles.divFiltroEBusca}>
                    <IconInput/>
                    <StreachList titulo=" "/>
                </div>
                <Product name="Feijão" quantity="25 kilogramas"  showCheckbox={false} addressImg="https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/feijão.png"/>
                <Product name="Guarana" quantity="70 unidades"  showCheckbox={false} addressImg="https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/guarana.jpeg"/>
                <Product name="Coca-Cola" quantity="100 unidades"  showCheckbox={false} addressImg="https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/coca300.jpeg"/>
                <Product name="Sobrecoxa" quantity="85 kilogramas"  showCheckbox={false} addressImg="https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/sobrecoxa.jpg"/>
                <Product name="Água" quantity="110 unidades"  showCheckbox={false} />
                <Product name="Arroz" quantity="50 kilogramas"  showCheckbox={false} addressImg="https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/arroz.webp"/>
            </div>
            <div className={styles.divBotao}>
            <Button insideText="Cadastrar novo produto" onClick={handleSave}/>
            </div>
        </>
    );
};

export default ConfiguracoesProdutos;
