import styles from "./login.module.css";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/TextInput/TextInput";
import api from "../../../api";
import { errorToast, successToast } from "../../../components/Toast/Toast";

const Login = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    const handleSave = () => {
        api.post(`/usuarios/login`, {nome, senha}).then((res) => {
            sessionStorage.setItem("responsavel", JSON.stringify(res.data))
            sessionStorage.setItem("nome_usuario", nome)
            sessionStorage.setItem("senhaAtual", senha)
            sessionStorage.setItem("icone_usuario", "https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1")

            successToast("Login feito com sucesso");
            navigate("/menu-inicial")
        }).catch((err) => {
            if (err.response === undefined){
                errorToast(`Erro desconhecido no servidor. \nContate o suporte.`)
                return
            }
            err.response.status === 401 ?
                errorToast("Nome ou senha incorreto") : errorToast(`Erro desconhecido. \nContate o suporte.`)
        })
    };

    const handleInputChange = (event, setStateFunction) => {
        const value = event.target.value;
        setStateFunction(value);
    };

    return (
        <div className={styles.login}>
            <h1>Paralelo 19</h1>
            <form>
                <TextInput label={"Nome:"}   value={nome} onChange={(e) => handleInputChange(e, setNome)} />
                <TextInput label={"Senha:"}  type="password"  value={senha} onChange={(e) => handleInputChange(e, setSenha)} />
            </form>
            <Button insideText="Entrar" onClick={handleSave} />
        </div>

    );
};

export default Login;
