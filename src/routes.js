import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Debug from "./pages/Debug/Debug";

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
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/cadastro"} element={<Cadastro />} />
                        <Route path={"/debug"} element={<Debug />} />
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}
export default Rotas;
