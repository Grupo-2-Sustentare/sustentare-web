import React from 'react';
import MenuItem from "../MenuItem/MenuItem.jsx"
import style from './sideMenu.module.css';
import {useNavigate} from "react-router-dom";

const SideMenu = ({ userName, userImage }) => {
    const navigate = useNavigate();

    function logout(){
        sessionStorage.clear()
        navigate("/")
    }

    return (
        <div className={style.divSideBar}>
            <div className={style.sidebar}>
                <div className={style.sidebarHeader}>
                    <h1>Paralelo 19</h1>
                </div>
                    <div className={style.sidebarMenu}>
                <MenuItem icon={"house"} title="Página inicial" onClick={() => navigate("/menu-inicial")}/>
                <MenuItem icon={"shapes"} title="Movimentos de estoque" onClick={() => navigate("/cadastros-de-estoque")}/>
                <MenuItem icon={"clock-rotate-left"} title="Histórico de operações" onClick={() => navigate("/historico-de-operacoes")}/>
                <MenuItem icon={"wrench"} title="Alterar definições" onClick={() => navigate("/configuracoes-de-estoque")}/>
                <MenuItem icon={"users-gear"} title="Gerenciar equipes" onClick={() => navigate("/configuracoes-de-acesso")}/>
                {/*<MenuItem icon={"circle-check"} title="Realizar Fechamento" onClick={() => navigate("/menu-inicial")}/>*/}
                <MenuItem icon={"gear"} title="Configurações" onClick={() => navigate("/configuracoes")}/>

                                                                                
                 {/* Aqui vai o seu componente de itens do menu */}

                </div>
                <div className={style.sidebarFooter}>
                {/* alt={`${userName}`} */}
                    <img src={userImage} className={style.userImage} />
                    <div className={style.userInfo}>
                        <span className={style.userName}>{userName.toUpperCase()}</span>
                        <span className={style.logoutButton} onClick={()=>logout()}>Sair</span>
                    </div>
                </div>
            </div>
            <div className={style.sideSideBar}>   
            </div>
        </div>
    );
}

export default SideMenu;