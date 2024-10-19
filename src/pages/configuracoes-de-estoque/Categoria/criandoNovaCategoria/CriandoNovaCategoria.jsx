import TopBar from "../../../../components/TopBar/TopBar";
import api from "../../../../api";
import TextInput from "../../../../components/TextInput/TextInput";
import Button from "../../../../components/Button/Button";
import style from "../criandoNovaCategoria/criandoNovaCategoria.module.css";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../../components/Toast/Toast";
import { useState, useEffect } from "react";

export default function CriandoCategoria({ }) {
   const navigate = useNavigate();
   const [nomeCategoria, setNomeCategoria] = useState(""); // Estado para o nome da categoria
   const [categoriasExistentes, setCategoriasExistentes] = useState([]); // Iniciar como array vazio

   const idResponsavel = 100; // pegar da sessionStorage futuramente

   // Função para buscar categorias existentes
   async function buscarCategorias() {
      try {
         const response = await api.get(`/categorias`); // Faz a requisição GET para listar categorias
         setCategoriasExistentes(response.data); // Atualiza o estado com as categorias obtidas
      } catch (error) {
         console.error("Erro ao buscar categorias:", error);
         errorToast("Ocorreu um erro ao buscar as categorias.");
      }
   }

   useEffect(() => {
      // Chama a função de buscar categorias quando o componente é montado
      buscarCategorias();
   }, []); // Executa apenas uma vez, ao montar o componente

   // Função que cria a nova categoria
   async function criarCategoria() {
      const nomeCategoriaTrimmed = nomeCategoria.trim(); // Remove espaços em branco no início e no fim

      if (!nomeCategoriaTrimmed) {
         errorToast("O nome da categoria não pode estar vazio.");
         return;
      }

      // Converte o nome da categoria e os nomes existentes para lowercase para a comparação
      const categoriaDuplicada = categoriasExistentes.some(categoria => categoria.nome.toLowerCase() === nomeCategoriaTrimmed.toLowerCase());
      if (categoriaDuplicada) {
         errorToast("Já existe uma categoria com esse nome.");
         return;
      }

      try {
         // Fazendo a requisição POST para criar a categoria
         const response = await api.post(`/categorias?idResponsavel=${idResponsavel}`, {
            nome: nomeCategoriaTrimmed, // Envia o nome da categoria sem espaços extras
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
            errorToast(error.response.data.message || "Ocorreu um erro ao tentar criar a categoria.");
         } else {
            console.error("Erro ao criar a categoria:", error);
            errorToast("Ocorreu um erro ao tentar criar a categoria.");
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
