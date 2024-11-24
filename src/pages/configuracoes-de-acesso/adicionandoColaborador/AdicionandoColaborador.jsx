import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import api from "../../../api";
import styles from "./adicionandoColaborador.module.css";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import Checkbox from "../../../components/Checkbox/Checkbox";
import TopBar from "../../../components/TopBar/TopBar";
import BotaoExport from "../../../components/buttonExport/BotaoExport";
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
    const responsavelString = sessionStorage.getItem("responsavel");
    const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
    const [novoUsuario, setNovoUsuario] = useState({})

    const idResponsavel = responsavel ? responsavel.id : null;
    const acessoResponsavel = responsavel ? responsavel.acesso : null;


    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
        });
    }


    // const fetchUsuarioAdicionado = async () => {
    //     try {
    //         const response = await api.get('/usuarios/usuario-ultimo-id');
    //         setNovoUsuario(response.data);
    //         console.log("----------------")
    //         console.log(response.data)
    //         console.log("----------------")
    //         adicionandoUsuarioNaSessionStorage(response.data)
    //         navigate("/configuracoes-de-acesso");
    //     } catch (error) {
    //         console.error("Erro ao buscar usuários");
    //     }
    // };
    




    const adicionandoUsuarioNaSessionStorage = (teste) => {
        const usuariosString = sessionStorage.getItem('usuarios');
        let usuarios = [];
    
        if (usuariosString) {
            try {
                usuarios = JSON.parse(usuariosString);
                if (!Array.isArray(usuarios)) {
                    console.log("O valor armazenado não é um array. Será criado um novo array.");
                    usuarios = [];
                }
            } catch (error) {
                console.error("Erro ao analisar o JSON de usuários:", error);
                usuarios = [];
            }
        }
    
        // Adiciona o novo usuário, que agora está sendo passado diretamente
        usuarios.push(teste);
    
        sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
    };


    const handleSave = async () => {
        console.log(nome);
        console.log(ativo)
        console.log(email);
        console.log(senha);
        console.log(acesso);
        console.log(imagem);
        


        const objetoAdicionado = { nome, email, senha, acesso, ativo, imagem };

        try {
            if (acessoResponsavel == 1) {
                const response = await api.post(`/proxy-java-api/usuarios?${new URLSearchParams({ idResponsavel })}`, objetoAdicionado);
                successToast("configuracoes-de-acesso realizado com sucesso!");
                sessionStorage.setItem("Usuario cadastrado", JSON.stringify(objetoAdicionado));
                adicionandoUsuarioNaSessionStorage(response.data); 
                navigate("/configuracoes-de-acesso");
            } else {
                console.log(acessoResponsavel)
                errorToast("Usuário não tem permissão de cadastrar outro usuário");
            }

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
            <TopBar title={"Adicionando colaboradores"} showBackArrow={true} backNavigationPath={"/configuracoes-de-acesso"}/>
            <div className={styles.divPrincipal}>
                <ImageUploader onImageSelect={handleImageChange} />
                <TextInput label={"Nome:"} value={nome} onChange={(e) => handleTextInputChange(e, setNome)} />
                {/* <BotaoExport/> */}
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
