import styles from "./TelaParaNegarDelecao.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../api";
import Button from "../../components/Button/Button";
import TopBar from "../../components/TopBar/TopBar";
import Product from "../../components/ProductItem/Product";
import { successToast } from "../../components/Toast/Toast";

const NegarDelecao = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { itensAssociados = [], tipoRecurso = "recurso" } = location.state || {};
    const { oQueQuerDeletar = "" } = location.state || {};

    const handleInfo = () => {
        navigate("/configuracoes-de-estoque");
    };

    // Limita a exibição dos itens a no máximo 6
    const itensExibidos = itensAssociados.slice(0, 6);
    const itensRestantes = itensAssociados.length - 6;
    
    return (
        <>
            <TopBar title={"Não foi possível deletar"} showBackArrow={false} />
            <div className={styles.divPrincipal}>
                <div className={styles.principal}>
                    <span>
                        Não será possível deletar a {tipoRecurso} <strong>{oQueQuerDeletar}</strong>, por causa de:
                    </span>
                    <hr />
                    <div className={styles.lista}>
                        {itensExibidos.map((item, index) => (
                            <li key={index}>{item.nome}</li>
                        ))}
                        {itensAssociados.length > 6}
                        {itensRestantes > 0 && (
                            <span>...mais {itensRestantes} produto{itensRestantes > 1 ? "s" : ""}</span>
                        )}
                    </div>
                    <div className={styles.instrucoes}>
                        Para deletar a {tipoRecurso}, você pode seguir deletando os produtos associados ou
                        atualizá-los para outra {tipoRecurso}.
                    </div>
                </div>
            </div>
            <div className={styles.divBotao}>
                <Button insideText="Ok" onClick={handleInfo} />
            </div>
        </>
    );
};

export default NegarDelecao;
