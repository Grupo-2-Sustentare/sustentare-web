import TopBar from "../../../../components/TopBar/TopBar";
import TextInput from "../../../../components/TextInput/TextInput";
import Button from "../../../../components/Button/Button";
import style from "../editandoCategoria/editandoCategoria.module.css";
import api from "../../../../api";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../../components/Toast/Toast";
import { useEffect, useState } from "react";

export default function EditandoCategoria({ }) {
   const navigate = useNavigate();
   const [categoria, setCategoria] = useState({ nome: "" }); // Estado para armazenar a categoria

   useEffect(() => {
      // Recupera a categoria selecionada do sessionStorage
      const categoriaSelecionada = JSON.parse(sessionStorage.getItem("categoria_selecionada"));
      if (categoriaSelecionada) {
         setCategoria(categoriaSelecionada); // Armazena a categoria no estado
      }
   }, []); // Executa apenas uma vez ao carregar o componente

   // Função para lidar com a mudança no campo de input
   const handleInputChange = (e) => {
      setCategoria({ ...categoria, nome: e.target.value }); // Atualiza o nome da categoria no estado
   };

   async function salvarEdicao() {
      if (!categoria.nome.trim()) {
         errorToast("O nome da categoria não pode estar vazio."); // Exibe um toast de erro
         return; // Impede a execução do restante da função
      }
      const responsavelString = sessionStorage.getItem("responsavel");
      const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
      const idResponsavel = responsavel ? responsavel.id : null;

      api.put(`/categorias/${categoria.id}?idResponsavel=${idResponsavel}`, { nome: categoria.nome, ativo: categoria.ativo})
         .then((response) => {
            successToast("Categoria editada com sucesso!"); // Exibe a mensagem de sucesso
            const toastDuration = 1000;
            setTimeout(() => {
               navigate("/configuracoes-de-categorias"); // Redireciona o usuário
            }, toastDuration);
         })
         .catch((error) => {
            console.error("Erro ao editar a categoria:", error); // Trata erros
            errorToast("Ocorreu um erro ao editar a categoria.");
         });
   }

   const githubPath = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/categorias/";
   return (
      <>
         <div className={style.topBar}>
            <TopBar title="Editando Categoria" showBackArrow={true} backNavigationPath={"/configuracoes-de-categorias"} />
         </div>
         <div className={style.meioTela}>
            <TextInput
               label={"Nome: "}
               value={categoria.nome} // Valor controlado do input
               onChange={handleInputChange} // Função para atualizar o estado
               placeholder={categoria.nome || "Nome da Categoria"} />
         </div>
         <hr></hr>
         <div className={style.conteudoFinalTela}>
            <Button insideText={"Salvar edição"} onClick={salvarEdicao} />
         </div>

      </>
   );
}