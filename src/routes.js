import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Debug from "./pages/debug/Debug";
import Login from "./pages/login-e-entrada/Login/Login";
import MainMenu from "./pages/login-e-entrada/MainMenu/MainMenu";
import NewMovement from "./pages/cadastros-de-estoque/NewMovement/NewMovement"
import ConfigurationMenu from "./pages/configuracoes-de-estoque/ConfigurationMenu/ConfigurationMenu";
import Cadastro from "./pages/configuracoes-de-acesso/Cadastro";

function Rotas() {
    if (process.env.REACT_APP_MODO_DEBUG === "1"){
        return <BrowserRouter><Routes><Route path="/" element={<Debug />} /></Routes></BrowserRouter>
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path={"/menu-inicial"} element={<MainMenu />} />
                <Route path={"/cadastros-de-estoque"} element={<NewMovement />} />
                <Route path={"/configuracoes-de-estoque"} element={<ConfigurationMenu />} />
                <Route path={"/configuracoes-de-acesso"} element={<Cadastro />} />
            </Routes>
        </BrowserRouter>
        )
}
export default Rotas;
