import React from 'react';
import styles from "./Configuracoes.module.css";
import TopBar from "../../components/TopBar/TopBar";
import TextSizeSlider from '../../components/TextSizeSlider/TextSizeSlider';

export default function Configuracoes() {
    return (
        <div className={styles.Global}>
            <TopBar title={"Configurações"} showBackArrow={true} />
            <div className={styles.Configuracoes}>
                <span className={styles.H3}>
                    Acessibilidade
                </span>
                <span className={styles.H4}>
                    Tamanho do texto
                </span>
                <TextSizeSlider />
            </div>
            <div className={styles.Versao}>
                <span className={styles.H4}>Versão 1.0 - 2024</span>
            </div>
        </div>
    );
}

