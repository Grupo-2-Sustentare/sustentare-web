// Importa toast para exibir mensagens de sucesso ou erro
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from "../components/itemMenu/itemMenu.jsx";
import T from "../components/Toast/toastSucesso.jsx"

const ItemDoMenu = () => {
    const [inputValue, setInputValue] = useState('');
    return (
        <div>
            <Input icon={"question-circle"} title="Usuário" />
            <T icon={"circle-check"} title="Entrada registrada com sucesso." />
        </div>
    );
}
export default ItemDoMenu;