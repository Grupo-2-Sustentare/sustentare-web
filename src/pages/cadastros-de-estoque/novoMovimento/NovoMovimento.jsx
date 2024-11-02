import styles from "./novoMovimento.module.css"
import Button from "../../../components/Button/Button";
import TopBar from "../../../components/TopBar/TopBar";
import Product, {DEFAULT_BUTTON_CONFIG} from "../../../components/ProductItem/Product";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {errorToast, successToast} from "../../../components/Toast/Toast";

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
        navigate("/tipo-movimento")
    }

    function finalizar(){
        if (movement.products.length === 0){
            errorToast("Não é possível registrar uma movimentação sem produtos selecionados!")
            return
        }
        sessionStorage.setItem("movement", null)
        sessionStorage.setItem("produtosSelecionados", null)
        successToast("Movimentação salva com sucesso!")
        setTimeout(() => navigate("/menu-inicial"),2000)
    }

    return (
        <>
            <TopBar title={"Nova Movimentação"} showBackArrow={false}/>
            <div className={styles.divPrincipal}>
                {/* <div className={styles.containerProdutos}> */}
                    {movement.products.length === 0 && (
                        <p className={styles.avisoVazio}>Nenhum produto adicionado a essa entrada.</p>
                    )}
                    {movement.products.map((p, i) => {
                        let btnConfig = DEFAULT_BUTTON_CONFIG
                        btnConfig.yellow.style = {}
                        btnConfig.yellow.icon = "fa-solid fa-pen"
                        btnConfig.yellow.iconFillInvert = false
                        btnConfig.yellow.text = "Editar"
                        btnConfig.yellow.action = () => editarProduto(movement.products[i])

                        return <Product
                            addressImg={p.urlImagem} 
                            name={p.item.nome} 
                            quantity={`${p.qtdProduto} ${p.item.unidade_medida.nome}`}
                            buttonsConfig={btnConfig}
                        />
                    })}
                {/* </div> */}
            </div>
                <div className={styles.botoes}>
                    <Button
                        insideText={"Adicionar produto"}
                        onClick={() => navigate("/selecao-produtos")}
                    />
                    <Button insideText={"Concluir entrada"} onClick={finalizar}/>
                </div>
        </>
    )
}