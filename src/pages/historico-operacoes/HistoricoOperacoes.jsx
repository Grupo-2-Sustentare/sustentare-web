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
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

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

    }, [logs, queryPesquisa, ordenacao])

    const buscarUsuarios = async() => {
        return api.get('/proxy-java-api/usuarios').then((res) => {
            // setUsuarios(res.data);
            console.log(res.data)
            return res.data
        }).catch((error) => {
            errorToast("Erro ao buscar usuários. Contate o suporte.")
            console.error("Erro ao buscar usuários:", error);
        })
    }

    const buscarLogs = (usuarios) => {
        let idUsuarioEspecifico = usuarioEscolhido === undefined ? "" : "/" + usuarioEscolhido.id

        api.get(`/proxy-java-api/audit-logs${idUsuarioEspecifico}`).then((response) => {
            console.log(usuarios)
            sessionStorage.setItem("audit_view_logs", JSON.stringify(response.data))
            if (response.status === 204) {
                return
            }
            let logs = response.data
            for (let i in logs) {
                logs[i].nomeUsuario = obterNomeUsuario(logs[i].fkUsuario, usuarios)
                logs[i].imagemUsuario = obterImagemUsuario(logs[i].fkUsuario, usuarios)
            }

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
        if (usuarioEncontrado === undefined || usuarioEncontrado.imagem === undefined || usuarioEncontrado.imagem === null) {
            return "https://placehold.co/400/F5FBEF/22333B?text=Usuário"
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