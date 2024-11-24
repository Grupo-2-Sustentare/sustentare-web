import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import api from "../../api";
import styles from "./EditarPerfil.module.css"
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import TopBar from "../../components/TopBar/TopBar";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import { toast } from "react-toastify";
import { errorToast, successToast } from "../../components/Toast/Toast";


const EditarPerfil = () => {
    const navigate = useNavigate();


    const [ativo, setAtivo] = useState(true)
    const responsavelString = sessionStorage.getItem("responsavel");
    const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
    const [novoUsuario, setNovoUsuario] = useState({})

    const idResponsavel = responsavel ? responsavel.id : null;
    const acessoResponsavel = responsavel ? responsavel.acesso : null;

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState(sessionStorage.getItem("senhaAtual"));
    const [email, setEmail] = useState("");
    const [acesso, setAcesso] = useState(0);
    const [imagem, setImagem] = useState(null);


    useEffect(() => {
        api.get(`/usuarios/${idResponsavel}`)
            .then((response) => {
                setNome(response.data.nome);
                setEmail(response.data.email);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    errorToast("Nome ou senha incorreto");
                } else if (error.response) {
                    toast.error("Ocorreu um erro ao tentar realizar o login-e-entrada, por favor, tente novamente.");
                } else {
                    toast.error("Erro de conexão. Verifique sua rede ou tente novamente.");
                }
            });
    }, []);



    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
        });
    }


    const adicionandoUsuarioNaSessionStorage = (teste) => {
        const usuariosString = sessionStorage.getItem('usuarios');
        const responsavelString = sessionStorage.getItem('responsavel');
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

        if (responsavelString) {
            try {
                const responsavel = JSON.parse(responsavelString);

                
                usuarios = usuarios.filter(user => user.id !== responsavel.id);
            } catch (error) {
                console.error("Erro ao analisar o JSON do responsável:", error);
            }

            
            usuarios.push(teste);

            sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
        };
    }


    const handleSave = async () => {

        console.log(nome);
        console.log(email);
        console.log(senha);
        console.log(imagem);




        const objetoAdicionado = { nome, email, senha, imagem };

        try {
            const response = await api.patch(`/usuarios/${idResponsavel}?${new URLSearchParams({ idResponsavel })}`, objetoAdicionado);
            successToast("configuracoes-de-acesso realizado com sucesso!");
            sessionStorage.setItem("Usuario cadastrado", JSON.stringify(objetoAdicionado));
            adicionandoUsuarioNaSessionStorage(response.data);
            sessionStorage.setItem("responsavel", JSON.stringify(response.data));
            navigate("/menu-inicial");
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
            <TopBar title={"Editar Perfil"} showBackArrow={true} backNavigationPath={"/menu-inicial"} />
            <div className={styles.divPrincipal}>
                <ImageUploader onImageSelect={handleImageChange} />
                <TextInput label={"Nome:"} value={nome} onChange={(e) => handleTextInputChange(e, setNome)} />
                {/* <BotaoExport/> */}
                <TextInput label={"Email:"} value={email} onChange={(e) => handleTextInputChange(e, setEmail)} />
                <TextInput label={"Senha:"} value={senha} type="password" onChange={(e) => handleTextInputChange(e, setSenha)} />
                <div className={styles.divAdministrador}>
                    <p>Administrador:</p>
                </div>
            </div>
            <div className={styles.divButton}>
                <Button insideText={"Confirmar"} onClick={handleSave} />
            </div>
        </>
    );
};

export default EditarPerfil;
