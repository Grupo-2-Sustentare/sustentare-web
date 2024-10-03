import styles from "./ConfiguracoesCategoria.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ListItem from "../../../../components/ListItem/ListItem";
import StreachList from "../../../../components/StrechList/StrechList";
import Button from "../../../../components/Button/Button";
import TextInput from "../../../../components/TextInput/TextInput";
import TopBar from "../../../../components/TopBar/TopBar";
import RedirectionList from "../../../../components/RedirectionList/RedirectionList";
import IconInput from "../../../../components/IconInput/IconInput";
import Product, { DEFAULT_BUTTON_CONFIG } from "../../../../components/ProductItem/Product";

const ConfiguracoesCategorias = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-nova-categoria");
    };

    const categoriaLista = [
        "Sobremesa encomenda", "Bebidas",
        "Self-service", "Descartaveis"
    ]
    
    let actioCategoria = DEFAULT_BUTTON_CONFIG
    actioCategoria.yellow.style = {}
    actioCategoria.yellow.icon = "fa-solid fa-pen"
    actioCategoria.yellow.iconFillInvert = false
    actioCategoria.yellow.text = "Editar"
    actioCategoria.yellow.action = ()=>{navigate("/editando-categoria")}

    return (
        <>
            <TopBar title={"configurações de categorias"} showBackArrow={true} backNavigationPath={"/configuracoes-de-estoque"}/>
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput/>
                    <StreachList showTitle={false} titulo=" "/>
                </div>
                <hr></hr>
                <div className={styles.principal}>
                     {categoriaLista.map(categoria=>{
                        return <Product name={categoria} showImageOrIcon={false}/>
                      })}
                </div>
            </div>
            <div className={styles.divBotao}>
            <Button insideText="Cadastrar nova categoria" onClick={handleSave}/>
            </div>
        </>
    );
};

export default ConfiguracoesCategorias;
