import TopBar from "../../../../components/TopBar/TopBar";
import TextInput from "../../../../components/TextInput/TextInput";
import Button from "../../../../components/Button/Button";
import style from "../editandoCategoria/editandoCategoria.module.css";
import {useNavigate} from "react-router-dom";
import { successToast } from "../../../../components/Toast/Toast";
import { useEffect, useState } from "react";

export default function ConfigurationMenu({}){
     const navigate = useNavigate();
     const [categoria, setCategoria] = useState({ nome: "" }); // Estado para armazenar a categoria

     useEffect(() => {
      // Recupera a categoria selecionada do sessionStorage
      const categoriaSelecionada = JSON.parse(sessionStorage.getItem("categoria_selecionada"));
      if (categoriaSelecionada) {
          setCategoria(categoriaSelecionada); // Armazena a categoria no estado
      }
       }, []); // Executa apenas uma vez ao carregar o componente

     function salvarEdicao(){
         successToast("Categoria editada com sucesso")
         const toastDuration = 1000;
        setTimeout(() => {
         navigate("/configuracoes-de-categorias");
       }, toastDuration);
     }

     const githubPath = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/categorias/";
     return(
          <>
             <div className={style.topBar}>
               <TopBar title="Editando Categoria" showBackArrow={true} backNavigationPath={"/configuracoes-de-categorias"}/>
            </div>
             <div className={style.meioTela}>
                <TextInput label={"Nome: "} placeholder={categoria.nome || "Nome da Categoria"}/>
             </div>
             <hr></hr>
             <div className={style.conteudoFinalTela}>
                <Button insideText={"Salvar edição"} onClick={salvarEdicao}/>
             </div>
                
          </>
     );
}