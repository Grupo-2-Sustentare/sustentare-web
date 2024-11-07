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
    const responsavelString = sessionStorage.getItem("responsavel");
    const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
    const idResponsavel = responsavel ? responsavel.id : null;


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
        setQuantidade(novaQuantidade);
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

    // Enviando interação de estoque para o banco
    async function salvarEdicao() {

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

        const categoriaInteracao = ehSaida ? categoriaConsumo : (isUltimaHora ? "Compra de última hora" : "Entrada");
        // console.log(quantidade)

        const payload = {
            interacaoEstoqueCriacaoDTO: {
                categoriaInteracao: categoriaInteracao,
                dataHora: new Date().toISOString().replace('T', ' ').substring(0, 19)  // Formato "YYYY-MM-DD HH:MM:SS"
            },
            produtoCriacaoDTO: {
                preco: !ehSaida ? parseFloat(preco.replace(',', '.')) : 0,
                qtdProduto: parseFloat(quantidade.replace(',', '.')) || 0,
                qtdMedida: 0,
                ativo: true
            }
        };

        try {
            const response = await api.post(`http://localhost:8080/interacoes-estoque?fkItem=${p.item.id}&idResponsavel=${idResponsavel}`, payload);
            if (response.status === 200) {
                successToast("Movimento salvo com sucesso");

                // Recupera o produto editado do sessionStorage
                let produtoBeingEdited = JSON.parse(sessionStorage.getItem("productBeingEdited"));

                // Atualiza o valor de quantidadeMovimento com a resposta da API
                // produtoBeingEdited.quantidadeMovimento = response.data.produto.qtdProduto;
                produtoBeingEdited.quantidadeMovimento =
                    ehSaida
                        ? `-${response.data.produto.qtdProduto}`  // Saída: valor negativo
                        : `+${response.data.produto.qtdProduto}`;  // Entrada/Compra de última hora: valor positivo

                // Salva novamente o produto atualizado no sessionStorage
                sessionStorage.setItem("productBeingEdited", JSON.stringify(produtoBeingEdited));

                // Atualiza o produto no array 'produtosSelecionados' também
                let produtosSelecionados = JSON.parse(sessionStorage.getItem("movement")).products || [];

                produtosSelecionados = produtosSelecionados.map(produto =>
                    produto.id === produtoBeingEdited.id
                        ? { ...produto, quantidadeMovimento: produtoBeingEdited.quantidadeMovimento }
                        : produto
                );

                sessionStorage.setItem("movement", JSON.stringify({ products: produtosSelecionados }));
                sessionStorage.removeItem("quantidade");
                navigate("/cadastros-de-estoque");

            } else {
                console.error("Erro ao salvar movimento:", response);
            }
        } catch (error) {
            console.error("Erro ao realizar requisição:", error);
        }
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
                    <MeasurementUnitInput label={"Quantidade saída: "} measurementUnit={p.item.unidade_medida.nome} placeholder={"0,0"} type={Number} value={quantidade} onChange={handleQuantidadeChange} />
                </>
                )
            }
            {!ehSaida &&
                (<>
                    <MeasurementUnitInput label={"Quantidade entrada: "} measurementUnit={p.unidade} placeholder={"0,0"} value={quantidade} onChange={handleQuantidadeChange} />
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