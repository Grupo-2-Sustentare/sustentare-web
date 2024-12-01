import React, { useEffect, useState } from "react";
import IconInput from "../../../../components/IconInput/IconInput.jsx";
import ListItem from "../../../../components/ListItem/ListItem.jsx";
import StrechList from "../../../../components/StrechList/StrechList.jsx";
import TopBar from "../../../../components/TopBar/TopBar.jsx";
import style from "../categoriaProduto/categoriaProduto.module.css";
import api from "../../../../api.js";
import { useNavigate } from "react-router-dom";
import {errorToast} from "../../../../components/Toast/Toast";
import {UNIT_ICONS} from "../../../../tools/TiposUnidadeMedida";
import styles from "../../../historico-operacoes/historicoOperacoes.module.css";
import {EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa} from "../../../../tools/ModuloBusca";

export default function ConfigurationMenu({ }) {
    const navigate = useNavigate();
    const [unidades, setUnidades] = useState([]);
    const [unidadesVisiveis, setUnidadesVisiveis] = useState([])
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)

    useEffect(() => {
        api.get('/proxy-java-api/unidades-medida').then((res) => setUnidades(res.data))
            .catch((error)=>{
                errorToast("Erro ao buscar unidade de medida. Contate o suporte.")
                console.error("Erro ao buscar unidades de medida:", error);
            })
    }, []);

   const selectListItem = (unidadeMedida) => {
      sessionStorage.setItem('selectedUnidadeMedida', JSON.stringify(unidadeMedida));
      navigate(sessionStorage.paginaRequisicao);
   };

    useEffect(() =>
        setUnidadesVisiveis(ordenacaoComPesquisa(unidades, queryPesquisa, ordenacao, EnumObjetosBusca.UNIDADE_DE_MEDIDA)),
        [unidades, queryPesquisa, ordenacao]
    )

   return (
       <>
           <TopBar title="Unidade de Medida do produto" showBackArrow={true} backNavigationPath={sessionStorage.paginaRequisicao}/>
           <div className={styles.barraDeBusca}>
               <IconInput onChange={(v) => setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por usuário"}/>
               <StrechList
                   showTitle={false} items={OPCOES_ORDENACAO["Unidade de medida"]} hint={"Opções de ordenação"}
                   onChange={(v) => setOrdenacao(v)}
               />
           </div><hr/>
           <div className={style.conteudoTela}>
               {unidadesVisiveis?.map(unidade => {
                   return <ListItem
                       heading={unidade.nome} subheading={unidade.categoria} onClick={() => selectListItem(unidade)}
                       icon={UNIT_ICONS[unidade.categoria.toUpperCase()]}
                   />
               })}
           </div>

       </>
   );
}