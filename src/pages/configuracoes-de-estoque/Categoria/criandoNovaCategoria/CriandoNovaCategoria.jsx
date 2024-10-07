import TopBar from "../../../../components/TopBar/TopBar";
import api from "../../../../api";
import TextInput from "../../../../components/TextInput/TextInput";
import Button from "../../../../components/Button/Button";
import style from "../criandoNovaCategoria/criandoNovaCategoria.module.css";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../../../components/Toast/Toast";
import { useState } from "react";

export default function ConfigurationMenu({ }) {
   const navigate = useNavigate();
   const [nomeCategoria, setNomeCategoria] = useState(""); // Estado para o nome da categoria
   const [ativo, setAtivo] = useState(""); // Estado para a descrição
    const [loading, setLoading] = useState(false); // Estado para loading

   const idResponsavel = 100; // pegar da sessionStorage futuramente

   // Função que cria a nova categoria
   async function criarCategoria() {
      if (!nomeCategoria) {
         alert("O nome da categoria não pode estar vazio.");
         return;
      }
      try {
         // Fazendo a requisição POST para criar a categoria
         const response = await api.post(`/categorias?idResponsavel=${idResponsavel}`, {
            nome: nomeCategoria,
            ativo: 1
         });

         if (response.status === 200) { // Verifica se a criação foi bem-sucedida
            successToast("Categoria criada com sucesso");
            const toastDuration = 1000;
            setTimeout(() => {
               navigate("/configuracoes-de-categorias");
            }, toastDuration);
         }
      } catch (error) {
         if (error.response) {
            // O servidor respondeu com um código de status fora do intervalo de 2xx
            console.error("Erro ao criar a categoria:", error.response.data);
            alert(`Erro: ${error.response.data.message || "Ocorreu um erro ao tentar criar a categoria."}`);
         } else {
            console.error("Erro ao criar a categoria:", error);
            alert("Ocorreu um erro ao tentar criar a categoria.");
         }
      }
   }

   return (
      <>
         <div className={style.topBar}>
            <TopBar title="Criando nova Categoria" showBackArrow={true} backNavigationPath={"/configuracoes-de-categorias"} />
         </div>
         <div className={style.meioTela}>
            <TextInput
               label={"Nome: "}
               value={nomeCategoria} // Adicionando o valor do estado
               onChange={(e) => setNomeCategoria(e.target.value)} // Atualiza o estado ao digitar
            />
         </div>
         <hr></hr>
         <div className={style.conteudoFinalTela}>
            <Button insideText={"Salvar nova categoria"} onClick={criarCategoria} />
         </div>

      </>
   );
}