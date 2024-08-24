import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login-e-entrada/Login/Login";
import Cadastro from "./pages/configuracoes-de-acesso/Cadastro";
import Debug from "./pages/debug/Debug";

function Rotas() {
    if (process.env.REACT_APP_MODO_DEBUG === "1"){
        return (<>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Debug />} />
                </Routes>
           </BrowserRouter>
        </>)
    }
    else{
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path={"/login-e-entrada"} element={<Login />} />
                        <Route path={"/cadastro"} element={<Cadastro />} />
                        <Route path={"/debug"} element={<Debug />} />
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}
export default Rotas;
