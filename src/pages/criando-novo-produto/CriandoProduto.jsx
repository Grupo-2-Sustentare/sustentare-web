import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../components/StrechList/StrechList"
import TextInput from "../../components/TextInput/TextInput"

const CriandoProduto = () => {

   
    

    return (
        <div id="root">
            <div >
                <TextInput/>
                <StreachList titulo=" "/>
            </div>
        </div>
    );
};

export default CriandoProduto;
