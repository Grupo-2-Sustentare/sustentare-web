import React from 'react';

const DownloadButton = () => {
  const downloadTxt = () => {
    fetch('http://localhost:8080/lambdaTest/txt') // Alterando a URL para o endpoint correto
      .then(response => {
        if (response.ok) {
          return response.blob(); // Recebe o arquivo como blob
        }
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
    <button onClick={downloadTxt}>Exportar TXT</button>
  );
};

export default DownloadButton;
