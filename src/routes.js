import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Debug from "./pages/Debug/Debug";
import ExibirComponentes from "./pages/teste";
=======
import Debug from "./pages/debug/Debug";
import Login from "./pages/login-e-entrada/Login/Login";
import MainMenu from "./pages/login-e-entrada/MainMenu/MainMenu";
import NewMovement from "./pages/cadastros-de-estoque/NewMovement/NewMovement"
import ConfigurationMenu from "./pages/configuracoes-de-estoque/ConfigurationMenu/ConfigurationMenu";
import Cadastro from "./pages/configuracoes-de-acesso/Cadastro";

>>>>>>> 6ae6e40642f00b5451995817bc8d3b98d697bf56
function Rotas() {
    if (process.env.REACT_APP_MODO_DEBUG === "1"){
        return <BrowserRouter><Routes><Route path="/" element={<Debug />} /></Routes></BrowserRouter>
    }
    return (
<<<<<<< HEAD
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/cadastro"} element={<Cadastro />} />
                    <Route path={"/debug"} element={<Debug />} />
                    <Route path={"/teste"} element={<ExibirComponentes/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
=======
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
>>>>>>> 6ae6e40642f00b5451995817bc8d3b98d697bf56
}
export default Rotas;
