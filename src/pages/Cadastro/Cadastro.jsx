import styles from "./cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/TextInput/TextInput";
import inputTextStyle from "../../components/TextInput/textInput.module.css";
import api from "../../api";
import VectorIcon from "../../components/VectorIcon/VectorIcon";
import NavBar from "../../components/NavBar/NavBar";


const Cadastro = () => {

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("");
    const [acesso, setAcesso] = useState(null);
    const [imagem, setImagem] = useState(null);
    const idResponsavel = sessionStorage.getItem("idResponsavel") || 100;

    const handleSave = () => {
        const objetoAdicionado = {
            nome,
            email,
            senha,
            acesso
        };

        // Faz uma requisição POST para a API
        api.post(`/usuarios?${new URLSearchParams({ idResponsavel })}`, objetoAdicionado).then(() => {
            toast.success("Cadastro realizado com sucesso!");
            sessionStorage.setItem("Usuario cadastrado", JSON.stringify(objetoAdicionado));
            navigate("/");
        }).catch(() => {
            toast.error("Ocorreu um erro ao tentar realizar o cadastro, por favor, tente novamente.");
        })
    };

    const handleTextInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }
    const handleCheckboxInputChange = (event) => {
        setAcesso(event.target.checked ? 1 : 0);
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagem(file);
        }
    };

    return (
        <div>
            < NavBar Icon={VectorIcon} InsideText={"ADICIONAR NOVO COLABORADOR"}/>
            <div className={styles["form"]}>
                <div className={styles["campo"]}>
                    <h2>Nome:</h2>
                    <Input value={nome} type="text" onChange={(e) => handleTextInputChange(e, setNome)}
                           className={inputTextStyle["gunMetalInput"]}/>
                </div>
                <div className={styles["campo"]}>
                    <h2>Email:</h2>
                    <Input value={email} type="text" onChange={(e) => handleTextInputChange(e, setEmail)}
                           className={inputTextStyle["gunMetalInput"]}/>
                </div>
                <div className={styles["campo"]}>
                    <h2>Senha:</h2>
                    <Input value={senha} type="password" onChange={(e) => handleTextInputChange(e, setSenha)}
                           className={inputTextStyle["gunMetalInput"]}/>
                </div>
                <div className={styles["campoCheckbox"]}>
                    <h2>Administrador:</h2>
                    <input
                        type="checkbox"
                        checked={acesso === 1}
                        onChange={handleCheckboxInputChange}
                        className={inputTextStyle["checkBox"]}
                    />
                </div>
                <div className={styles["campo"]}>
                    <h2>Adicionar uma imagem:</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className={styles["botao"]}>
                <Button insideText="Confirmar" onClick={handleSave}/>
            </div>
        </div>
    );
};

export default Cadastro;
