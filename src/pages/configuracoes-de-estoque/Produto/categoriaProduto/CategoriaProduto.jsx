import IconInput from "../../../../components/IconInput/IconInput.jsx";
import ListItem from "../../../../components/ListItem/ListItem.jsx";
import StrechList from "../../../../components/StrechList/StrechList.jsx";
import TopBar from "../../../../components/TopBar/TopBar.jsx";
import style from "../categoriaProduto/categoriaProduto.module.css";
import {useNavigate} from "react-router-dom";

export default function ConfigurationMenu({}){
     const navigate = useNavigate();
     const githubPath = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/categorias/";

     let p = JSON.parse(sessionStorage.getItem("productBeingCreated"))

     const categoriaList = [
        {"heading": "Ingredientes do self service"},
        {"heading": "Bebidas"},
        {"heading": "Doces para encomenda"},
        {"heading": "Produtos de limpeza"},
        {"heading": "Utensilios de cozinha"},
        {"heading": "Descartáveis"},
        {"heading": "Condimentos avulsos"},
     ]

     const selectListItem = (categoria) => {
        // Armazena o item selecionado na sessionStorage
        sessionStorage.setItem('selectedCategoria', JSON.stringify(categoria));
  
        navigate(sessionStorage.paginaRequisicao);
     };

     return(
          <>
             <div className={style.topBar}>
               <TopBar title="Categoria do produto" showBackArrow={true} backNavigationPath={"/criando-produto"}/>
             </div>
            
             <div className={style.conteudoInicioTela}>
                <IconInput placeholder={"Pesquisar por nome"}/>
                <StrechList showTitle={false} hint="Ordenar por nome"/>
             </div>
                <hr></hr>
             <div className={style.conteudoTela}>
                {categoriaList.map(categoria=>{
                    return <ListItem 
                            fullBorderRadius={true} 
                            heading={categoria.heading} 
                            adressImg={categoria.adressImg}
                            onClick={() => selectListItem(categoria)}
                            />
                })}
             </div>

          </>
     );
}