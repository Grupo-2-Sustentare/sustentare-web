import styles from "./historicoOperacoes.module.css"
import TopBar from "../../components/TopBar/TopBar";
import OperationLog from "../../components/OperationLog/OperationLog";
import IconInput from "../../components/IconInput/IconInput";
import StrechList from "../../components/StrechList/StrechList";
import api from "../../api";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { errorToast } from "../../components/Toast/Toast";
import { EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa } from "../../tools/ModuloBusca";

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

    const buscarLogs = () => {
        let idUsuarioEspecifico = usuarioEscolhido === undefined ? "" : "/" + usuarioEscolhido.id

        api.get(`/proxy-java-api/audit-logs${idUsuarioEspecifico}`).then((response) => {
            // console.log(JSON.stringify(response.data))
            // alert(JSON.stringify(response.data))
            sessionStorage.setItem("audit_view_logs", JSON.stringify(response.data))
            if (response.status === 204) {
                return
            }
            let logs = response.data
            console.log("=================")
            console.log(logs)
            console.log("+++++++++++++")

            // Arrumar para pegar nome corretamente

            for (let i in logs) {
                console.log(logs[i].fkUsuario)
                console.log("************")

                logs[i].nomeUsuario = obterNomeUsuario(logs[i].fkUsuario)
                console.log(logs[i].nomeUsuario)
                logs[i].imagemUsuario = obterImagemUsuario(logs[i].fkUsuario)
            }

            // Até aqui precisa ser arrumado para buscar nome do usuário corretamente
            // console.log("************")
            console.log(logs)
            setLogs(logs);
        }).catch(() => {
            errorToast("Ocorreu um erro ao tentar buscar as informacoes dos logs.");
        }).finally(() => setLoading(false))
    };
    useEffect(() => buscarLogs(), []);

    const usuarios = JSON.parse(sessionStorage.getItem('usuarios')) || [];

    const obterNomeUsuario = (fkUsuario) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        return usuarioEncontrado ? usuarioEncontrado.nome : 'Usuário não encontrado';
    };

    const obterImagemUsuario = (fkUsuario) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        if (!usuarioEncontrado?.imagem) {
            return "https://placehold.co/400/F5FBEF/22333B?text=Usuário";
        }
        return usuarioEncontrado.imagem;
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
                {logsVisiveis?.map((l) => (

                    <OperationLog
                        key={l.id} title={l.titulo} operation={l.descricao} author={l.nomeUsuario} time={l.dataHora}
                        adressImg={l.imagemUsuario}
                    />)
                )}
                {(logsVisiveis.length === 0) && <div className={styles.mensagem}>Nenhum registro encontrado</div>}
            </div>
        </div>
    </>)
}