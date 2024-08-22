import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import ItemPage from './pages/item/ItemPage';

import Debug from "./pages/Debug/Debug";
function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/cadastro"} element={<Cadastro />} />
                    <Route path="/item/:item" element={<ItemPage />} />
                    <Route path={"/debug"} element={<Debug />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;
