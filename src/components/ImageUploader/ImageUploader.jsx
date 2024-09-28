import styles from "./imageUploader.module.css"
import {get} from "axios";
import {useState} from "react";

const FORMATOS_VALIDOS = [
    "avif", "jfif", "pjpeg", "pjp", "bmp", "png", "jpg", "jpeg", "webp"
]

export default function ImageUploader({oldImage=null, onImageSelect}){
    // Param oldImage: Usado na edição de um registro, para demonstrar a imagem atualmente sendo usada.


    function getImage(e){
        let upload = e.target.files[0]

        if (upload === undefined){return}

        let formato = upload.name.split(".")
        formato = formato[formato.length -1]

        if (!FORMATOS_VALIDOS.includes(formato)){
            // Trocar por toast futuramente!
            alert("Formato de imagem inválido!")
            return;
        }

        let elementoImg = URL.createObjectURL(upload)
        setUploadMessage("Imagem enviada com sucesso!")
        setUploadedImage(elementoImg)

        onImageSelect(upload);
    }

    const [uploadMessage, setUploadMessage] = useState("Selecione uma imagem da sua galeria")
    const [uploadedImg, setUploadedImage] = useState(oldImage)

    return (<div className={styles.imageUploader}>
        <label htmlFor={"fileInput"}>
            <div style={{backgroundImage: `url(${uploadedImg})`}}/>
            <p>{uploadMessage}</p>
        </label>
        <input id={"fileInput"} type={"file"} onChange={(e) => getImage(e)}/>
    </div>)
}