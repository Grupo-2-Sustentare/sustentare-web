import IconButton from "../../components/IconButton/IconButton";
import Checkbox from "../../components/Checkbox/Checkbox";
import StrechList from "../../components/StrechList/StrechList";
import IconTextInput from "../../components/IconTextInput/IconTextInput";
import MeasurementTextInput from "../../components/MeasumentTextInput/MeasurementTextInput";
import TextSizeSlider from "../../components/TextSizeSlider/TextSizeSlider";
import RedirectionList from "../../components/RedirectionList/RedirectionList";

export default function Debug(){
    return (
        <>
            <h3>MODO DEBUG</h3>
            <p>Teste de componentes...</p>
            <br/>
            <IconButton onClick={() => alert("Você clicou no botão com ícone.")}/>
            <Checkbox/>
            <StrechList/>
            <RedirectionList/>
            <IconTextInput/>
            <MeasurementTextInput
                label={"Peso"}
                value={50}
                type={"number"}
                measurementUnit={"kilogramas"}
            />
            <TextSizeSlider/>
            <RedirectionList/>
        </>
    )
}