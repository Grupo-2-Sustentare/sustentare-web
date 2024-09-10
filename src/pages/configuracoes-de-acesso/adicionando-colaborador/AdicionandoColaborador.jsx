import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../../../api";
import styles  from "./adicionandoColaborador.module.css";
import TextInput from "../../../components/TextInput/TextInput"
import Button from "../../../components/Button/Button";
import Checkbox from "../../../components/Checkbox/Checkbox"
import TopBar from "../../../components/TopBar/TopBar";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import {errorToast, successToast} from "../../../components/Toast/Toast";
 

const AdicionandoColaborador = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("");
    const [acesso, setAcesso] = useState(0);
    const [imagem, setImagem] = useState(null);
    const idResponsavel = sessionStorage.getItem("idResponsavel") || 100;

    const handleSave = () => {
        const objetoAdicionado = {nome, email, senha, acesso};
        navigate("/configuracoes-de-acesso")

        // Faz uma requisição POST para a API
        api.post(`/usuarios?${new URLSearchParams({ idResponsavel })}`, objetoAdicionado).then(() => {
            successToast("configuracoes-de-acesso realizado com sucesso!");
            sessionStorage.setItem("Usuario cadastrado", JSON.stringify(objetoAdicionado));
            navigate("/");
        }).catch(() => {
            errorToast("Ocorreu um erro ao tentar realizar o cadastro, por favor, tente novamente.");
        })
    };

    const handleTextInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }
    const handleCheckboxInputChange = (event) => {
        setAcesso( acesso === 1 ? 0 : 1);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagem(file);
        }
    };

    return (
        <>
            <TopBar title={"Adicionando colaboradores"} showBackArrow={true}/>
            <div className={styles.divPrincipal}>
                <ImageUploader/>
                <TextInput label={"Email:"} value={nome} onChange={(e) => handleTextInputChange(e, setNome)}/>
                <TextInput label={"Nome:"} value={email} onChange={(e) => handleTextInputChange(e, setEmail)}/>
                <TextInput label={"Senha:"} value={senha} onChange={(e) => handleTextInputChange(e, setSenha)}/>
                <TextInput label={"Email:"} value={email} onChange={(e) => handleTextInputChange(e, setEmail)}/>
                <div className={styles.divAdministrador}>
                    <p>Administrador:</p>
                    <Checkbox onClick={handleCheckboxInputChange}/>
                </div>
            </div>
            <div className={styles.divButton}>
                <Button insideText={"Confirmar"}  onClick={handleSave}/>
            </div>
        </>
    );
};

export default AdicionandoColaborador;
