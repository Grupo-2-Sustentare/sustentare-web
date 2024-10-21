import React from 'react';
import styles from "./Configuracoes.module.css";
import TopBar from "../../components/TopBar/TopBar";
import TextSizeSlider from '../../components/TextSizeSlider/TextSizeSlider';
import BotaoExport from '../../components/buttonExport/BotaoExport'
import BotaoImport from '../../components/BotaoImport/BotaoImport'

export default function Configuracoes() {
    return (
        <div className={styles.Global}>
            <TopBar title={"Configurações"}/>
            <div className={styles.Configuracoes}>
                <span className={styles.H3}>
                    Acessibilidade
                </span>
                <span className={styles.H4}>
                    Tamanho do texto
                </span>
                <TextSizeSlider />
                <div className={styles.ImportExport}>
                    <div className={styles.Export}>
                        <span className={styles.H3}>
                            Exportar todos os produtos:
                        </span>
                        <span className={styles.H4}>
                            Exportar todos os produtos existentes no sistema para um arquivo txt
                        </span>
                        <BotaoExport/>
                    </div>
                    <div className={styles.Import}>
                        <span className={styles.H3}>
                            Importar produtos:
                        </span>
                        <span className={styles.H4}>
                            Importar produtos para o sistema 
                        </span>
                        <BotaoImport/>
                    </div>

                </div>
            </div>
            <div className={styles.Versao}>
                <span className={styles.H4}>Versão 1.0 - 2024</span>
            </div>
        </div>
    );
}

