import styles from "./historicoOperacoes.module.css"
import TopBar from "../../components/TopBar/TopBar";
import OperationLog from "../../components/OperationLog/OperationLog";
import IconInput from "../../components/IconInput/IconInput";
import StrechList from "../../components/StrechList/StrechList";
import api from "../../api";
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {errorToast} from "../../components/Toast/Toast";

export default function HistoricoOperacoes() {
    const location = useLocation();
    const usuarioEscolhido = location.state?.usuario;

    // Estado para armazenar logs
    const [logs, setLogs] = useState([]);

    // Estado para controlar o carregamento
    const [loading, setLoading] = useState(true);
    // const logs = MOCK_LOGS

    // Do módulo de busca e ordenação.
    const [logsVisiveis, setLogsVisiveis] = useState([])
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)

    const buscarLogs = () => {
        let idUsuarioEspecifico = ""
        if (usuarioEscolhido !== undefined){
            idUsuarioEspecifico = "/" + usuarioEscolhido.id
        }

        api.get(`/audit-logs${idUsuarioEspecifico}`).then((response) => {
            sessionStorage.setItem("audit_view_logs", JSON.stringify(response.data))
            setLogs(response.data);
            setLoading(false);
        }).catch(() => {
            errorToast("Ocorreu um erro ao tentar realizar buscar as informacoes dos logs.");
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
            return null
        }
        return usuarioEncontrado.imagem;
    };


    return (<>
        <div className={styles.historicaDeOperacoes}>
            <TopBar title={"Historico de operações"} showBackArrow={false} />
            <div className={styles.barraDeBusca}>
                <IconInput onChange={buscarLogs} placeholder={"Pesquisa por nome"} />
                {/*<StrechList*/}
                {/*    showTitle={false} items={OPCOES_ORDENACAO} hint={"Opções de ordenação"}*/}
                {/*/>*/}
            </div>
            <hr></hr>
            <div className={styles.principal}>
                {
                    logs?.map((l) => (
                        <OperationLog
                            key={l.id}
                            title={l.titulo}
                            operation={l.descricao}
                            author={obterNomeUsuario(l.fkUsuario)}
                            time={l.dataHora}
                            adressImg={obterImagemUsuario(l.fkUsuario) ? `data:image/jpeg;base64,${obterImagemUsuario(l.fkUsuario)}` : "https://placehold.co/400/F5FBEF/22333B?text=User"}
                            // adressImg={`data:image/jpeg;base64,${obterImagemUsuario(l.fkUsuario)}`}
                            // u.imagem ? `data:image/jpeg;base64,${u.imagem}` : "https://placehold.co/400/F5FBEF/22333B?text=User"
                        />)
                    )
                }
                {
                    (logs.length === 0) && <div className={styles.mensagem}>Nenhum registro encontrado</div>
                }
            </div>
        </div>
   </> )
}