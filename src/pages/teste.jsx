import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MenuSuperior from "../components/MenuSuperior/menuSuperior.jsx";
import Switch from '../components/Switch/switch.jsx';
import MenuLateral from '../components/MenuPrincipal/menuLateral.jsx'
import ItemProduto from '../components/itemProduto/itemProduto.jsx'

const handleSwitchChange = (newState) => {
    console.log('Switch is now:', newState);
}
var userImage = "https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1";
var userName = "Antônio"
var imagem = 'https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png';
const ExibirComponentes = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <MenuSuperior title="Entrada DE PRODUTOS"/>
            <MenuSuperior title="histórico de operações"/>
            <MenuSuperior title="AAAAAAAAaaaaaaaaaaaaaaaa"/>
            <Switch initialState={false} onChange={(newState) => console.log(newState)} labels={{ on: 'Ativo', off: 'Inativo' }}/>
            {/* <MenuLateral userName={userName} userImage={userImage}/> */}
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioquinha" weight="25 kilogramas" />
            {/* <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" checked />
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" showButtons />
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" checked showButtons />
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" showButtons checked={false} />
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" showButtons checked /> */}
        </div>
    );
}

export default ExibirComponentes;