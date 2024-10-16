import styles from "./historicoOperacoes.module.css"
import TopBar from "../../components/TopBar/TopBar";
import OperationLog from "../../components/OperationLog/OperationLog";
import IconInput from "../../components/IconInput/IconInput";
import StrechList from "../../components/StrechList/StrechList";
import api from "../../api";
import React, {useEffect, useState} from 'react';

const OPCOES_ORDENACAO = ["Alfabética - Crescente", "Alfabética - Decrescente"]
const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/usuarios/"
const MOCK_LOGS = [
    {titulo: "Movimento", ato: "-0,5kg em sobrecoxa de frango", horario: "1 minuto atrás", autor: "Antônio", icone: "1.png"},
    {titulo: "Ajuste", ato: "+7kg em sobrecoxa de frango", horario: "1 minuto atrás", autor: "Jorge", icone: "3.jpeg"},
    {titulo: "Alteração", ato: "Renomeada a sobrecoxa para sobrecoxa de frango", horario: "2 minuto atrás", autor: "Jorge", icone: "3.jpeg"},
    {titulo: "Movimento", ato: "+22kg em coxa de frango", horario: "7 minuto atrás", autor: "Antônio", icone: "1.png"},
    {titulo: "Movimento", ato: "-23 garrafas de coca-cola", horario: "ontem", autor: "Ingrid", icone: "2.jpeg"},
    {titulo: "Movimento", ato: "-34kg de arroz branco", horario: "27 de ago.", autor: "Antônio", icone: "1.png"}
]

export default function HistoricoOperacoes(){
    const [logs, setLogs] = useState(() => {
        const storedUsuarios = sessionStorage.getItem('audit_view_logs');
        return storedUsuarios ? JSON.parse(storedUsuarios) : [];
      });   
    // const logs = MOCK_LOGS

    function buscarLogs(){

    }

    const handleSave = () => {

        api.get(`/audit-logs`).then((response) => {
             sessionStorage.setItem("audit_view_logs", JSON.stringify(response.data))
         }).catch(() => {
             console.log("Ocorreu um erro ao tentar realizar buscar as informacoes dos logs.");
        })
    };

    useEffect(() => {
        handleSave();
    }, []);

    const logsParaRelacionar = JSON.parse(sessionStorage.getItem('logs'));
    const usuarios = JSON.parse(sessionStorage.getItem('usuarios'));

    const obterNomeUsuario = (fkUsuario) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        return usuarioEncontrado ? usuarioEncontrado.nome : 'Usuário não encontrado';
    };

    const obterImagemUsuario = (fkUsuario) => {
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === fkUsuario);
        return usuarioEncontrado ? usuarioEncontrado.imagem : 'Usuário não encontrado';
    };


    return(<>
        <TopBar title={"Historico de operações"} showBackArrow={false}/>
        <div className={styles.barraDeBusca}>
            <IconInput onChange={buscarLogs} placeholder={"Pesquisa por nome"}/>
            <StrechList
                showTitle={false} items={OPCOES_ORDENACAO} hint={"Opções de ordenação"}
            />
        </div>
        <div className={styles.principal}>
            {logs.map(l=>{
                return <OperationLog
                    title={l.titulo} operation={l.descricao} author={obterNomeUsuario(l.fkUsuario)} time={l.dataHora} adressImg={obterImagemUsuario(l.fkUsuario)}
                />
            })}
        </div>
    </>)
}