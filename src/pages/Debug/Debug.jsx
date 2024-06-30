import IconButton from "../../components/IconButton/IconButton";
import Checkbox from "../../components/Checkbox/Checkbox";

export default function Debug(){
    return (
        <>
            <h3>MODO DEBUG</h3>
            <p>Teste de componentes...</p>
            <br/>
            <IconButton onClick={() => alert("Você clicou no botão com ícone.")}/>
            <Checkbox/>
        </>
    )
}