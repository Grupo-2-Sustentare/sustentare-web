import IconInput from "../../../components/IconInput/IconInput.jsx";
import ListItem from "../../../components/ListItem/ListItem.jsx";
import StrechList from "../../../components/StrechList/StrechList.jsx";
import TopBar from "../../../components/TopBar/TopBar";
import style from "../categoria-produto/categoriaProduto.module.css";
import {useNavigate} from "react-router-dom";

export default function ConfigurationMenu({}){
     const navigate = useNavigate();

     return(
          <>
             <div className={style.menu}>
               <TopBar title="Categoria do produto" showBackArrow={false}/>
             </div>
            
             <div className={style.conteudoInicioTela}>
                <IconInput placeholder={"Pesquisar por nome"}/>
                <StrechList titulo=" "/>
             </div>
                <hr></hr>
             <div className={style.conteudoTela}>
                <ListItem fullBorderRadius={true} adressImg={""}/>
             </div>

          </>
     );
}