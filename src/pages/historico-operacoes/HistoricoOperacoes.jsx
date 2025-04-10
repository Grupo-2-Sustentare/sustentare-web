import styles from "./historicoOperacoes.module.css"
import TopBar from "../../components/TopBar/TopBar";
import OperationLog from "../../components/OperationLog/OperationLog";
import IconInput from "../../components/IconInput/IconInput";
import StrechList from "../../components/StrechList/StrechList";
import api from "../../api";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {  errorToast  } from "../../components/Toast/Toast";
import {  EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa  } from "../../tools/ModuloBusca";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import pegarImagemPorNome from "../../tools/ImageHelper";

export default function HistoricoOperacoes() {
    const location = useLocation();
    const [carregando, setCarregando] = useState(true)

    const usuarioEscolhido = location.state?.usuario;

    // Estado para armazenar logs
    const [logs, setLogs] = useState([]);

    // Do módulo de busca e ordenação.
    const [logsVisiveis, setLogsVisiveis] = useState([])
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)


    useEffect(() => {
        setLogsVisiveis(ordenacaoComPesquisa(logs, queryPesquisa, ordenacao, EnumObjetosBusca.LOG))

        // Buscar todos os usuários e salvar no sessionStorage
        api.get("/proxy-java-api/usuarios")
            .then((response) => {
                if (response.status === 200) {
                    sessionStorage.setItem("usuarios", JSON.stringify(response.data));
                }
            })
            .catch(() => {
                errorToast("Erro ao buscar usuários.");
            });
    
        // Buscar os logs de operações
        buscarLogs();
    }, []);
    

    useEffect(() => {
        console.log(logs)
        let resultado = ordenacaoComPesquisa(logs, queryPesquisa, ordenacao, EnumObjetosBusca.LOG)

        if (resultado.length === 0 && logs.length > 0) {
            resultado = logs;
        }

        setLogsVisiveis(resultado);
        // setLogsVisiveis(ordenacaoComPesquisa(logs, queryPesquisa, ordenacao, EnumObjetosBusca.LOG))
    }, [logs, queryPesquisa, ordenacao])

    const buscarUsuarios = async() => {
        return api.get('/proxy-java-api/usuarios').then((res) => {
            if (res.data === undefined || res.data.length === 0){
                throw new Error("Usuários vazios.")
            }
            return res.data
        }).catch((error) => {
            console.log(error);
            errorToast("Erro ao buscar usuários. Contate o suporte.")
        })
    }

    const buscarLogs = (usuarios) => {
        let idUsuarioEspecifico = usuarioEscolhido === undefined ? "" : "/" + usuarioEscolhido.id
        if (usuarios === undefined) return

        api.get(`/proxy-java-api/audit-logs${idUsuarioEspecifico}`).then((response) => {
            // console.log(JSON.stringify(response.data))
            // alert(JSON.stringify(response.data))
            sessionStorage.setItem("audit_view_logs", JSON.stringify(response.data))
            if (response.status === 204) {
                return
            }
            let logs = response.data
            for (let i in logs) {
                logs[i].nomeUsuario = obterNomeUsuario(logs[i].fkUsuario, usuarios)
                logs[i].imagemUsuario = obterImagemUsuario(logs[i].fkUsuario, usuarios)
            }

            // Até aqui precisa ser arrumado para buscar nome do usuário corretamente
            // console.log("************")
            console.log(logs)
            setLogs(logs);
        }).catch((error) => {
            console.log(error)
            errorToast("Erro ao tentar realizar buscar as informacoes dos logs. Contate o suporte.");
        }).finally(() => setCarregando(false))
    };

    useEffect(() => {
        buscarUsuarios().then((usuarios) => buscarLogs(usuarios))
    }, []);

    const obterNomeUsuario = (fkUsuario, usuarios) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        return usuarioEncontrado ? usuarioEncontrado.nome : 'Usuário não encontrado';
    };

    const obterImagemUsuario = (fkUsuario, usuarios) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        if (usuarioEncontrado === undefined) {
            return pegarImagemPorNome("?")
        }
        if (usuarioEncontrado.imagem === undefined || usuarioEncontrado.imagem === null){
            return pegarImagemPorNome(usuarioEncontrado.nome)
        }
        return "data:image/jpeg;base64," + usuarioEncontrado.imagem;
    };


    return (<>
        <div className={styles.historicaDeOperacoes}>
            <TopBar title={"Historico de operações"} showBackArrow={false} />
            <div className={styles.barraDeBusca}>
                <IconInput onChange={(v) => setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por usuário"} />
                <StrechList
                    showTitle={false} items={OPCOES_ORDENACAO.Log} hint={"Opções de ordenação"}
                    onChange={(v) => setOrdenacao(v)}
                />
            </div><hr />
            <div className={styles.principal}>
                <LoadingIcon carregando={carregando} />
                {logsVisiveis?.map((l, i) => (
                    <OperationLog
                        key={i} title={l.titulo} operation={l.descricao} author={l.nomeUsuario} time={l.dataHora}
                        adressImg={l.imagemUsuario}
                    />)
                )}
                {(logsVisiveis.length === 0 && !carregando) && <div className={styles.mensagem}>Nenhum registro encontrado</div>}
            </div>
        </div>
    </>)
}