import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../components/StrechList/StrechList"
import TextInput from "../../components/TextInput/TextInput"
import styles from "./CriandoUnidadeMedida.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import MeasurementUnitInput from "../../components/MeasumentTextInput/MeasurementUnitInput"
import TopBar from "../../components/TopBar/TopBar"
import Button from "../../components/Button/Button";
import ImageUploader from "../../components/ImageUploader/ImageUploader"
import {alertToast, successToast} from "../../components/Toast/Toast";
import { DEFAULT_BUTTON_CONFIG } from "../../components/ProductItem/Product";




const CriandoUnidadeMedida = () => {
    var buttonsConfig = undefined
    const navigate = useNavigate()
    const [valorTextInput, setValorTextInput] = useState(""); 
    const [valorEquivalente, setValorEquivalente] = useState(""); 
    const [valorStreachList, setValorStreachList] = useState(""); 
    const [ola, setOla] = useState(false);

    const handleInputChange = (value) => {
        setValorTextInput(value); 
    };

    const handleStreachListChange = (value) => {
        setValorStreachList(value); 
        if(value === "Massa"){
            setValorEquivalente("Kilograma(s)")
        }else if(value === "Volume"){
            setValorEquivalente("Litro(s)")
        }else{
            setValorEquivalente("unidade(s)")
        }
        if (value !== "" && value !== "hint") {
            setOla(true); 
        } else {
            setOla(false); 
        }
    };


    function salvar(){
        successToast("Unidade de medida criada com sucesso")
        navigate("/configuracoes-de-unidade-medida")
    }

    return (

        

        <div>
            <TopBar title={"Criando Unidade de Medida"} showBackArrow={true}/>
            <div className={styles.divPrincipal}>

                <div className={styles.TextInput}>
                    <TextInput label="Nome:" onChange={handleInputChange}/>
                </div>
                <div className={styles.TextInput}>
                    <TextInput label="Abreviação no singular:"/>
                </div>
                <div className={styles.TextInput}>
                    <TextInput label="Abreviação no plural:"/>
                </div>
                <div className={styles.TextInput}>
                    <StreachList title="Tipo:" items={["Massa","Volume","Quantidade genérica"] }titulo="" onChange={handleStreachListChange}/>
                </div>

                <div className={styles.divMeasumentTextInput}>
                    {ola ? (
                        <>
                            <h4>Um(a) {valorTextInput.toLowerCase()} equivale a</h4>
                            <div className={styles.divvMeasumentTextInput}>
                            <MeasurementUnitInput measurementUnit={valorEquivalente} />
                            </div>
                        </>
                    ) : (
                        <div className={styles.divText}>
                            <p>Selecione um tipo de <br />unidade de medida para <br />realizar o cálculo de base</p>
                        </div>
                    )}
                </div>
                
                
            </div>
                <div className={styles.divBotao}>
                    <Button insideText={"Salvar nova unidade de medida"} onClick={salvar}/>
                </div>
        </div>
    );
};

export default CriandoUnidadeMedida;
