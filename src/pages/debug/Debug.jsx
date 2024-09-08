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
import {toast} from "react-hot-toast";
import {alertToast, errorToast, successToast} from "../../components/Toast/Toast";
import ListItem from "../../components/ListItem/ListItem";
import Product from "../../components/ProductItem/Product";

const IMG_PLACEHOLDER = "https://via.assets.so/img.jpg?w=400&h=400&tc=gray&bg=#cecece"
const IMG_FEIJAO = "https://saude.mpu.mp.br/nutricao/receitas/imagens/Feijaonutritivo.png"
const ICON_USUARIO = "https://i0.wp.com/ochin.com.br/wp-content/uploads/2023/04/1.jpg?fit=1024%2C974&ssl=1"
const DESC_PLACEHOLDER = "Imagem cinza temporária, para ser substituída no futuro."

export default function Debug(){
    sessionStorage.setItem("nome_usuario", "Antônio")
    sessionStorage.setItem("icone_usuario", ICON_USUARIO)

    return (
        <>
            <Button insideText={"Nãoooo"}/>
            <Product
                name={"Feijão carioquinha"}
                quantity={"25 kilogramas"}
                addressImg={IMG_FEIJAO}
            />
            <Product
                name={"Feijão carioquinha"}
                quantity={"25 kilogramas"}
                addressImg={IMG_FEIJAO}
                checkboxVariant={true}
            />
            <Product
                name={"Feijão carioquinha"}
                quantity={"25 kilogramas"}
                addressImg={IMG_FEIJAO}
                checkboxVariant={true}
                checkedByDefault={true}
            />
        </>
    )
}