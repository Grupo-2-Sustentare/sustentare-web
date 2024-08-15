import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import ItemDoMenu from "./pages/text"
import ExibirComponentes from "./pages/teste";
function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/cadastro"} element={<Cadastro />} />
                    <Route path={"/text"} element ={<ItemDoMenu />} />
                    <Route path={"/teste"} element={<ExibirComponentes/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;