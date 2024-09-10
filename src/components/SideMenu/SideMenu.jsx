import React from 'react';
import MenuItem from "../MenuItem/MenuItem.jsx"
import style from './sideMenu.module.css';
import {useNavigate} from "react-router-dom";

const SideMenu = ({ userName, userImage }) => {
    const navigate = useNavigate();

    function logout(){
        sessionStorage.clear()
        navigate("/login")
    }

    return (
        <div className={style.divSideBar}>
            <div className={style.sidebar}>
                <div className={style.sidebarHeader}>
                    <h1>Paralelo 19</h1>
                </div>
                    <div className={style.sidebarMenu}>
                <MenuItem icon={"house"} title="Página inicial" onClick={() => navigate("/menu-inicial")}/>
                <MenuItem icon={"shapes"} title="Movimentos de estoque" onClick={() => navigate("/menu-inicial")}/>
                <MenuItem icon={"clock-rotate-left"} title="Histórico de operações" onClick={() => navigate("/menu-inicial")}/>
                <MenuItem icon={"wrench"} title="Alterar definições" onClick={() => navigate("/menu-inicial")}/>
                <MenuItem icon={"users-gear"} title="Gerenciar equipes" onClick={() => navigate("/menu-inicial")}/>
                <MenuItem icon={"circle-check"} title="Realizar Fechamento" onClick={() => navigate("/menu-inicial")}/>
                <MenuItem icon={"gear"} title="Configurações" onClick={() => navigate("/menu-inicial")}/>

                                                                                
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