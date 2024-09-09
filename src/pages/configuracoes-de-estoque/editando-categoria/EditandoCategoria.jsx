import TopBar from "../../../components/TopBar/TopBar";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import style from "../editando-categoria/editandoCategoria.module.css";
import {useNavigate} from "react-router-dom";

export default function ConfigurationMenu({}){
     const navigate = useNavigate();

     return(
          <>
             <div className={style.topBar}>
               <TopBar title="Editando Categoria" showBackArrow={true}/>
             </div>
            
             <div className={style.conteudoInicioTela}>
                <ImageUploader />
                <TextInput label={"Nome: "}/>
             </div>
             <hr></hr>
             <div className={style.conteudoFinalTela}>
                <Button insideText={"Salvar edições"}/>
             </div>
                
          </>
     );
}