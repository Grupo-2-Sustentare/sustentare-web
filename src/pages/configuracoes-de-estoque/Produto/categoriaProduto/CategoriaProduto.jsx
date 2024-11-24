import IconInput from "../../../../components/IconInput/IconInput.jsx";
import ListItem from "../../../../components/ListItem/ListItem.jsx";
import StrechList from "../../../../components/StrechList/StrechList.jsx";
import TopBar from "../../../../components/TopBar/TopBar.jsx";
import style from "../categoriaProduto/categoriaProduto.module.css";
import api from "../../../../api.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoriaProduto({ }) {
   const navigate = useNavigate();
   //   const githubPath = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/categorias/";

   //   let p = JSON.parse(sessionStorage.getItem("productBeingCreated"))

   //   const categoriaList = [
   //      {"heading": "Ingredientes do self service"},
   //      {"heading": "Bebidas"},
   //      {"heading": "Doces para encomenda"},
   //      {"heading": "Produtos de limpeza"},
   //      {"heading": "Utensilios de cozinha"},
   //      {"heading": "Descartáveis"},
   //      {"heading": "Condimentos avulsos"},
   //   ]

   const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias carregadas da API

   useEffect(() => {
      api.get("/proxy-java-api/categorias")
         .then((response) => {
            setCategorias(response.data); // Armazena os dados da API no estado
         })
         .catch((error) => {
            console.error("Erro ao buscar categorias:", error); // Trata erros
         });
   }, []);

   const selectListItem = (categoria) => {
      // Armazena o item selecionado na sessionStorage
      sessionStorage.setItem('selectedCategoria', JSON.stringify(categoria));

      navigate(sessionStorage.paginaRequisicao);
   };

   return (
      <>
         <div className={style.topBar}>
            <TopBar title="Categoria do produto" showBackArrow={true} backNavigationPath={sessionStorage.paginaRequisicao} />
         </div>

         <div className={style.conteudoInicioTela}>
            <IconInput placeholder={"Pesquisar por nome"} />
            <StrechList showTitle={false} hint="Ordenar por nome" />
         </div>
         <hr></hr>
         <div className={style.conteudoTela}>
            {categorias.map(categoria => {
               return <ListItem
                  key={categoria.id}
                  // fullBorderRadius={true}
                  heading={categoria.nome}
                  // adressImg={categoria.adressImg}
                  onClick={() => selectListItem(categoria)}
               />
            })}
         </div>

      </>
   );
}