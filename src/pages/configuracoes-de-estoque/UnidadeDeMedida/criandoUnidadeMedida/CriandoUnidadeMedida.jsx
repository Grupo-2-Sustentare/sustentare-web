import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import React, { useState, useEffect } from "react"; // Importa React e o hook useState para gerenciamento de estado
import StreachList from "../../../../components/StrechList/StrechList";
import TextInput from "../../../../components/TextInput/TextInput";
import styles from "./CriandoUnidadeMedida.module.css";
import MeasurementUnitInput from "../../../../components/MeasumentTextInput/MeasurementUnitInput";
import TopBar from "../../../../components/TopBar/TopBar";
import Button from "../../../../components/Button/Button";
import api from "../../../../api"; // Importa a instância da API
import { errorToast, successToast } from "../../../../components/Toast/Toast";

const CriandoUnidadeMedida = () => {
    const navigate = useNavigate();
    const [nomeUnidade, setNomeUnidade] = useState(""); // Estado para o nome da unidade
    const [simboloUnidade, setSimboloUnidade] = useState(""); // Estado para o símbolo da unidade
    const [categoriaUnidade, setCategoriaUnidade] = useState(""); // Estado para a categoria de unidade (Massa, Volume, etc.)
    const [valorEquivalente, setValorEquivalente] = useState(""); // Estado para o valor equivalente (ex.: Kilograma)
    const [conversaoPadrao, setConversaoPadrao] = useState("");
    const [unidadesExistentes, setUnidadesExistentes] = useState([]); // Estado para unidades já existentes
    const [ola, setOla] = useState(false); // Estado para controle de exibição do cálculo base

    const responsavelString = sessionStorage.getItem("responsavel");
    const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
    const idResponsavel = responsavel ? responsavel.id : null; // pegar da sessionStorage futuramente

    // Função para buscar unidades existentes
    async function buscarUnidades() {
        try {
            const response = await api.get(`/proxy-java-api/unidades-medida`); // Faz a requisição GET para listar as unidades
            setUnidadesExistentes(response.data); // Atualiza o estado com as unidades obtidas
        } catch (error) {
            console.error("Erro ao buscar unidades de medida:", error);
            errorToast("Ocorreu um erro ao buscar as unidades de medida.");
        }
    }

    useEffect(() => {
        // Chama a função de buscar unidades quando o componente é montado
        buscarUnidades();
    }, []);

    // const handleConversaoChange = (e) => {
    //     const value = e.target.value; // Extrai o valor do input
    //     setConversaoPadrao(value); // Atualiza diretamente
    //   };

      const handleConversaoChange = (e) => {
        let value = e.target.value; // Extrai o valor do input
    
        // Substitui vírgulas por pontos para garantir o formato numérico esperado
        value = value.replace(",", ".");
        
        // Verifica se o valor resultante é numérico antes de atualizar o estado
        if (!isNaN(value)) {
            setConversaoPadrao(value); // Atualiza diretamente
        } else {
            errorToast("Insira um valor numérico válido.");
        }
    };
    // Função para salvar a nova unidade de medida
    async function criarUnidadeMedida() {
        const nomeUnidadeTrimmed = nomeUnidade.trim();
        const simboloUnidadeTrimmed = simboloUnidade.trim();

        if (!nomeUnidadeTrimmed || !simboloUnidadeTrimmed || !categoriaUnidade) {
            errorToast("Preencha todos os campos.");
            return;
        }

        // Verifica se já existe uma unidade de medida com o mesmo nome ou símbolo
        const unidadeDuplicada = unidadesExistentes.some(
            (unidade) =>
                unidade.nome.toLowerCase() === nomeUnidadeTrimmed.toLowerCase() ||
                unidade.simbolo.toLowerCase() === simboloUnidadeTrimmed.toLowerCase()
        );

        if (unidadeDuplicada) {
            errorToast("Já existe uma unidade de medida com esse nome ou símbolo.");
            return;
        }

        try {
            // Fazendo a requisição POST para criar a unidade de medida
            const response = await api.post(`/proxy-java-api/unidades-medida?idResponsavel=${idResponsavel}`, {
                nome: nomeUnidadeTrimmed,
                simbolo: simboloUnidadeTrimmed,
                categoria: categoriaUnidade,
                conversao_padrao: conversaoPadrao,
                ativo: true
            });

            if (response.status === 200) {
                successToast("Unidade de medida criada com sucesso");
                setTimeout(() => {
                    navigate("/configuracoes-de-unidade-medida");
                }, 1000); // Tempo para o redirecionamento
            }
        } catch (error) {
            console.error("Erro ao criar a unidade de medida:", error);
            errorToast("Ocorreu um erro ao tentar criar a unidade de medida.");
        }
    }

    const handleStreachListChange = (value) => {
        setCategoriaUnidade(value);
        if (value === "Massa") {
            setValorEquivalente("Kilograma(s)");
        } else if (value === "Volume") {
            setValorEquivalente("Litro(s)");
        } else {
            setValorEquivalente("unidade(s)");
        }

        if (value) {
            setOla(true); // Mostra o campo de cálculo de base
        } else {
            setOla(false);
        }
    };

    return (
        <div>
            <TopBar
                title={"Criando Unidade de Medida"}
                showBackArrow={true}
                backNavigationPath={"/configuracoes-de-unidade-medida"}
            />
            <div className={styles.divPrincipal}>
                <TextInput
                    label="Nome:"
                    value={nomeUnidade}
                    onChange={(e) => setNomeUnidade(e.target.value)} // Atualiza o estado ao digitar
                />
                <TextInput
                    label="Símbolo:"
                    value={simboloUnidade}
                    onChange={(e) => setSimboloUnidade(e.target.value)} // Atualiza o estado ao digitar
                />
                <StreachList
                    title="Categoria:"
                    items={["Massa", "Volume", "Genérica"]}
                    onChange={handleStreachListChange} // Atualiza o estado ao selecionar
                />
                <div className={styles.divMeasumentTextInput}>
                    {ola ? (
                        <div className={styles.divUnidadeMedida}>
                            <MeasurementUnitInput
                                placeholder={"0"}
                                label={`Um(a) ${categoriaUnidade} equivale a`}
                                measurementUnit={valorEquivalente}
                                onChange={handleConversaoChange}
                            />
                        </div>
                    ) : (
                        <div className={styles.divText}>
                            <p>Selecione uma categoria de unidade de medida para realizar o cálculo de base</p>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.divBotao}>
                <Button insideText={"Salvar nova unidade de medida"} onClick={criarUnidadeMedida} />
            </div>
        </div>
    );
};

export default CriandoUnidadeMedida;
