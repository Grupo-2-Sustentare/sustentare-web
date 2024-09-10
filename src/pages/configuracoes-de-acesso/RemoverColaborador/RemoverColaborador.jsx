import React from 'react';
import TopBar from "../../../components/TopBar/TopBar";
import styles from "./RemoverColaborador.module.css";
import ListItem from '../../../components/ListItem/ListItem';
import IconButton from '../../../components/IconButton/IconButton';
import { useNavigate } from 'react-router-dom';

function RemoverColaborador() {
    const navigate = useNavigate();
    return (
        <div className={styles.Global}>
            <TopBar title={"Removendo colaborador"} showBackArrow={true}/>
            <div className={styles.Card}>
                <span>O seguinte usuário será deletado:</span>
                <ListItem
                    heading={"Antônio"}
                    subheading={"Usuário(a)"}
                    adressImg={"https://github.com/Grupo-2-Sustentare/sustentare-web/blob/main/src/assets/images/usuarios/1.png?raw=true"}
                    descImg={"Imagem do usuário"}
                />
            </div>
            <div className={styles.Buttons}>
                <IconButton texto={"Deletar"} icone={"trash"} onClick={() =>  navigate("/configuracoes-de-acesso ")}/>
                <IconButton texto={"Cancelar"} icone={"times"} onClick={() => navigate("/configuracoes-de-acesso ")}/>
            </div>
        </div>
    );
}

export default RemoverColaborador;