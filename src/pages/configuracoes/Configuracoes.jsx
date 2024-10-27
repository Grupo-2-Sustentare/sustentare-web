import React from 'react';
import styles from "./Configuracoes.module.css";
import TopBar from "../../components/TopBar/TopBar";
import TextSizeSlider from '../../components/TextSizeSlider/TextSizeSlider';
import BotaoExport from '../../components/buttonExport/BotaoExport'
import BotaoImport from '../../components/BotaoImport/BotaoImport'
import BotaoExportCsv from '../../components/buttonExportCsv/BotaoExportCsv'

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
                <div className={styles.linha}></div>
                <div className={styles.ImportExport}>
                    <div className={styles.Export}>
                        <span className={styles.H3}>
                            Exportação:
                        </span>
                        <span className={styles.H4}>
                            Exportar todos os produtos em um arquivo texto ou csv para utilizar como backup.   
                        </span>
                        <BotaoExport/>
                        <BotaoExportCsv/>
                    </div>
                    <div className={styles.Import}>
                        <span className={styles.H3}>
                            Importação:
                        </span>
                        <span className={styles.H4}>
                            Importar produtos de um arquivo texto armazenado como backup anteriormente.
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

