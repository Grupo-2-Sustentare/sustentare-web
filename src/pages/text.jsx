import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from "../components/itemMenu/itemMenu.jsx";
import T from "../components/Toast/toastSucesso.jsx";
import TI from "../components/Toast/toastInvalido.jsx";
import ERRO from "../components/Toast/toastErro.jsx";
import Img from "../components/itemLista/itemListaImg.jsx";
import SI from "../components/itemLista/itemListaIcone.jsx";
import RI from "../components/registroOperacao/registroOperacao.jsx";

const ItemDoMenu = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <Input icon={"house"} title="Página inicial" />
            <T icon={"circle-check"} title="Entrada registrada com sucesso." />
            {/* <TI icon={"triangle-exclamation"} title="Este item não possui quantidade no estoque para ser retirada." /> */}
            {/* <ERRO icon={"triangle-exclamation"} title="Defina um tipo e quantidade para o ajuste do produto selecionado." /> */}
            <Img title="Antônio" desc="Usuário(a)" adressImg="https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1" descImg ="descrição da Imagem " />
            <SI icon={"circle-check"} desc="Uso no buffet ou vendas individuais (Regular)" />
            <RI title="Alteração" acao="-0,5kg em sobrecoxa de frango" tempo="1 minuto atrás" adressImg="https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1" descImg ="descrição da Imagem " />

        </div>
    );
}

export default ItemDoMenu;