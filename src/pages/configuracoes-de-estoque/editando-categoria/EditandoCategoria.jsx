import TopBar from "../../../components/TopBar/TopBar";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import style from "../editando-categoria/editandoCategoria.module.css";
import {useNavigate} from "react-router-dom";
import { successToast } from "../../../components/Toast/Toast";

export default function ConfigurationMenu({}){
     const navigate = useNavigate();

     function salvarEdicao(){
         successToast("AAAAAAAAAAAAA")
     }

     const githubPath = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/categorias/";
     return(
          <>
             <div className={style.topBar}>
               <TopBar title="Editando Categoria" showBackArrow={true}/>
             </div>
            
             <div className={style.conteudoInicioTela}>
                <ImageUploader oldImage={githubPath + "bebidas.jpg"}/>
                <TextInput label={"Nome: "} placeholder={"Bebidas"}/>
             </div>
             <hr></hr>
             <div className={style.conteudoFinalTela}>
                <Button insideText={"Salvar edição"} onClick={salvarEdicao}/>
             </div>
                
          </>
     );
}