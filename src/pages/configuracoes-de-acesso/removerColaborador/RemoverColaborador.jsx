import React from 'react';
import TopBar from "../../../components/TopBar/TopBar";
import styles from "./RemoverColaborador.module.css";
import ListItem from '../../../components/ListItem/ListItem';
import IconButton from '../../../components/IconButton/IconButton';
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../../api";

function RemoverColaborador() {
    const navigate = useNavigate();
    const location = useLocation();
    const usuario = location.state?.usuario;
    const responsavelString = sessionStorage.getItem("responsavel"); 
    const responsavel = responsavelString ? JSON.parse(responsavelString) : null; 

    const idResponsavel = responsavel ? responsavel.id : null;

    if (!usuario) {
        return <p>Nenhum usuário foi selecionado para remoção.</p>;
    }

    const fetchUsuarios = async () => {
        try {
            await api.delete(`/usuarios/${usuario.id}?${new URLSearchParams({ idResponsavel })}`);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
        navigate("/configuracoes-de-acesso ")
    };

    return (
        <div className={styles.Global}>
            <TopBar title={"Removendo colaborador"} showBackArrow={true}/>
            <div className={styles.Card}>
                <span>O seguinte usuário será deletado:</span>
                <ListItem
                    heading={usuario.nome}
                    subheading={"Usuário(a)"}
                    adressImg={`data:image/jpeg;base64,${usuario.imagem}`}
                    descImg={"Imagem do usuário"}
                />
            </div>
            <div className={styles.Buttons}>
                <IconButton texto={"Deletar"} icone={"trash"} onClick={() => fetchUsuarios()}/>
                <IconButton texto={"Cancelar"} icone={"times"} onClick={() => navigate("/configuracoes-de-acesso ")}/>
            </div>
        </div>
    );
}

export default RemoverColaborador;