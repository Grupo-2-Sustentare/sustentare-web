import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../../../api";
import styles from "./adicionandoColaborador.module.css";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import Checkbox from "../../../components/Checkbox/Checkbox";
import TopBar from "../../../components/TopBar/TopBar";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import { errorToast, successToast } from "../../../components/Toast/Toast";

const AdicionandoColaborador = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [acesso, setAcesso] = useState(0);
    const [imagem, setImagem] = useState(null);
    const [ativo, setAtivo] = useState(true)
    const idResponsavel = sessionStorage.getItem("idResponsavel") || 100;

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleSave = async () => {
        console.log(nome);
        console.log(ativo)
        console.log(email);
        console.log(senha);
        console.log(acesso);
        console.log(imagem);
        

        const objetoAdicionado = {nome, email, senha, acesso, ativo, imagem};

        try {
            await api.post(`/usuarios?${new URLSearchParams({ idResponsavel })}`, objetoAdicionado);
            successToast("configuracoes-de-acesso realizado com sucesso!");
            sessionStorage.setItem("Usuario cadastrado", JSON.stringify(objetoAdicionado));
            navigate("/");
        } catch {
            errorToast("Ocorreu um erro ao tentar realizar o cadastro, por favor, tente novamente.");
        }
    };

    const handleTextInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };

    const handleImageChange = async (file) => {
        if (file) {
            const base64Image = await toBase64(file);
            setImagem(base64Image);
        }
    };

    return (
        <>
            <TopBar title={"Adicionando colaboradores"} showBackArrow={true} />
            <div className={styles.divPrincipal}>
                <ImageUploader onImageSelect={handleImageChange} />
                <TextInput label={"Nome:"} value={nome} onChange={(e) => handleTextInputChange(e, setNome)} />
                <TextInput label={"Email:"} value={email} onChange={(e) => handleTextInputChange(e, setEmail)} />
                <TextInput label={"Senha:"} value={senha} type="password" onChange={(e) => handleTextInputChange(e, setSenha)} />
                <div className={styles.divAdministrador}>
                    <p>Administrador:</p>
                    <Checkbox checked={acesso === 1} onChange={(novoValor) => setAcesso(novoValor)} />
                </div>
            </div>
            <div className={styles.divButton}>
                <Button insideText={"Confirmar"} onClick={handleSave} />
            </div>
        </>
    );
};

export default AdicionandoColaborador;
