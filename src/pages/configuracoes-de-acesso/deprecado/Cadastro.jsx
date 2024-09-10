import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";
import api from "../../../api";
import TextInput from "../../../components/TextInput/TextInput"
import styles  from "./cadastro.module.css";
import Button from "../../../components/Button/Button";
import Checkbox from "../../../components/Checkbox/Checkbox"
import TopBar from "../../../components/TopBar/TopBar";
 


const Cadastro = () => {

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("");
    var [acesso, setAcesso] = useState(null);
    const [imagem, setImagem] = useState(null);
    const idResponsavel = sessionStorage.getItem("idResponsavel") || 100;

    
    
    const handleSave = () => {
        const objetoAdicionado = {
            nome,
            email,
            senha,
            acesso
        };

        console.log(nome)
        console.log(email)
        console.log(senha)
        console.log(acesso)


        // Faz uma requisição POST para a API
        api.post(`/usuarios?${new URLSearchParams({ idResponsavel })}`, objetoAdicionado).then(() => {
            toast.success("configuracoes-de-acesso realizado com sucesso!");
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
        setAcesso( 1);
        
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagem(file);
        }
    };

    return (
        <div>
                <TopBar title={"Cadastro"}/>
                <div className={styles.divPrincipal}>
                <div className={styles.divTexInput}>
                    <h4 className={styles.h4}>Email:</h4>
                    <TextInput Input value={email} type="text" onChange={(e) => handleTextInputChange(e, setEmail)}/>
                </div>
                <div className={styles.divTexInput}>
                    <h4 className={styles.h4}>Nome:</h4>
                    <TextInput value={nome} type="text" onChange={(e) => handleTextInputChange(e, setNome)}/>
                </div>
                <div className={styles.divTexInput}>
                    <h4 className={styles.h4}>Senha</h4>
                    <TextInput value={senha} type="password" onChange={(e) => handleTextInputChange(e, setSenha)}/>
                </div>
                <div className={styles.divAdministrador}>
                    <h4 className={styles.h4}>Administrador:</h4>
                    <Checkbox onClick={handleCheckboxInputChange}/>
                </div>
                <div className={styles.campo}>
                    <h4 className={styles.h4}>Adicionar uma imagem:</h4>
                    <div className={styles.devInput}>
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                    </div>
                </div>

                </div>
                <div className={styles.divButton}>
                    <Button insideText={"Confirmar"}  onClick={handleSave}/>
                </div>
        </div>
    );
};

export default Cadastro;
