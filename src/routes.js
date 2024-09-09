import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Debug from "./pages/debug/Debug";
import Login from "./pages/login-e-entrada/Login/Login";
import MainMenu from "./pages/login-e-entrada/MainMenu/MainMenu";
import NovoMovimento from "./pages/cadastros-de-estoque/NovoMovimento/NovoMovimento"
import ConfigurationMenu from "./pages/configuracoes-de-estoque/ConfigurationMenu/ConfigurationMenu";
import CategoriaProduto from "./pages/configuracoes-de-estoque/categoria-produto/CategoriaProduto"
import UnidadeMedidaProduto from "./pages/configuracoes-de-estoque/unidade-de-medida-produto/UnidadeMedidaProduto"
import CriandoNovaCategoria from "./pages/configuracoes-de-estoque/criando-nova-categoria/CriandoNovaCategoria"
import EditandoCategoria from "./pages/configuracoes-de-estoque/editando-categoria/EditandoCategoria"
import Cadastro from "./pages/configuracoes-de-acesso/Cadastro";
import ConfiguracoesProdutos from "./pages/configuracoes-de-produtos/configuracoes-de-produtos"
import CriandoProduto from "./pages/criando-novo-produto/CriandoProduto"
import ExibirComponentes from "./pages/teste";
import SelecaoProdutos from "./pages/cadastros-de-estoque/SelecaoProdutos/SelecaoProdutos";
import TipoMovimento from "./pages/cadastros-de-estoque/TipoMovimento/TipoMovimento";
import {QuantidadeMovimento} from "./pages/cadastros-de-estoque/QuantidadeMovimento/QuantidadeMovimento";

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
                <Route path={"/cadastros-de-estoque"} element={<NovoMovimento />} />
                    <Route path={"/cadastros-de-estoque/selecao-produtos"} element={<SelecaoProdutos />} />
                        <Route path={"/cadastros-de-estoque/produto/tipo-movimento"} element={<TipoMovimento />} />
                        <Route path={"/cadastros-de-estoque/produto/quantidade-movimento"} element={<QuantidadeMovimento />} />
                <Route path={"/configuracoes-de-estoque"} element={<ConfigurationMenu />} />
                        <Route path={"/categoria-produto"} element={<CategoriaProduto />} />
                        <Route path={"/unidade-de-medida-do-produto"} element={<UnidadeMedidaProduto/>} />
                        <Route path={"/criando-nova-categoria"} element={<CriandoNovaCategoria/>} />
                        <Route path={"/editando-categoria"} element={<EditandoCategoria/>} />
                <Route path={"/configuracoes-de-acesso"} element={<Cadastro />} />
                <Route path={"/configuracoes-de-produtos"} element={<ConfiguracoesProdutos />}/>
                <Route path={"/criando-produto"} element={<CriandoProduto/>} />
                <Route path={"/teste"} element={<ExibirComponentes/>} />
            </Routes>
        </BrowserRouter>
        )
}
export default Rotas;
