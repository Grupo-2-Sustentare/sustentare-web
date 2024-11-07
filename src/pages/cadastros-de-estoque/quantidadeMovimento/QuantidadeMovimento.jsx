import styles from "./quantidadeMovimento.module.css"
import TopBar from "../../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import Product from "../../../components/ProductItem/Product";
import Switch from "../../../components/Switch/Switch";
import Button from "../../../components/Button/Button";
import RedirectionList from "../../../components/RedirectionList/RedirectionList";
import TextInput from "../../../components/TextInput/TextInput";
import api from "../../../api";
import MeasurementUnitInput from "../../../components/MeasumentTextInput/MeasurementUnitInput";
import ListItem from "../../../components/ListItem/ListItem";
import { useEffect, useState } from "react";
import { errorToast, successToast } from "../../../components/Toast/Toast";

export function QuantidadeMovimento() {
    const navigate = useNavigate()
    let p = JSON.parse(sessionStorage.getItem("productBeingEdited"))

    let ehSaida = p.saida < 0
    let acao = ehSaida ? "saiu do" : "entrou no"

    // Recupera a quantidade de saída armazenada (se existir)

    const [quantidade, setQuantidade] = useState(sessionStorage.getItem("quantidade") || "0");
    const [preco, setPreco] = useState("0");
    const [categoriaConsumo, setCategoriaConsumo] = useState(p.categoriaConsumo || "Selecione...");
    const [isUltimaHora, setIsUltimaHora] = useState(false);

    useEffect(() => {
        // Quando o componente for montado, carregar os valores armazenados no sessionStorage
        const storedQuantidade = sessionStorage.getItem("quantidade");
        const storedPreco = sessionStorage.getItem("preco");
        const storedUltimaHora = sessionStorage.getItem("isUltimaHora");

        if (storedQuantidade) {
            setQuantidade(storedQuantidade);  // Atualiza o estado com o valor do sessionStorage
        }
        if (storedPreco) {
            setPreco(storedPreco);  // Atualiza o estado com o valor do sessionStorage
        }
        if (storedUltimaHora) {
            setIsUltimaHora(storedUltimaHora === "true");  // Atualiza o estado com o valor do sessionStorage
        }
    }, []);

    useEffect(() => {
        // Atualiza o sessionStorage sempre que os valores mudarem
        sessionStorage.setItem("quantidade", quantidade);
        sessionStorage.setItem("preco", preco);
        sessionStorage.setItem("isUltimaHora", isUltimaHora.toString());
    }, [quantidade, preco, isUltimaHora]);

    const handleQuantidadeChange = (e) => {
        const novaQuantidade = e.target.value;
        // Verifique se o valor é um número inteiro positivo ou negativo (completo)
        if (/^\d*$/.test(novaQuantidade)) {
            setQuantidade(novaQuantidade);
        } else {
            errorToast("Por favor, insira uma quantidade inteira.");
        }
    };

    const handlePrecoChange = (e) => {
        const novoPreco = e.target.value;
        setPreco(novoPreco);
    };

    const handleUltimaHoraChange = (newState) => {
        // Atualiza o estado e persiste no sessionStorage
        setIsUltimaHora(newState);
        sessionStorage.setItem("isUltimaHora", newState.toString());
    };

    async function salvarEdicao() {
        // Validação adicional para quantidade como um número inteiro
        if (!Number.isInteger(Number(quantidade))) {
            errorToast("A quantidade deve ser um número inteiro.");
            return;
        }

        // Validações de entrada
        if (!ehSaida) {
            if (!quantidade || parseFloat(quantidade) <= 0) {
                errorToast("Por favor, insira uma quantidade válida para a entrada.");
                return;
            }

            if (!isUltimaHora && (!preco || parseFloat(preco) <= 0)) {
                errorToast("Por favor, insira um preço válido para a entrada.");
                return;
            }
        }

        // Validações de saída
        if (ehSaida) {
            if (!categoriaConsumo || categoriaConsumo === "Selecione...") {
                errorToast("Por favor, selecione uma categoria de consumo.");
                return;
            }

            if (!quantidade || parseFloat(quantidade) <= 0) {
                errorToast("Por favor, insira uma quantidade válida para a saída.");
                return;
            }
        }

        // Atualizar productBeingEdited com os valores de quantidade, preço e categoria
        let produtoBeingEdited = JSON.parse(sessionStorage.getItem("productBeingEdited"));

        produtoBeingEdited = {
            ...produtoBeingEdited,
            preco: !ehSaida ? parseFloat(preco.replace(',', '.')) : 0,
            qtdProduto: Math.round(quantidade),
            quantidadeMovimento: ehSaida ? `-${quantidade}` : `+${quantidade}`,
            categoriaInteracao: ehSaida ? categoriaConsumo : (isUltimaHora ? "Compra de última hora" : "Entrada")
        };

        // Salva o produto atualizado no sessionStorage
        sessionStorage.setItem("productBeingEdited", JSON.stringify(produtoBeingEdited));

        // Atualiza o produto também no array `products` de `movement`
        let movement = JSON.parse(sessionStorage.getItem("movement")) || { products: [] };
        let produtosSelecionados = movement.products || [];

        let produtosSelecionadosAtualizados = [];

        produtosSelecionados.forEach(produto => {
            if (produto.id === produtoBeingEdited.id) {
                // Atualiza o produto com os valores do produtoBeingEdited
                produtosSelecionadosAtualizados.push({ ...produto, ...produtoBeingEdited });
            } else {
                // Mantém o produto inalterado
                produtosSelecionadosAtualizados.push(produto);
            }
        });

        // Atualiza produtosSelecionados com a nova lista de produtos
        produtosSelecionados = produtosSelecionadosAtualizados;

        sessionStorage.setItem("movement", JSON.stringify({ products: produtosSelecionados }));

        // Limpar os valores temporários do sessionStorage
        sessionStorage.removeItem("quantidade");
        sessionStorage.removeItem("preco");
        sessionStorage.removeItem("isUltimaHora")

        successToast("Edição salva. Movimentação pronta para confirmação.");
        navigate("/cadastros-de-estoque");
    }


    return (<div>
        <TopBar showBackArrow={true} title={"Quantidade de movimento"} backNavigationPath={"/tipo-movimento"} />
        <div className={styles.cabecalho}>
            <p>Você selecionou</p>
            {/* <Product name={p.nome} addressImg={p.urlImagem} quantity={  `${p.quantidade} ${p.unidade}`}/> */}
            <ListItem adressImg={"https://placehold.co/400/F5FBEF/22333B?text=Produto"} heading={p.item.nome} subheading={`${p.quantidadeMovimento} ${p.item.unidade_medida.nome}`} fullBorderRadius={true} />
        </div>
        <div className={styles.principal}>
            <div className={styles.inicioPrincipal}>
                <p>Quanto do produto {acao} estoque?</p>
            </div>
            {ehSaida &&
                (<>
                    <RedirectionList title={"Categoria do consumo"} hint={categoriaConsumo} redirectUrl={"/categoria-consumo"} onChange={setCategoriaConsumo} />
                    <MeasurementUnitInput label={"Quantidade saída: "} measurementUnit={p.item.unidade_medida.nome} placeholder={"0"} type={Number} value={quantidade} onChange={handleQuantidadeChange} />
                </>
                )
            }
            {!ehSaida &&
                (<>
                    <MeasurementUnitInput label={"Quantidade entrada: "} measurementUnit={p.unidade} placeholder={"0"} value={quantidade} onChange={handleQuantidadeChange} />
                    <MeasurementUnitInput label={"Preço (unitário): "} measurementUnit={"R$"} placeholder={"0,0"} value={preco} onChange={handlePrecoChange} />
                    <Switch
                        initialState={false}
                        action={handleUltimaHoraChange}
                        label="Compra de última hora?"
                        storageKey="isUltimaHora"
                    />

                    {/* <Switch label={"É ajuste de uma marcação anterior errada?"}/> */}
                </>)
            }
        </div>
        <div className={styles.containerBotao}>
            <Button insideText={"Confirmar definições"} onClick={salvarEdicao} />
        </div>

    </div>)
}