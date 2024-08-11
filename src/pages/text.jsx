import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from "../components/itemMenu/itemMenu.jsx";
import T from "../components/Toast/toastSucesso.jsx";
import TI from "../components/Toast/toastInvalido.jsx";
import ERRO from "../components/Toast/toastErro.jsx";
import Img from "../components/itemListaImg/itemListaImg.jsx";

const ItemDoMenu = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <Input icon={"house"} title="Página inicial" />
            <T icon={"circle-check"} title="Entrada registrada com sucesso." />
            {/* <TI icon={"triangle-exclamation"} title="Este item não possui quantidade no estoque para ser retirada." /> */}
            {/* <ERRO icon={"triangle-exclamation"} title="Defina um tipo e quantidade para o ajuste do produto selecionado." /> */}
            <Img  title="Antônio" desc="Usuário(a)" adressImg="https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1"/>	
        </div>
    );
}

export default ItemDoMenu;