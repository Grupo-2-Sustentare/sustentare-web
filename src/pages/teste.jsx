import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TopBar from "../components/TopBar/TopBar.jsx";
import Switch from '../components/Switch/Switch.jsx';
import Button from "../components/Button/Button.jsx";
import SideMenu from '../components/SideMenu/SideMenu.jsx'
import ItemProduto from '../components/ProductItem/Product.jsx'
import Botao from '../components/IconButton/IconButton.jsx'

const handleSwitchChange = (newState) => {
    console.log('Switch is now:', newState);
}
// var userImage = "https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1";
// var userName = "Antônio"
var imagem = 'https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png';
const ExibirComponentes = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <Button insideText={"aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbb"}/>
        </div>
    );
}

export default ExibirComponentes;