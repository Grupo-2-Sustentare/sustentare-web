import IconButton from "../../components/IconButton/IconButton";
import Checkbox from "../../components/Checkbox/Checkbox";
import StrechList from "../../components/StrechList/StrechList";
import IconInput from "../../components/IconInput/IconInput";
import MeasurementUnitInput from "../../components/MeasumentTextInput/MeasurementUnitInput";
import TextSizeSlider from "../../components/TextSizeSlider/TextSizeSlider";
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import Placeholder from "../../components/Placeholder/Placeholder";
import Button from "../../components/Button/Button";
import CriandoProduto from "../criando-novo-produto/CriandoProduto";
import OperationLog from "../../components/OperationLog/OperationLog";
import MenuItem from "../../components/MenuItem/MenuItem";
import Switch from "../../components/Switch/Switch";
import TopBar from "../../components/TopBar/TopBar";
import SideMenu from "../../components/SideMenu/SideMenu";
import ImageUploader from "../../components/ImageUploader/ImageUploader";

const IMG_PLACEHOLDER = "https://via.assets.so/img.jpg?w=400&h=400&tc=gray&bg=#cecece"
const DESC_PLACEHOLDER = "Imagem cinza temporária, para ser substituída no futuro."

export default function Debug(){
    sessionStorage.setItem("nome_usuario", "Antônio")
    sessionStorage.setItem(
        "icone_usuario", "https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1"
    )
    return (
        <>
            <h3>MODO DEBUG</h3>
            <p>Teste de componentes...</p>
            <br/>
            <TopBar/>

            <Button insideText={"teste!"} onClick={()=>alert("clicado!")}/>
            {/*<IconInput label={"Senha"} type={"password"} icon={"user-secret"}/>*/}
            {/*<MeasurementUnitInput*/}
            {/*    label={"teste"}*/}
            {/*    measurementUnit={"Unidade de medida mega hiper grande"}*/}
            {/*    onChange={()=>console.log("Mexeram na unidade!!!")}*/}
            {/*/>*/}
            <OperationLog
                title={"Alteração"}
                action={"Correção dos nomes dos componentes"}
                adressImg={"https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg"}
                descImg={"Fulano"}
                time={"Ontem"}
            />
            {/*<MenuItem*/}
            {/*    icon={"key"} title={"Chave"} onClick={()=>alert("A chave de muitos segredos.")}*/}
            {/*/>*/}
            {/*<RedirectionList redirectUrl={"/menu-inicial"}/>*/}
            {/*<Switch initialState={true}*/}
            {/*        action={(v) => alert("O Switch está: " + v)}*/}
            {/*        labels={{on: "Ligado", off: "Desligado"}}*/}
            {/*/>*/}
            <ImageUploader oldImage={IMG_PLACEHOLDER}/>
        </>
    )
}