import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Debug from "./pages/debug/Debug";
import Login from "./pages/login-e-entrada/Login/Login";
import MainMenu from "./pages/login-e-entrada/MainMenu/MainMenu";
import NewMovement from "./pages/cadastros-de-estoque/NewMovement/NewMovement"
import ConfigurationMenu from "./pages/configuracoes-de-estoque/ConfigurationMenu/ConfigurationMenu";
import CategoriaProduto from "./pages/configuracoes-de-estoque/categoria-produto/CategoriaProduto"
import Cadastro from "./pages/configuracoes-de-acesso/Cadastro";
import ConfiguracoesProdutos from "./pages/configuracoes-de-produtos/configuracoes-de-produtos"
import CriandoProduto from "./pages/criando-novo-produto/CriandoProduto"
import ExibirComponentes from "./pages/teste";

function Rotas() {
    let rotaPadrao = null;
    if (process.env.REACT_APP_MODO_DEBUG === "1"){
        rotaPadrao = <Route path="/" element={<Debug />} />
    } else{
        rotaPadrao = <Route path="/" element={<Login />} />
    }
    return (
        <BrowserRouter>
            <Routes>
                {rotaPadrao}
                <Route path={"/menu-inicial"} element={<MainMenu />} />
                <Route path={"/cadastros-de-estoque"} element={<NewMovement />} />
                <Route path={"/configuracoes-de-estoque"} element={<ConfigurationMenu />} />
                <Route path={"/configuracoes-de-acesso"} element={<Cadastro />} />
                <Route path={"/configuracoes-de-produtos"} element={<ConfiguracoesProdutos />}/>
                <Route path={"/categoria-produto"} element={<CategoriaProduto />} />
                <Route path={"/criando-produto"} element={<CriandoProduto/>} />
                <Route path={"/teste"} element={<ExibirComponentes/>} />
            </Routes>
        </BrowserRouter>
        )
}
export default Rotas;
