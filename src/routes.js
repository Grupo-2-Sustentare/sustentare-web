import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login-e-entrada/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Debug from "./pages/Debug/Debug";
import ExibirComponentes from "./pages/teste";
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
                <Route path={"/teste"} element={<ExibirComponentes/>} />
            </Routes>
        </BrowserRouter>
        )
}
export default Rotas;
