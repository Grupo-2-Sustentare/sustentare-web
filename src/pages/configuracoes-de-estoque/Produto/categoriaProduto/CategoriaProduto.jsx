import IconInput from "../../../../components/IconInput/IconInput.jsx";
import ListItem from "../../../../components/ListItem/ListItem.jsx";
import StrechList from "../../../../components/StrechList/StrechList.jsx";
import TopBar from "../../../../components/TopBar/TopBar.jsx";
import style from "../categoriaProduto/categoriaProduto.module.css";
import api from "../../../../api.js";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {errorToast} from "../../../../components/Toast/Toast";
import styles from "../../../historico-operacoes/historicoOperacoes.module.css";
import {EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa} from "../../../../tools/ModuloBusca";

export default function CategoriaProduto({ }) {
    const navigate = useNavigate();
    
    const [categorias, setCategorias] = useState([])
    const [categoriasVisiveis, setCategoriasVisiveis] = useState([])
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)
    
   useEffect(() => {
      api.get("/categorias").then((res) => setCategorias(res.data))
         .catch((err) => {
             errorToast("Erro ao buscar categorias. Contare o suporte.")
            console.error("Erro ao buscar categorias:", err);
         });
   }, []);

   const selectListItem = (categoria) => {
      sessionStorage.setItem('selectedCategoria', JSON.stringify(categoria));
      navigate(sessionStorage.paginaRequisicao);
   };

    useEffect(() => {
        setCategoriasVisiveis(ordenacaoComPesquisa(categorias, queryPesquisa, ordenacao, EnumObjetosBusca.CATEGORIA))
    }, [categorias, queryPesquisa, ordenacao])

   return (
       <>
           <TopBar title="Categoria do produto" showBackArrow={true} backNavigationPath={sessionStorage.paginaRequisicao}/>
           <div className={styles.barraDeBusca}>
               <IconInput onChange={(v) => setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por usuário"}/>
               <StrechList
                   showTitle={false} items={OPCOES_ORDENACAO.Categoria} hint={"Opções de ordenação"}
                   onChange={(v) => setOrdenacao(v)}
               />
           </div><hr/>
           <div className={style.conteudoTela}>
               {categoriasVisiveis?.map(categoria => {
                   return <ListItem
                       key={categoria.id} heading={categoria.nome} onClick={() => selectListItem(categoria)}
                   />
               })}
           </div>

       </>
   );
}