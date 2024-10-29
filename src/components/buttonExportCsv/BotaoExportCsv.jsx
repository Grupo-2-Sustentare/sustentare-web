import React from 'react';
import styles from "./buttonExportCsv.module.css"
import { errorToast, successToast } from "../Toast/Toast";

const DownloadButton = () => {
  const responsavelString = sessionStorage.getItem("responsavel");
  const responsavel = responsavelString ? JSON.parse(responsavelString) : null;

  const idResponsavel = responsavel ? responsavel.id : null;

  const downloadTxt = () => {
    fetch(`http://localhost:8080/interacoes-estoque/csv/${idResponsavel}`) // Alterando a URL para o endpoint correto
      .then(response => {
        if (response.ok) {
          successToast("Arquivo csv exportado com sucesso");
          return response.blob(); // Recebe o arquivo como blob
        }
        errorToast("Erro ao baixar o arquivo")
        throw new Error('Erro ao baixar o arquivo');
      })
      .then(blob => {
        // Adiciona o BOM ao início do conteúdo
        const bom = "\uFEFF";
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result;
          const blobWithBom = new Blob([bom + content], { type: 'text/csv;charset=utf-8;' });
          const url = window.URL.createObjectURL(blobWithBom);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'arquivo.csv');
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        };
        reader.readAsText(blob);
      })
      .catch(error => console.error('Erro ao baixar o arquivo:', error));
  };

  return (
    <button className={styles.button} onClick={downloadTxt}>Exportar CSV</button>
  );
};

export default DownloadButton;
