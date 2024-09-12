import styles from "./historicoOperacoes.module.css"
import TopBar from "../../components/TopBar/TopBar";
import OperationLog from "../../components/OperationLog/OperationLog";
import IconInput from "../../components/IconInput/IconInput";
import StrechList from "../../components/StrechList/StrechList";

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
    const logs = MOCK_LOGS

    function buscarLogs(){

    }

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
                    title={l.titulo} operation={l.ato} author={l.autor} time={l.horario} adressImg={MOCK_URL + l.icone}
                />
            })}
        </div>
    </>)
}