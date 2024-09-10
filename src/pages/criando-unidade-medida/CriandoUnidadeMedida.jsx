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

const CriandoUnidadeMedida = () => {
    const [valorEquivalente, setValorEquivalente] = useState(""); 
    const [valorStreachList, setValorStreachList] = useState(""); 
    const [ola, setOla] = useState(false);

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


    return (

        

        <div>
            <TopBar title={"Criando Unidade de Medida"} />
            <div className={styles.divPrincipal}>

                <div className={styles.TextInput}>
                    <h4>Nome:</h4>
                    <TextInput />
                </div>
                <div className={styles.TextInput}>
                    <h4>Abreviação no singular:</h4>
                    <TextInput />
                </div>
                <div className={styles.TextInput}>
                    <h4>Abreviação no plural:</h4>
                    <TextInput />
                </div>
                <div className={styles.TextInput}>
                    <h4>Tipo:</h4>
                    <StreachList items={["Massa","Volume","Quantidade genérica"] }titulo="" onChange={handleStreachListChange}/>
                </div>

                <div className={styles.divMeasumentTextInput}>
                    {ola ? (
                        <>
                            <h4>{typeof valorStreachList === 'string' ? valorStreachList : 'valor inválido'} equivale a</h4>
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
                    <Button insideText={"Salvar nova unidade de medida"}/>
                </div>
        </div>
    );
};

export default CriandoUnidadeMedida;
