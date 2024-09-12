import TopBar from "../../../components/TopBar/TopBar";
import TextInput from "../../../components/TextInput/TextInput";
import StrechList from "../../../components/StrechList/StrechList.jsx";
import MeasurementUnitInput from "../../../components/MeasumentTextInput/MeasurementUnitInput.jsx";
import Button from "../../../components/Button/Button";
import style from "../editando-unidade-de-medida/editandoUnidadeDeMedida.module.css";
import {useNavigate} from "react-router-dom";
import { successToast } from "../../../components/Toast/Toast.jsx";

export default function ConfigurationMenu({}){
     const navigate = useNavigate();

     function salvarEdicao(){
        successToast("Unidade de medida editada com sucesso")
     }

     return(
          <>
             <div className={style.topBar}>
               <TopBar title="Editando unidade de medida" showBackArrow={true} backNavigationPath={"/configuracoes-de-unidade-medida"}/>
             </div>
            
             <div className={style.conteudoInicioTela}>
                <TextInput label={"Nome: "}/>
                <TextInput label={"Abreviação no singular: "}/>
                <TextInput label={"Abreviação no plural: "}/>
                <StrechList showTitle={true} title="Tipo" hint="Unidade Genérica"/>
                <div className={style.divUnidadeMedida}>
                    <MeasurementUnitInput placeholder={"0"} label={"Um(a) " + " equivale a"} measurementUnit={"unidade"}/>
                </div>
             </div>
             <hr></hr>
             <div className={style.conteudoFinalTela}>
                <Button insideText={"Salvar edição"} onClick={salvarEdicao}/>
             </div>
                
          </>
     );
}