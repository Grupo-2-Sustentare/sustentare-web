import IconButton from "../../components/IconButton/IconButton";
import Checkbox from "../../components/Checkbox/Checkbox";
import StrechList from "../../components/StrechList/StrechList";
import IconInput from "../../components/IconInput/IconInput";
import MeasurementUnitInput from "../../components/MeasumentTextInput/MeasurementUnitInput";
import TextSizeSlider from "../../components/TextSizeSlider/TextSizeSlider";
import RedirectionList from "../../components/RedirectionList/RedirectionList";
import Placeholder from "../../components/Placeholder/Placeholder";
import Button from "../../components/Button/Button";
import CriandoProduto from "../configuracoes-de-estoque/Produto/criandoNovoProduto/CriandoProduto";
import OperationLog from "../../components/OperationLog/OperationLog";
import MenuItem from "../../components/MenuItem/MenuItem";
import Switch from "../../components/Switch/Switch";
import TopBar from "../../components/TopBar/TopBar";
import SideMenu from "../../components/SideMenu/SideMenu";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import {toast} from "react-hot-toast";
import {alertToast, errorToast, successToast} from "../../components/Toast/Toast";
import ListItem from "../../components/ListItem/ListItem";
import Product from "../../components/ProductItem/Product";
import {useEffect, useState} from "react";
import axios from "axios";
import {URL_S3} from "../../tools/ImageHelper";

const IMG_PLACEHOLDER = "https://via.assets.so/img.jpg?w=400&h=400&tc=gray&bg=#cecece"
const ICON_USUARIO = "https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1"
const DESC_PLACEHOLDER = "Imagem cinza temporária, para ser substituída no futuro."

const IMG_FEIJAO = "https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png"
const IMG_ARROZ = "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/7c44045d2e8577819cb76b2b404902dd.jpg"
const IMG_CHOCOLATE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqhtp-SiHbXADRUVwsjo0e9gptRb_fBje2SQ&s"

export default function Debug(){
    sessionStorage.setItem("nome_usuario", "Antônio")

    const [produtos, setProdutos] = useState([
        {nome: "Feijão", imagem: IMG_FEIJAO},
        {nome: "Arroz", imagem: IMG_ARROZ},
        {nome: "Chocolate", imagem: IMG_CHOCOLATE},
    ])
    async function ordenar(){
        setProdutos([...produtos].sort((a, b) => a.nome.localeCompare(b.nome)))
        await carregarImagem()
    }
    async function carregarImagem(){
        await axios.get(URL_S3 + "1").then((res) => {
            console.log(res.data)
        })
    }

    const [imagem, setImagem] = useState("https://placehold.co/400/F5FBEF/22333B?text=Teste")

    return (
        <>
            {produtos.map((p)=>{
                    return <Product
                        key={p.nome}
                        name={p.nome}
                        quantity={"25"}
                        addressImg={imagem}
                    />
                })
            }
            <img src={imagem} alt={"teste"}/>

            <Button insideText={"Ordenar"} onClick={()=>ordenar()}/>
        </>
    )
}