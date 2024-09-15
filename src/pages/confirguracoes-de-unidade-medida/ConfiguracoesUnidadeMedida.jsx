import styles from "./ConfiguracoesUnidadeMedida.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import StreachList from "../../components/StrechList/StrechList";
import Button from "../../components/Button/Button";
import TopBar from "../../components/TopBar/TopBar";
import IconInput from "../../components/IconInput/IconInput";
import Product, { DEFAULT_BUTTON_CONFIG } from "../../components/ProductItem/Product";

// Constante JSON mockada
const MOCK_UNIDADES = [
    { nome: "Mililitro", tipo: "Volume", abreviacao: "ml", icone: "fa-cube" },
    { nome: "Quilograma", tipo: "Massa", abreviacao: "kg", icone: "fa-hippo" },
    { nome: "Sacas", tipo: "Massa", abreviacao: "sacas", icone: "fa-hippo" },
    { nome: "Quantidade Genérica", tipo: "Massa", abreviacao: "unidades", icone: "fa-circle" },
    { nome: "Quantidade Genérica", tipo: "Massa", abreviacao: "unidades", icone: "fa-circle" }
];

const ConfiguracoesUnidadeMedida = () => {
    const navigate = useNavigate();
    const handleSave = () => {
        navigate("/criando-unidade-medida");
    };

    let actioUnidadeMedida = { ...DEFAULT_BUTTON_CONFIG };
    actioUnidadeMedida.yellow.action = () => { navigate("/editando-unidade-de-medida") };

    // Var que em algum momento vai deixar de receber o mock para se tornar dinâmica
    let unidades = MOCK_UNIDADES;

    return (
        <>
            <TopBar title={"configurações de Unidade de Medida"} showBackArrow={true} backNavigationPath={"/configuracoes-de-estoque"} />
            <div className={styles.divPrincipal}>
                <div className={styles.divFiltroEBusca}>
                    <IconInput />
                    <StreachList showTitle={false} titulo=" " />
                </div>
                <hr></hr>
                {unidades.map(u => {
                    return (
                        <Product
                            key={u.nome}
                            addressImg={false}
                            name={u.nome}
                            quantity={[`Tipo: ${u.tipo}`, <br />, `Abreviação: ${u.abreviacao}`]}
                            showCheckbox={false}
                            icon={u.icone}
                            buttonsConfig={actioUnidadeMedida}
                        />
                    );
                })}
            </div>
            <div className={styles.divBotao}>
                <Button insideText="Cadastrar nova unidade de medida" onClick={handleSave} />
            </div>
        </>
    );
};

export default ConfiguracoesUnidadeMedida;