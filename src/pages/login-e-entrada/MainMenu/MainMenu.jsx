import IconButton from "../../../components/IconButton/IconButton";
import TopBar from "../../../components/TopBar/TopBar";
import style from "../MainMenu/mainMenu.css.module.css"
import {useNavigate} from "react-router-dom";

export default function MainMenu({}){
    const navigate = useNavigate();

    return (
        <>
        <div className={style.topBar}>
               <TopBar title="Página Inicial" showBackArrow={false}/>
        </div>
        <div className={style.botoesTela}>
        <IconButton
                icone={"right-to-bracket"}
                texto={"Registrar movimento no estoque"}
                onClick={() => navigate("/cadastros-de-estoque")}
            />
            <IconButton
                icone={"clock-rotate-left"}
                texto={"Ver histórico de atividades"}
                onClick={() => navigate("/configuracoes-de-acesso")}
            />
            <IconButton
                icone={"wrench"}
                texto={"Alterar definições do sistema"}
                onClick={() => navigate("/configuracoes-de-estoque")}
            />
            <IconButton
                icone={"users-gear"}
                texto={"Gerenciar equipe"}
                onClick={() => {navigate("/configuracoes-de-acesso")}}
            />
        </div>
        </>
    )
}