import styles from "./novoMovimento.module.css"
import Button from "../../../components/Button/Button";
import TopBar from "../../../components/TopBar/TopBar";
import Product, {DEFAULT_BUTTON_CONFIG} from "../../../components/ProductItem/Product";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"

export default function NovoMovimento({}){
    const navigate = useNavigate()

    let jsonMovs = JSON.parse(sessionStorage.getItem("movement"))
    if (jsonMovs === null){
        jsonMovs = {"products": []}
        sessionStorage.setItem("movement", JSON.stringify(jsonMovs))
    }

    let [movement, setMovement] = useState(jsonMovs)

    // Mock, para testes
    // movement = {"products": [
    //         {"urlImagem": MOCK_URL + "sobrecoxa.jpg", "nome": "Sobrecoxa", "quantidade": 12, "unidade": "kilogramas"},
    //         {"urlImagem": MOCK_URL + "coca300.jpeg", "nome": "Coca 300", "quantidade": 32, "unidade": "unidades"},
    //         {"urlImagem": undefined, "nome": "Guaraná Jesus", "quantidade": 75, "unidade": "unidades"},
    //         {"urlImagem": MOCK_URL + "feijão.png", "nome": "Feijão", "quantidade": 4, "unidade": "sacos"}
    // ]}

    function editarProduto(p){
        sessionStorage.setItem("productBeingEdited", JSON.stringify(p))
        navigate("produto/tipo-movimento")
    }

    return (
        <div className={styles.novoMovimento}>
            <TopBar title={"Nova Movimentação"} showBackArrow={false}/>
            <div className={styles.containerProdutos}>
                {movement.products.length === 0 && (
                    <p className={styles.avisoVazio}>Nenhum produto adicionado a essa entrada.</p>
                )}
                {movement.products.map((p, i) => {
                    let btnConfig = DEFAULT_BUTTON_CONFIG
                    btnConfig.yellow.action = () => editarProduto(movement.products[i])

                    return <Product
                        key={p.id} addressImg={p.urlImagem} name={p.nome} quantity={`${p.quantidade} ${p.unidade}`}
                        buttonsConfig={btnConfig}
                    />
                })}
            </div>
            <div className={styles.botoes}>
                <Button
                    insideText={"Adicionar produto"}
                    onClick={() => navigate("/cadastros-de-estoque/selecao-produtos")}
                />
                <Button insideText={"Concluir movimento"}/>
            </div>
        </div>
    )
}