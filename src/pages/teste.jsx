import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MenuSuperior from "../components/MenuSuperior/menuSuperior.jsx";

const ExibirComponentes = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <MenuSuperior icon={"bars"} title="Entrada DE PRODUTOS"/>
        </div>
    );
}

export default ExibirComponentes;