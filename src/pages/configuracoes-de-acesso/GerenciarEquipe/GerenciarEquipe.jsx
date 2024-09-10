import styles from "./gerenciarEquipe.module.css"
import IconInput from "../../../components/IconInput/IconInput";
import StrechList from "../../../components/StrechList/StrechList";
import TopBar from "../../../components/TopBar/TopBar";
import Button from "../../../components/Button/Button";
import Product, {DEFAULT_BUTTON_CONFIG} from "../../../components/ProductItem/Product";
import {useNavigate} from "react-router-dom";

const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/usuarios/"
const OPCOES_ORDENACAO = ["Alfabética - Crescente", "Alfabética - Decrescente"]
const MOCK_USUARIOS = [
    {"urlImagem": MOCK_URL + "1.png", "nome": "Antônio"},
    {"urlImagem": MOCK_URL + "2.jpeg", "nome": "Ingrid"},
    {"urlImagem": MOCK_URL + "3.jpeg", "nome": "Sílvio"}
]

export default function GerenciarEquipe(){
    let navigate = useNavigate()
    let usuarios = MOCK_USUARIOS
    let btnsConfig = DEFAULT_BUTTON_CONFIG

    let style = getComputedStyle(document.body)
    let gunmetal = style.getPropertyValue("--gunmetal")
    let white = style.getPropertyValue("--white")
    let borda = style.getPropertyValue("--borda-branca")
    let sombra = style.getPropertyValue("--sombra-vermelha")

    btnsConfig.yellow.style = {backgroundColor: gunmetal, color: white, border: borda, boxShadow: sombra}
    btnsConfig.yellow.icon = "clock-rotate-left"
    btnsConfig.yellow.iconFillInvert = true
    btnsConfig.yellow.text = "Visualizar histórico"

    btnsConfig.red.action = () => navigate("/remover-colaborador")

    return(<div className={styles.gerenciarEquipe}>
        <TopBar title={"Gerenciar equipe"}/>
        <div className={styles.barraDeBusca}>
            <IconInput placeholder={"Pesquisa por nome"}/>
            <StrechList
                showTitle={false} items={OPCOES_ORDENACAO} hint={"Opções de ordenação"}
            />
        </div>
        <div className={styles.equipe}>
            {usuarios.map(u => {
                    return <Product
                    name={u.nome} quantity={"Usuário(a)"} addressImg={u.urlImagem}
                    fullBorderRadius={true}
                />
            })}
        </div>
        <div className={styles.containerBotao}>
            <Button insideText={"Adicionar colaborador"}/>
        </div>
    </div>)
}