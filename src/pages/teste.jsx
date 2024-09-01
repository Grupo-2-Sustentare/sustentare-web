import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TopBar from "../components/TopBar/TopBar.jsx";
import Switch from '../components/Switch/Switch.jsx';
import SideMenu from '../components/SideMenu/SideMenu.jsx'
import ItemProduto from '../components/ProductItem/ProductItem.jsx'
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
            <TopBar title="Entrada DE PRODUTOS" showBackArrow={false} />
            {/* <TopBar title="histórico de operações" showBackArrow={false} /> */}
            {/* <TopBar title="AAAAAAAAaaaaaaaaaaaaaaaa" showBackArrow={true} /> */}
            {/* <Botao/> */}
            <Switch initialState={false} onChange={(newState) => console.log(newState)} labels={{ on: 'Ativo', off: 'Inativo' }}/>
            {/* <SideMenu userName={userName} userImage={userImage}/> */}
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioquinha" weight="25 kilogramas" />
            <ItemProduto 
                imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" 
                title="Feijão carioca" 
                weight="25 kilogramos" 
                showCheckbox={false} 
                showButtons={true} 
            />
            {/* <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" checked />
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" showButtons />
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" checked showButtons />
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" showButtons checked={false} />
            <ItemProduto imageUrl="https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png" title="Feijão carioca" weight="25 kilogramos" showButtons checked /> */}
        </div>
    );
}

export default ExibirComponentes;