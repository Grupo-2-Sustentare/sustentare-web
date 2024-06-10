import styles from "./cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/TextInput/TextInput";
import api from "../../api";
import VectorIcon from "../../components/VectorIcon/VectorIcon";
import NavBar from "../../components/NavBar/NavBar";


const Cadastro = () => {

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("");
    const [acesso, setAcesso] = useState(null);

    const handleSave = () => {
        const objetoAdicionado = {
            nome,
            email,
            senha,
            acesso
        };

        // Faz uma requisição POST para a API
        api.post(`/usuarios`, objetoAdicionado).then(() => {
            toast.success("Cadastro realizado com sucesso!");
            sessionStorage.setItem("Usuario cadastrado", JSON.stringify(objetoAdicionado));
            navigate("/");
        }).catch(() => {
            toast.error("Ocorreu um erro ao tentar realizar o cadastro, por favor, tente novamente.");
        })
    };

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    }

    return (
            <div className={styles["navBar"]}>
                < NavBar Icon={VectorIcon} InsideText={"TESTEEEEEE"} />
            </div>
        // <div className={styles["cadastro"]}>
        //     <div className={styles["navBar"]}>
        //     <VectorIcon />
        //     </div>
        //     <div>
        //         <div className={styles["campo"]}>
        //             <h2>Nome:</h2>
        //             <Input value={nome} type="text" onChange={(e) => handleInputChange(e, setNome)}/>
        //         </div>
        //         <div className={styles["campo"]}>
        //             <h2>Email:</h2>
        //             <Input value={email} type="text" onChange={(e) => handleInputChange(e, setEmail)}/>
        //         </div>
        //         <div className={styles["campo"]}>
        //             <h2>Senha:</h2>
        //             <Input value={senha} type="password" onChange={(e) => handleInputChange(e, setSenha)}/>
        //         </div>
        //         <div className={styles["campo"]}>
        //             <h2>Acesso:</h2>
        //             <Input value={acesso} type="toggle" onChange={(e) => handleInputChange(e, setAcesso)}/>
        //         </div>
        //         <div className={styles["containerBotao"]}>
        //             <Button insideText="Entrar" onClick={handleSave}/>
        //         </div>
        //     </div>
        // </div>

    );
};

export default Cadastro;
