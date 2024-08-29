import IconButton from "../../../components/IconButton/IconButton";
import {useNavigate} from "react-router-dom";

export default function MainMenu({}){
    const navigate = useNavigate();

    return (
        <>
            <IconButton
                icone={"right-to-bracket"}
                texto={"Registrar movimento no estoque"}
                onClick={() => navigate("/cadastros-de-estoque")}
            />
            <IconButton
                icone={"clock-rotate-left"}
                texto={"Ver histórico de atividades"}
                onClick={() => {alert("Não Implementado")}}
            />
            <IconButton
                icone={"wrench"}
                texto={"Alterar definições do sistema"}
                onClick={() => navigate("/configuracoes-de-estoque")}
            />
            <IconButton
                icone={"users-gear"}
                texto={"Gerenciar equipe"}
                onClick={() => {alert("Não Implementado")}}
            />
        </>
    )
}