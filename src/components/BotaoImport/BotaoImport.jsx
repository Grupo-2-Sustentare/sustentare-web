import React, { useState } from 'react';

const ImportTxtButton = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadTxt = () => {
    if (!file) {
      alert('Selecione um arquivo primeiro');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/lambdaTest/importarTxt', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          alert('Arquivo enviado com sucesso');
        } else {
          alert('Erro ao enviar o arquivo');
        }
      })
      .catch(error => console.error('Erro ao enviar o arquivo:', error));
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button onClick={uploadTxt}>Importar TXT</button>
    </div>
  );
};

export default ImportTxtButton;