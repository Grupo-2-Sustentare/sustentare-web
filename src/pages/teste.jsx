import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MenuSuperior from "../components/MenuSuperior/menuSuperior.jsx";
import Switch from '../components/Switch/switch.jsx';
import MenuLateral from '../components/MenuPrincipal/menuLateral.jsx'

const handleSwitchChange = (newState) => {
    console.log('Switch is now:', newState);
}
var userImage = "https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1";
var userName = "Antônio"
const ExibirComponentes = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <MenuSuperior icon={"bars"} title="Entrada DE PRODUTOS"/>
            <Switch initialState={false} onChange={(newState) => console.log(newState)} labels={{ on: 'Ativo', off: 'Inativo' }}/>
            {/* <MenuLateral userName={userName} userImage={userImage}/> */}
        </div>
    );
}

export default ExibirComponentes;