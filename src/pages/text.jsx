// Importa toast para exibir mensagens de sucesso ou erro
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from "../components/itemMenu/itemMenu.jsx";
import T from "../components/Toast/toastSucesso.jsx"
import TI from "../components/Toast/toastInvalido.jsx"
import ERRO from "../components/Toast/toastErro.jsx"
import Menu from "../components/MenuSuperior/MenuSuperior.jsx"


const ItemDoMenu = () => {
    const [inputValue, setInputValue] = useState('');
    return (
        <div>
            <Menu icon={"bars"} title="PÁGINA INICIAL" />
            {/* <Input icon={"question-circle"} title="Usuário" />
            <T icon={"circle-check"} title="Entrada registrada com sucesso." />
            <TI icon={"triangle-exclamation"} title="Este item não possui quantidade no estoque para ser retirada." />
            <ERRO icon={"triangle-exclamation"} title="Defina um tipo e quantidade para o ajuste do produto selecionado." /> */}
            
        </div>
    );
}
export default ItemDoMenu;
