import TopBar from "../../../components/TopBar/TopBar";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import TextInput from "../../../components/TextInput/TextInput";
import Button from "../../../components/Button/Button";
import style from "../criando-nova-categoria/criandoNovaCategoria.module.css";
import {useNavigate} from "react-router-dom";
import { successToast } from "../../../components/Toast/Toast";

export default function ConfigurationMenu({}){
     const navigate = useNavigate();

     function categoriaCriada(){
      successToast("Categoria criada com sucesso")
      navigate("/configuracoes-de-categorias")
     }

     return(
          <>
             <div className={style.topBar}>
               <TopBar title="Criando nova Categoria" showBackArrow={true} backNavigationPath={"/configuracoes-de-categorias"}/>
             </div>
            
             <div className={style.conteudoInicioTela}>
                <ImageUploader />
             </div>
             <div className={style.meioTela}>
                <TextInput label={"Nome: "}/>
             </div>
             <hr></hr>
             <div className={style.conteudoFinalTela}>
                <Button insideText={"Salvar nova categoria"} onClick={categoriaCriada}/>
             </div>
                
          </>
     );
}