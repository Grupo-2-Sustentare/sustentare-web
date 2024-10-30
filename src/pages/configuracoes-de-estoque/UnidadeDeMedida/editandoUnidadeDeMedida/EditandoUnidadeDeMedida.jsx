import TopBar from "../../../../components/TopBar/TopBar.jsx";
import TextInput from "../../../../components/TextInput/TextInput.jsx";
import StrechList from "../../../../components/StrechList/StrechList.jsx";
import MeasurementUnitInput from "../../../../components/MeasumentTextInput/MeasurementUnitInput.jsx";
import Button from "../../../../components/Button/Button.jsx";
import style from "../editandoUnidadeDeMedida/editandoUnidadeDeMedida.module.css";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../../components/Toast/Toast.jsx";
import { useEffect, useState } from "react";
import api from "../../../../api.js";

export default function ConfigurationMenu({}) {
  const navigate = useNavigate();
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);
  const [nome, setNome] = useState("");
  const [simbolo, setSimbolo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [conversaoPadrao, setConversaoPadrao] = useState("");
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);

  const handleNomeChange = (e) => {
    setNome(e.target.value); // Atualiza o valor diretamente
  };

  const handleSimboloChange = (e) => {
    setSimbolo(e.target.value); // Atualiza o valor diretamente
  };

  const handleCategoriaChange = (value) => {
    setCategoria(value); // Atualiza diretamente
  };

  const handleConversaoChange = (e) => {
   const value = e.target.value; // Extrai o valor do input
   setConversaoPadrao(value); // Atualiza diretamente
 };

 useEffect(() => {
   // Função para buscar as unidades de medida
   const fetchUnidadesMedida = async () => {
     try {
       const response = await api.get("/unidades-medida"); // Ajuste a rota da API conforme necessário
       const unidades = response.data;

       // Extrair categorias únicas
       const categorias = unidades.map(unidade => unidade.categoria);
       const categoriasFiltradas = Array.from(new Set(categorias)); // Remover duplicatas

       setCategoriasUnicas(categoriasFiltradas); // Atualiza o estado com categorias únicas
     } catch (error) {
       console.error("Erro ao buscar unidades de medida:", error);
       errorToast("Ocorreu um erro ao buscar unidades de medida.");
     }
   };

   fetchUnidadesMedida(); // Chama a função para buscar as unidades de medida
 }, []); // O array vazio garante que a requisição seja feita apenas uma vez

  useEffect(() => {
   const unidade = JSON.parse(sessionStorage.getItem("unidade_selecionada"));
   if (unidade) {
     setUnidadeSelecionada({
       id: unidade.id,
       nome: unidade.nome,
       simbolo: unidade.simbolo,
       categoria: unidade.categoria,
       conversao_padrao: unidade.conversao_padrao,
     });
     setNome(unidade.nome);
     setSimbolo(unidade.simbolo);
     setCategoria(unidade.categoria);
     setConversaoPadrao(unidade.conversao_padrao);
   }
 }, []);
 
 
 async function salvarEdicao() {
   if (!nome.trim() || !simbolo.trim()) {
     errorToast("O nome e o símbolo não podem estar vazios.");
     return;
   }
 
   // Verificando o valor de conversaoPadrao
   console.log("Valor de conversaoPadrao:", conversaoPadrao);
   console.log("Tipo de conversao_padrao:", typeof conversaoPadrao, conversaoPadrao);
 
   const responsavelString = sessionStorage.getItem("responsavel");
   const responsavel = responsavelString ? JSON.parse(responsavelString) : null;
   const idResponsavel = responsavel ? responsavel.id : null;
   
   const convertedConversaoPadrao = parseFloat(conversaoPadrao);
 
   if (isNaN(convertedConversaoPadrao)) {
     errorToast("A conversão padrão deve ser um número válido.");
     return; // Impede a execução se conversao_padrao não for válido
   }
 
   const unidadeAtualizada = {
     nome,
     simbolo,
     categoria,
     conversao_padrao: convertedConversaoPadrao,
     ativo: true,
   };
 
   try {
     console.log("Enviando dados:", unidadeAtualizada);
 
     const response = await api.put(
       `/unidades-medida/${unidadeSelecionada.id}?idResponsavel=${idResponsavel}`,
       unidadeAtualizada
     );
 
     successToast("Unidade de medida editada com sucesso!");
 
     setTimeout(() => {
       navigate("/configuracoes-de-unidade-medida");
     }, 1000);
   } catch (error) {
     console.error("Erro ao editar a unidade:", error);
     errorToast("Ocorreu um erro ao editar a unidade de medida.");
   }
 }
 
 

  var nomeDaUnidade = "";
  var simboloDaUnidade = "";

  if (unidadeSelecionada == null) {
    nomeDaUnidade = "Insira um nome";
    simboloDaUnidade = "Insira o símbolo";
  } else {
    nomeDaUnidade = unidadeSelecionada.nome;
    simboloDaUnidade = unidadeSelecionada.simbolo;
  }

  return (
    <>
      <div className={style.topBar}>
        <TopBar title="Editando unidade de medida" showBackArrow={true} backNavigationPath={"/configuracoes-de-unidade-medida"} />
      </div>

      <div className={style.conteudoInicioTela}>
        <TextInput label="Nome: " value={nome} onChange={handleNomeChange} placeholder={nomeDaUnidade || "Insira um nome"} />
        <TextInput label="Símbolo: " value={simbolo} onChange={handleSimboloChange} placeholder={simboloDaUnidade || "Insira o símbolo"} />
        {/* <StrechList title="Tipo" items={["Massa", "Volume", "Quantidade genérica"]} titulo="" value={categoria} onChange={handleCategoriaChange} /> */}
        <StrechList title="Tipo" items={categoriasUnicas} value={categoria} onChange={handleCategoriaChange} />
        
        <div className={style.divUnidadeMedida}>
          <MeasurementUnitInput placeholder={conversaoPadrao} label={"Um(a) " + nome + " equivale a"} measurementUnit={simbolo} onChange={handleConversaoChange} />
        </div>
      </div>

      <hr />

      <div className={style.conteudoFinalTela}>
        <Button insideText={"Salvar edição"} onClick={salvarEdicao} />
      </div>
    </>
  );
}
