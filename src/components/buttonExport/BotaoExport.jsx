import React from 'react';
import styles from "./buttonExport.module.css"
import { errorToast, successToast } from "../../components/Toast/Toast";

const DownloadButton = () => {
  const downloadTxt = () => {
    fetch('http://localhost:8080/itens/exportarTxt') // Alterando a URL para o endpoint correto
      .then(response => {
        if (response.ok) {
          successToast("Arquivo txt exportado com sucesso");
          return response.blob(); // Recebe o arquivo como blob
        }
        errorToast("Erro ao baixar o arquivo")
        throw new Error('Erro ao baixar o arquivo');
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob])); // Cria a URL do blob
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'arquivo.txt'); // Nome do arquivo que será baixado
        document.body.appendChild(link);
        link.click(); // Simula o clique para iniciar o download
        link.parentNode.removeChild(link); // Remove o link depois do clique
      })
      .catch(error => console.error('Erro ao baixar o arquivo:', error));
  };

  return (
    <button className={styles.button} onClick={downloadTxt}>Exportar TXT</button>
  );
};

export default DownloadButton;
