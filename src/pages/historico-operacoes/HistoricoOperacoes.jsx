import styles from "./historicoOperacoes.module.css"
import TopBar from "../../components/TopBar/TopBar";
import OperationLog from "../../components/OperationLog/OperationLog";
import IconInput from "../../components/IconInput/IconInput";
import StrechList from "../../components/StrechList/StrechList";
import api from "../../api";
import Product from "../../components/ProductItem/Product";
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OPCOES_ORDENACAO = ["Alfabética - Crescente", "Alfabética - Decrescente"]
const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/usuarios/"
const MOCK_LOGS = [
    { titulo: "Movimento", ato: "-0,5kg em sobrecoxa de frango", horario: "1 minuto atrás", autor: "Antônio", icone: "1.png" },
    { titulo: "Ajuste", ato: "+7kg em sobrecoxa de frango", horario: "1 minuto atrás", autor: "Jorge", icone: "3.jpeg" },
    { titulo: "Alteração", ato: "Renomeada a sobrecoxa para sobrecoxa de frango", horario: "2 minuto atrás", autor: "Jorge", icone: "3.jpeg" },
    { titulo: "Movimento", ato: "+22kg em coxa de frango", horario: "7 minuto atrás", autor: "Antônio", icone: "1.png" },
    { titulo: "Movimento", ato: "-23 garrafas de coca-cola", horario: "ontem", autor: "Ingrid", icone: "2.jpeg" },
    { titulo: "Movimento", ato: "-34kg de arroz branco", horario: "27 de ago.", autor: "Antônio", icone: "1.png" }
]

export default function HistoricoOperacoes() {
    const location = useLocation();
    const usuarioEscolhido = location.state?.usuario;
    console.log("----------------------USUARIO ESCOLHIDO--------------------------")
    console.log(usuarioEscolhido)

    const [logs, setLogs] = useState(() => {
        const storedUsuarios = sessionStorage.getItem('audit_view_logs');
        return storedUsuarios ? JSON.parse(storedUsuarios) : [];
    });
    // Estado para armazenar logs
    const [logsTeste, setLogsTeste] = useState([]);

    // Estado para controlar o carregamento
    const [loading, setLoading] = useState(true);
    // const logs = MOCK_LOGS

    function buscarLogs() {

    }

    const buscarLogTodosUsuario = () => {

        api.get(`/audit-logs`).then((response) => {
            sessionStorage.setItem("audit_view_logs", JSON.stringify(response.data))
            setLogsTeste(response.data);
            setLoading(false);
        }).catch(() => {
            console.log("Ocorreu um erro ao tentar realizar buscar as informacoes dos logs.");
            setLoading(false);
        })
    };

    const buscarLogUsuarioEspecifico = () => {

        api.get(`/audit-logs/${usuarioEscolhido.id}`).then((response) => {
            sessionStorage.setItem("audit_view_logs", JSON.stringify(response.data))
            setLogsTeste(response.data);
            setLoading(false);
        }).catch(() => {
            console.log("Ocorreu um erro ao tentar realizar buscar as informacoes dos logs.");
            setLoading(false);
        })
    };

    useEffect(() => {
        if (usuarioEscolhido != undefined) {
            buscarLogUsuarioEspecifico();

        } else {
            buscarLogTodosUsuario();

        }
    }, []);

    const logsParaRelacionar = JSON.parse(sessionStorage.getItem('logs'));
    const usuarios = JSON.parse(sessionStorage.getItem('usuarios'));

    const obterNomeUsuario = (fkUsuario) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        return usuarioEncontrado ? usuarioEncontrado.nome : 'Usuário não encontrado';
    };

    const obterImagemUsuario = (fkUsuario) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        if(usuarioEncontrado == undefined){
            return null
        }
        if(usuarioEncontrado.imagem == undefined){
            return null
        }
        if(usuarioEncontrado.imagem === null){
            return null
        }
        console.log(usuarioEncontrado.nome)
        console.log(usuarioEncontrado.imagem)
        return usuarioEncontrado.imagem;
    };


    return (<>
        <div className={styles.historicaDeOperacoes}>
            <TopBar title={"Historico de operações"} showBackArrow={false} />
            <div className={styles.barraDeBusca}>
                <IconInput onChange={buscarLogs} placeholder={"Pesquisa por nome"} />
                <StrechList
                    showTitle={false} items={OPCOES_ORDENACAO} hint={"Opções de ordenação"}
                />
            </div>
            <hr></hr>
            <div className={styles.principal}>
                {Array.isArray(logsTeste) && logsTeste.length > 0 ? (
                    logsTeste.map((l) => (
                        <OperationLog
                            key={l.id}
                            title={l.titulo}
                            operation={l.descricao}
                            author={obterNomeUsuario(l.fkUsuario)}
                            time={l.dataHora}
                            adressImg={obterImagemUsuario(l.fkUsuario) ? `data:image/jpeg;base64,${obterImagemUsuario(l.fkUsuario)}` : "https://placehold.co/400/F5FBEF/22333B?text=User"}
                            // adressImg={`data:image/jpeg;base64,${obterImagemUsuario(l.fkUsuario)}`}
                            // u.imagem ? `data:image/jpeg;base64,${u.imagem}` : "https://placehold.co/400/F5FBEF/22333B?text=User"
                        />
                    ))
                ) : (
                    <div className={styles.mensagem}>Nenhum registro encontrado</div>
                )}
                {/* <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product> */}
            </div>
        </div>
   </> )
}