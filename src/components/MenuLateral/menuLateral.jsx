import React from 'react';
import ItemMenu from "../MenuItem/MenuItem.jsx"
import style from './menuLateral.module.css';
import {useNavigate} from "react-router-dom";

const MenuLateral = ({ userName, userImage }) => {
    const navigate = useNavigate();

    return (
        <div className={style.divSideBar}>
            <div className={style.sidebar}>
                <div className={style.sidebarHeader}>
                    <h1>Paralelo 19</h1>
                </div>
                    <div className={style.sidebarMenu}>
                <ItemMenu icon={"house"} title="Página inicial" onClick={() => {alert("Ajustar Rota para MainMenu !!!")}}/>
                                                                                
                 {/* Aqui vai o seu componente de itens do menu */}

                </div>
                <div className={style.sidebarFooter}>
                {/* alt={`${userName}`} */}
                    <img src={userImage} className={style.userImage} />
                    <div className={style.userInfo}>
                        <span className={style.userName}>{userName.toUpperCase()}</span>
                        <span className={style.logoutButton}>Sair</span>
                    </div>
                </div>
            </div>
            <div className={style.sideSideBar}>   
            </div>
        </div>
    );
}

export default MenuLateral;