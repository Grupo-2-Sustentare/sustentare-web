// Importa toast para exibir mensagens de sucesso ou erro
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from "../components/itemMenu/itemMenu.jsx";

const ItemDoMenu = () => {
    const [inputValue, setInputValue] = useState('');
    return (
        <div>
            <Input icon={"question-circle"} title="Usuário" />
        </div>
    );
}
export default ItemDoMenu;