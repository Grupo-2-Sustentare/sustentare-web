import React, { useState } from "react";
import TopBar from "../../../components/TopBar/TopBar";
import styles from "./RemoverColaborador.module.css";
import ListItem from '../../../components/ListItem/ListItem';
import IconButton from '../../../components/IconButton/IconButton';
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../../api";
import { errorToast, successToast } from "../../../components/Toast/Toast";


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

    const deletarUsuario = async () => {
        try {
            await api.delete(`/usuarios/${usuario.id}?${new URLSearchParams({ idResponsavel })}`);
            removendoUsuarioDaSessionStorage()
            successToast("Usuário removido");
        } catch (error) {
            errorToast("Erro ao buscar usuários");
            console.error("Erro ao buscar usuários:", error);
        } 
        navigate("/configuracoes-de-acesso ")
    };


    const removendoUsuarioDaSessionStorage = async () => {
        const usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
   
        if (usuarios && Array.isArray(usuarios)) { // Verifica se é um array válido
            const idParaRemover = usuario.id; // ID do usuário a ser removido
            const responsavelAtualizado = usuarios.filter(item => item.id !== idParaRemover); // Remove o usuário com o ID
    

            sessionStorage.setItem('usuarios', JSON.stringify(responsavelAtualizado));
        } else {
            console.log("Não há um array válido de responsáveis na sessionStorage.");
        }
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
                <IconButton texto={"Deletar"} icone={"trash"} onClick={() => deletarUsuario()}/>
                <IconButton texto={"Cancelar"} icone={"times"} onClick={() => navigate("/configuracoes-de-acesso ")}/>
            </div>
        </div>
    );
}

export default RemoverColaborador;