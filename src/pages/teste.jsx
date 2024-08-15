import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MenuSuperior from "../components/MenuSuperior/menuSuperior.jsx";
import Switch from '../components/Switch/switch.jsx';

const handleSwitchChange = (newState) => {
    console.log('Switch is now:', newState);
}
const ExibirComponentes = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <MenuSuperior icon={"bars"} title="Entrada DE PRODUTOS"/>
            <Switch initialState={false} onChange={handleSwitchChange} />
        </div>
    );
}

export default ExibirComponentes;