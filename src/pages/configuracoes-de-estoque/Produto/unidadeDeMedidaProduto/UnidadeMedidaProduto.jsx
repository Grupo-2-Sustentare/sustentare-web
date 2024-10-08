import IconInput from "../../../../components/IconInput/IconInput.jsx";
import ListItem from "../../../../components/ListItem/ListItem.jsx";
import StrechList from "../../../../components/StrechList/StrechList.jsx";
import TopBar from "../../../../components/TopBar/TopBar.jsx";
import style from "../categoriaProduto/categoriaProduto.module.css";
import { useNavigate } from "react-router-dom";

export default function ConfigurationMenu({ }) {
   const navigate = useNavigate();

   const unidadeMedidaList = [
      { "icon": "fa-solid fa-cube", "heading": "Mililitro", "subheading": "Tipo: Volume - Abreviação: ml" },
      { "icon": "fa-solid fa-hippo", "heading": "Quilograma", "subheading": "Tipo: Massa - Abreviação: kg" },
      { "icon": "fa-solid fa-circle", "heading": "Quantidade Genérica", "subheading": "Tipo: Genérico - Abreviação: un" },
      { "icon": "fa-solid fa-cube", "heading": "Sacas", "subheading": "Tipo: Volume - Abreviação: ml" },
      { "icon": "fa-solid fa-hippo", "heading": "Galão", "subheading": "Tipo: Volume - Abreviação: ml" },

   ]

   const selectListItem = (unidadeMedida) => {
      // Armazena o item selecionado na sessionStorage
      sessionStorage.setItem('selectedUnidadeMedida', JSON.stringify(unidadeMedida));

      navigate(sessionStorage.paginaRequisicao);
   };

   return (
      <>
         <div className={style.topBar}>
            <TopBar title="Unidade de Medida do produto" showBackArrow={true} backNavigationPath={"/criando-produto"} />
         </div>

         <div className={style.conteudoInicioTela}>
            <IconInput placeholder={"Pesquisar por nome"} />
            <StrechList showTitle={false} hint="Ordenar por nome" />
         </div>
         <hr></hr>
         <div className={style.conteudoTela}>
            {unidadeMedidaList.map(unidadeMedida => {
               return <ListItem
                  fullBorderRadius={true}
                  icon={unidadeMedida.icon}
                  heading={unidadeMedida.heading}
                  subheading={unidadeMedida.subheading}
                  onClick={() => selectListItem(unidadeMedida)}
               />
            })}
         </div>

      </>
   );
}