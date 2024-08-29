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

export default function Debug(){
    return (
        <>
            <h3>MODO DEBUG</h3>
            <p>Teste de componentes...</p>
            <br/>
            <Button insideText={"teste!"} onClick={()=>alert("clicado!")}/>
            <IconInput label={"Senha"} type={"password"} icon={"user-secret"}/>
            <MeasurementUnitInput
                label={"teste"}
                measurementUnit={"Unidade de medida mega hiper grande"}
                onChange={()=>console.log("Mexeram na unidade!!!")}
            />
            <OperationLog
                title={"Alteração"}
                action={"Correção dos nomes dos componentes"}
                adressImg={"https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg"}
                descImg={"Fulano"}
                time={"Ontem"}
            />
            <MenuItem
                icon={"key"} title={"Chave"} onClick={()=>alert("A chave de muitos segredos.")}
            />
            <RedirectionList redirectUrl={"/menu-inicial"}/>
            {/*<Switch initialState={"On"} onChange={*/}
            {/*    (e) => alert("O Switch está:" + e.target.value)*/}
            {/*}*/}
            {/*labels={"Ligado", "Desligado"}*/}
            {/*/>*/}
        </>
    )
}