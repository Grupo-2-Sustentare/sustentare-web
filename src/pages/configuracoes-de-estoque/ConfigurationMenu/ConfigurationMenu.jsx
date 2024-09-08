import api from "../../../api"
import { useEffect, useState } from "react";
import IconButton from "../../../components/IconButton/IconButton";
import TopBar from "../../../components/TopBar/TopBar";
import style from "../ConfigurationMenu/configurationMenu.module.css";
import { useNavigate } from "react-router-dom";



export default function ConfigurationMenu({ }) {
     const [produtos, setProdutos] = useState([]);
     const navigate = useNavigate();

     const fetchProdutos = () => {
          try {
               const response = api.get(`/produtos`);
               setProdutos(response.data)
               console.log(produtos)
          } catch {
               console.log()
          }
          }


     return (
          <>
               <div className={style.menu}>
                    <TopBar title="CONFIGURAÇÕES DE ESTOQUE" showBackArrow={false} />
               </div>
               
               <div className={style.containerButton}>
                    <IconButton
                         icone={"fa-solid fa-tag"}
                         texto={"Produto"}
                         onClick={() => { alert("Em Desenvolvimento...") }}
                    />
                    <IconButton
                         icone={"fa-solid fa-list"}
                         texto={"Categorias"}
                         onClick={() => { alert("Em Desenvolvimento...") }}
                    />
                    <IconButton
                         icone={"fa-solid fa-scale-balanced"}
                         texto={"Unidades de medidas"}
                         onClick={() => { alert("Em Desenvolvimento...") }}
                    />
               </div>
          </>
     );
}
