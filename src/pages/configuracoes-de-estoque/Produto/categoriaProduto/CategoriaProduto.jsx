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
        {"heading": "Ingredientes do self service", "adressImg": githubPath + "Self%20service.png"},
        {"heading": "Bebidas", "adressImg": githubPath + "bebidas.jpg"},
        {"heading": "Doces para encomenda", "adressImg": githubPath + "doces%20encomenda.jpg"},
        {"heading": "Produtos de limpeza", "adressImg": githubPath + "prod%20limpeza.jpg"},
        {"heading": "Utensilios de cozinha", "adressImg": githubPath + "utensilios.jpg"},
        {"heading": "Descartáveis", "adressImg": githubPath + "descartaveis.jpg"},
        {"heading": "Condimentos avulsos", "adressImg": githubPath + "condimentos.jpg"},
     ]

    //  function marcarCategoria(c){
    //     p.categoriaProduto = c
    //     sessionStorage.setItem("productBeingCreated", JSON.stringify(p))
    //     navigate("/criando-produto")
    // }

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
                            />
                    // onClick={()=>marcarCategoria(categoria)}
                })}
                {/* <ListItem 
                    heading={"Ingredientes do self service"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={githubPath + "Self%20service.png"}/>
                <ListItem 
                    heading={"Bebidas"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={githubPath + "bebidas.jpg"}/>
                <ListItem 
                    heading={"Doces para encomenda"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={githubPath + "doces%20encomenda.jpg"}/>
                <ListItem 
                    heading={"Produtos de limpeza"} 
                    subheading={""} fullBorderRadius={true} 
                    adressImg={githubPath + "prod%20limpeza.jpg"}/>
                <ListItem 
                    heading={"Utensilios de cozinha"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={githubPath + "utensilios.jpg"}/>
                <ListItem 
                    heading={"Descartáveis"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={githubPath + "descartaveis.jpg"}/>
                <ListItem 
                    heading={"Condimentos avulsos"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={githubPath + "condimentos.jpg"}/> */}
             </div>

          </>
     );
}