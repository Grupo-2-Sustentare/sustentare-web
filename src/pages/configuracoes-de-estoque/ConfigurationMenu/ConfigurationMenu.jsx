import IconButton from "../../../components/IconButton/IconButton";
import MenuSuperior from "../../../components/MenuSuperior/menuSuperior";
import style from "../ConfigurationMenu/configurationMenu.module.css";
import {useNavigate} from "react-router-dom";

export default function ConfigurationMenu({}){
     const navigate = useNavigate();

     return(
          <>
             <div className={style.menu}>
               <MenuSuperior title="CONFIGURAÇÕES DE ESTOQUE" showBackArrow={false}/>
             </div>

             <div className={style.containerButton}>
               <IconButton
                    icone={"fa-solid fa-tag"}
                    texto={"Produto"}
                    onClick={() => {alert("Em Desenvolvimento...")}}
               />
               <IconButton
                    icone={"fa-solid fa-list"}
                    texto={"Categorias"}
                    onClick={() => {alert("Em Desenvolvimento...")}}
               />
               <IconButton
                    icone={"fa-solid fa-scale-balanced"}
                    texto={"Unidades de medidas"}
                    onClick={() => {alert("Em Desenvolvimento...")}}
               />
             </div>
          </>
     );
}