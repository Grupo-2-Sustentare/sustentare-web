import React, { useState } from 'react';
import styles from "./buttonImport.module.css";

const ImportTxtButton = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const uploadTxt = () => {
    if (!file) {
      alert('Selecione um arquivo primeiro');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/itens/importarTxt', {
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
      <label className={styles.customFileUpload}>
        Escolher Arquivo txt
        <input className={styles.inputFile} type="file" accept=".txt" onChange={handleFileChange} />
      </label>
      {file && <p className={styles.fileName}>{file.name}</p>}
      <button className={styles.button} onClick={uploadTxt}>confirmar envio</button>
    </div>
  );
};

export default ImportTxtButton;
