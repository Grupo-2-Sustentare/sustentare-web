import styles from "./login.module.css";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import { toast } from "react-toastify"; // Importa toast para exibir mensagens de sucesso ou erro
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import Button from "../../components/Button/Button";
import Input from "../../components/TextInput/TextInput";
import api from "../../api";


const Login = () => {

  const navigate = useNavigate(); // Inicializa o hook de navegação
  const [nome, setNome] = useState(""); // Estado para armazenar o ano da música
  const [senha, setSenha] = useState(""); // Estado para armazenar o gênero da música

  const handleSave = () => {
      const objetoAdicionado = { // Cria um objeto com os dados do formulário
         nome,
         senha
      };

      // Faz uma requisição POST para a API
      api.post(`/usuarios/login`, objetoAdicionado).then(() => {
          toast.success("Novo Card criado com sucesso!"); // Exibe uma mensagem de sucesso
          sessionStorage.setItem("editado", JSON.stringify(objetoAdicionado)); // Armazena os dados na sessionStorage
          navigate("/"); // Redireciona para a página de músicas
      }).catch(() => {
          toast.error("Ocorreu um erro ao tentar realizar o login, por favor, tente novamente."); // Exibe uma mensagem de erro se a requisição falhar
      })
  };

  const handleInputChange = (event, setStateFunction) => { // Função para manipular as mudanças nos inputs
    setStateFunction(event.target.value); // Atualiza o estado correspondente
}

  return (
    <div className={styles["login"]}>
      <h1>Paralelo 19</h1>
      <div>
        <div className={styles["campo"]}>
          <h2>Nome:</h2>
          <Input value={nome} type="text" onChange={(e) => handleInputChange(e, setNome)}/>
        </div>
        <div className={styles["campo"]}>
          <h2>Senha:</h2>
          <Input value={senha} type="text" onChange={(e) => handleInputChange(e, setSenha)}/>
        </div>
        <div className={styles["containerBotao"]}>
          <Button insideText="Entrar" onClick={handleSave} />
        </div>
      </div>
    </div>

    
  );
};

export default Login;