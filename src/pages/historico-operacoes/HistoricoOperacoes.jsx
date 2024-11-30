import styles from "./historicoOperacoes.module.css"
import TopBar from "../../components/TopBar/TopBar";
import OperationLog from "../../components/OperationLog/OperationLog";
import IconInput from "../../components/IconInput/IconInput";
import StrechList from "../../components/StrechList/StrechList";
import api from "../../api";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {errorToast} from "../../components/Toast/Toast";
import {EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa} from "../../tools/ModuloBusca";

export default function HistoricoOperacoes() {
    const location = useLocation();
    const usuarioEscolhido = location.state?.usuario;

    // Estado para armazenar logs
    const [logs, setLogs] = useState([]);

    // Estado para controlar o carregamento
    const [loading, setLoading] = useState(true);

    // Do módulo de busca e ordenação.
    const [logsVisiveis, setLogsVisiveis] = useState([])
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)
 
    useEffect(() => {
        setLogsVisiveis(ordenacaoComPesquisa(logs, queryPesquisa, ordenacao, EnumObjetosBusca.LOG))
 
    }, [logs, queryPesquisa, ordenacao])

    const buscarLogs = () => {
        let idUsuarioEspecifico = usuarioEscolhido === undefined ? "" :  "/" + usuarioEscolhido.id

        api.get(`/audit-logs${idUsuarioEspecifico}`).then((response) => {
            sessionStorage.setItem("audit_view_logs", JSON.stringify(response.data))
            if (response.status === 204) {
                return
              }
            let logs = response.data
            for (let i in logs){
                logs[i].nomeUsuario = obterNomeUsuario(logs[i].fkUsuario)
                logs[i].imagemUsuario = obterImagemUsuario(logs[i].fkUsuario)
            }

            setLogs(logs);
        }).catch(() => {
            errorToast("Erro ao tentar realizar buscar as informacoes dos logs. Contate o suporte.");
        }).finally(() => setLoading(false))
    };
    useEffect(() => buscarLogs(), []);

    const usuarios = JSON.parse(sessionStorage.getItem('usuarios'));

    const obterNomeUsuario = (fkUsuario) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        return usuarioEncontrado ? usuarioEncontrado.nome : 'Usuário não encontrado';
    };

    const obterImagemUsuario = (fkUsuario) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        if(usuarioEncontrado === undefined || usuarioEncontrado.imagem === undefined || usuarioEncontrado.imagem === null){
            return "https://placehold.co/400/F5FBEF/22333B?text=Usuário"
        }
        return usuarioEncontrado.imagem;
    };


    return (<>
        <div className={styles.historicaDeOperacoes}>
            <TopBar title={"Historico de operações"} showBackArrow={false} />
            <div className={styles.barraDeBusca}>
                <IconInput onChange={(v)=>setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por usuário"}/>
                <StrechList
                    showTitle={false} items={OPCOES_ORDENACAO.Log} hint={"Opções de ordenação"}
                    onChange={(v)=>setOrdenacao(v)}
                />
            </div><hr/>
            <div className={styles.principal}>
                {logsVisiveis?.map((l, i) => (
                    <OperationLog
                        key={i} title={l.titulo} operation={l.descricao} author={l.nomeUsuario} time={l.dataHora}
                        adressImg={l.imagemUsuario}
                    />)
                )}
                {(logsVisiveis.length === 0) && <div className={styles.mensagem}>Nenhum registro encontrado</div>}
            </div>
        </div>
   </> )
}