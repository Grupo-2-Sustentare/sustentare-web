import { useEffect, useState } from "react";
import IconInput from "../../../../components/IconInput/IconInput.jsx";
import ListItem from "../../../../components/ListItem/ListItem.jsx";
import StrechList from "../../../../components/StrechList/StrechList.jsx";
import TopBar from "../../../../components/TopBar/TopBar.jsx";
import style from "../categoriaProduto/categoriaProduto.module.css";
import api from "../../../../api.js";
import { useNavigate } from "react-router-dom";

export default function ConfigurationMenu({ }) {
   const navigate = useNavigate();

   // const unidadeMedidaList = [
   //    { "icon": "fa-solid fa-cube", "heading": "Mililitro", "subheading": "Tipo: Volume - Abreviação: ml" },
   //    { "icon": "fa-solid fa-hippo", "heading": "Quilograma", "subheading": "Tipo: Massa - Abreviação: kg" },
   //    { "icon": "fa-solid fa-circle", "heading": "Quantidade Genérica", "subheading": "Tipo: Genérico - Abreviação: un" },
   //    { "icon": "fa-solid fa-cube", "heading": "Sacas", "subheading": "Tipo: Volume - Abreviação: ml" },
   //    { "icon": "fa-solid fa-hippo", "heading": "Galão", "subheading": "Tipo: Volume - Abreviação: ml" },

   // ]

   const [unidades, setUnidades] = useState([]);

    useEffect(() => {
        // Faz a requisição GET para buscar as unidades de medida
        const fetchUnidades = async () => {
            try {
                const response = await api.get('/unidades-medida'); // Atualize a URL de acordo com sua API
                setUnidades(response.data);
            } catch (error) {
                console.error("Erro ao buscar unidades de medida:", error);
            }
        };
        fetchUnidades();
    }, []);


   const selectListItem = (unidadeMedida) => {
      // Armazena o item selecionado na sessionStorage
      sessionStorage.setItem('selectedUnidadeMedida', JSON.stringify(unidadeMedida));

      navigate(sessionStorage.paginaRequisicao);
   };

   const getIconByCategory = (categoria) => {
      if (categoria === "Volume" || categoria === "volume") {
          return "fa-solid fa-cube"; // Ícone para Volume
      } else if (categoria === "Massa") {
          return "fa-solid fa-hippo"; // Ícone para Massa
      } else if (categoria === "Unidade" || categoria === "unidade" || categoria === "Genérico" || categoria === "genérico") {
          return "fa-solid fa-circle"; // Ícone para Quantidade
      } else {
          return "fa-solid fa-question"; // Ícone padrão para outros tipos
      }
  };

   return (
      <>
         <div className={style.topBar}>
            <TopBar title="Unidade de Medida do produto" showBackArrow={true} backNavigationPath={sessionStorage.paginaRequisicao} />
         </div>

         <div className={style.conteudoInicioTela}>
            <IconInput placeholder={"Pesquisar por nome"} />
            <StrechList showTitle={false} hint="Ordenar por nome" />
         </div>
         <hr></hr>
         <div className={style.conteudoTela}>
            {unidades.map(unidadeMedida => {
               return <ListItem
                  // fullBorderRadius={true}
                  icon={getIconByCategory(unidadeMedida.categoria)}
                  heading={unidadeMedida.nome}
                  subheading={unidadeMedida.categoria}
                  onClick={() => selectListItem(unidadeMedida)}
               />
            })}
         </div>

      </>
   );
}