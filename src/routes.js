import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExibirComponentes from "./pages/teste";
import Debug from "./pages/debug/Debug";
import Login from "./pages/login-e-entrada/Login/Login";
import MainMenu from "./pages/login-e-entrada/MainMenu/MainMenu";

import NovoMovimento from "./pages/cadastros-de-estoque/novoMovimento/NovoMovimento";
import CategoriaConsumo from "./pages/cadastros-de-estoque/categoriaConsumo/CategoriaConsumo";
import {QuantidadeMovimento} from "./pages/cadastros-de-estoque/quantidadeMovimento/QuantidadeMovimento";
import SelecaoProdutos from "./pages/cadastros-de-estoque/selecaoProdutos/SelecaoProdutos";
import TipoMovimento from "./pages/cadastros-de-estoque/tipoMovimento/TipoMovimento";

import Configuracoes from "./pages/configuracoes/Configuracoes";

import AdicionandoColaborador from "./pages/configuracoes-de-acesso/adicionandoColaborador/AdicionandoColaborador";
import GerenciarEquipe from "./pages/configuracoes-de-acesso/gererenciarEquipe/GerenciarEquipe";
import RemoverColaborador from "./pages/configuracoes-de-acesso/removerColaborador/RemoverColaborador";

import ConfigurationMenu from "./pages/configuracoes-de-estoque/ConfigurationMenu/ConfigurationMenu";

import ConfiguracoesProdutos from "./pages/configuracoes-de-estoque/Produto/configuracoesDeProdutos/configuracoesDeProdutos";
import CriandoProduto from "./pages/configuracoes-de-estoque/Produto/criandoNovoProduto/CriandoProduto"
import CategoriaProduto from "./pages/configuracoes-de-estoque/Produto/categoriaProduto/CategoriaProduto"
import UnidadeMedidaProduto from "./pages/configuracoes-de-estoque/Produto/unidadeDeMedidaProduto/UnidadeMedidaProduto";
import EditandoProduto from "./pages/configuracoes-de-estoque/Produto/editandoProduto/EditandoProduto"

import ConfiguracoesCategorias from "./pages/configuracoes-de-estoque/Categoria/configuracoesCategoria/ConfiguracoeCategorias"
import CriandoNovaCategoria from "./pages/configuracoes-de-estoque/Categoria/criandoNovaCategoria/CriandoNovaCategoria"
import EditandoCategoria from "./pages/configuracoes-de-estoque/Categoria/editandoCategoria/EditandoCategoria"

import ConfiguracoesUnidadeMedida from "./pages/configuracoes-de-estoque/UnidadeDeMedida/confirguracoesDeUnidadeMedida/ConfiguracoesUnidadeMedida"
import CriandoUnidadeMedida from "./pages/configuracoes-de-estoque/UnidadeDeMedida/criandoUnidadeMedida/CriandoUnidadeMedida"
import EditandoUnidadeDeMedida from "./pages/configuracoes-de-estoque/UnidadeDeMedida/editandoUnidadeDeMedida/EditandoUnidadeDeMedida"

import HistoricoOperacoes from "./pages/historico-operacoes/HistoricoOperacoes";

import TelaDeConfirmacao from "./pages/tela-de-confirmacao/TelaDeConfirmacao"

import EditarUsuario from "./pages/editarUsuario/EditarUsuario"

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
                    <Route path={"/selecao-produtos"} element={<SelecaoProdutos />} />
                        <Route path={"/tipo-movimento"} element={<TipoMovimento />} />
                        <Route path={"/quantidade-movimento"} element={<QuantidadeMovimento />} />
                        <Route path={"/categoria-consumo"} element={<CategoriaConsumo />} />

                <Route path={"/configuracoes-de-estoque"} element={<ConfigurationMenu />} />
                    <Route path={"/categoria-produto"} element={<CategoriaProduto />} />
                    <Route path={"/unidade-de-medida-do-produto"} element={<UnidadeMedidaProduto/>} />
                    <Route path={"/criando-nova-categoria"} element={<CriandoNovaCategoria/>} />
                    <Route path={"/editando-categoria"} element={<EditandoCategoria/>} />
                    <Route path={"/editando-unidade-de-medida"} element={<EditandoUnidadeDeMedida/>} />
                    <Route path={"/configuracoes-de-produtos"} element={<ConfiguracoesProdutos />}/>
                    <Route path={"/criando-produto"} element={<CriandoProduto/>} />
                    <Route path={"/editando-produto"} element={<EditandoProduto/>}/>
                    <Route path={"/configuracoes-de-categorias"} element={<ConfiguracoesCategorias/>}/>
                    <Route path={"/configuracoes-de-unidade-medida"} element={<ConfiguracoesUnidadeMedida/>}/>
                    <Route path={"/criando-unidade-medida"} element={<CriandoUnidadeMedida/>}/>

                <Route path={"/configuracoes-de-acesso"} element={<GerenciarEquipe/>} />
                    <Route path={"/adicionando-colaborador"} element={<AdicionandoColaborador/>} />
                    <Route path={"/remover-colaborador"} element={<RemoverColaborador/>}/>

                
                <Route path={"/historico-de-operacoes"} element={<HistoricoOperacoes/>}/>

                <Route path={"/configuracoes"} element={<Configuracoes/>}/>

                <Route path={"/tela-de-confirmacao"} element={<TelaDeConfirmacao/>}/>

                <Route path={"/teste"} element={<ExibirComponentes/>} />
                <Route path={"/editar-usuario"} element={<EditarUsuario/>}/>
            </Routes>
        </BrowserRouter>
        )
}
export default Rotas;
