import React from 'react';
import Input from "../itemMenu/itemMenu.jsx";
import style from './menuLateral.module.css';

const MenuLateral = ({ userName, userImage }) => {
    return (
        <div className={style.sidebar}>
            <div className={style.sidebarHeader}>
                <h1>Paralelo 19</h1>
            </div>
            <div className={style.sidebarMenu}>
            <Input icon={"house"} title="Página inicial" />
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
    );
}

export default MenuLateral;