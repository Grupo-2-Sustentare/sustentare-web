import styles from "./novoMovimento.module.css"
import Button from "../../../components/Button/Button";
import TopBar from "../../../components/TopBar/TopBar";
import Product from "../../../components/ProductItem/Product";

const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/items/"

export default function NovoMovimento({}){
    let movement = sessionStorage.getItem("movement")
    if (movement == null){
        sessionStorage.setItem("movement", JSON.stringify({"products": []}))
        movement = [{"products": []}]
    } else {
        movement = JSON.parse(movement)
    }

    // Mock, para testes
    movement = {"products": [
            {id: 0, "urlImagem": MOCK_URL + "sobrecoxa.jpg", "nome": "Sobrecoxa", "quantidade": "12 kilogramas"},
            {id: 1, "urlImagem": MOCK_URL + "coca300.jpeg", "nome": "Coca 300", "quantidade": "32 unidades"},
            {id: 2, "urlImagem": undefined, "nome": "Guaraná Jesus", "quantidade": "75 unidades"},
            {id: 3, "urlImagem": MOCK_URL + "feijão.png", "nome": "Feijão", "quantidade": "4 sacos"},
    ]}

    return (
        <div className={styles.novoMovimento}>
            <TopBar title={"Nova Movimentação"} showBackArrow={false}/>
            <div className={styles.containerProdutos}>
                {movement.products.length === 0 && (
                    <p className={styles.avisoVazio}>Nenhum produto adicionado a essa entrada.</p>
                )}
                {movement.products.map((p) => {
                    return <Product key={p.id} addressImg={p.urlImagem} name={p.nome} quantity={p.quantidade}/>
                })}
            </div>
            <div className={styles.botoes}>
                <Button insideText={"Adicionar produto"}/>
                <Button insideText={"Concluir movimento"}/>
            </div>
        </div>
    )
}