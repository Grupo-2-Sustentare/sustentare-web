import styles from "./gerenciarEquipe.module.css"
import TopBar from "../../../components/TopBar/TopBar";
import Button from "../../../components/Button/Button";
import Product, {DEFAULT_BUTTON_CONFIG} from "../../../components/ProductItem/Product";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import React, { useEffect, useState } from 'react';
import {errorToast} from "../../../components/Toast/Toast";
import IconInput from "../../../components/IconInput/IconInput";
import StrechList from "../../../components/StrechList/StrechList";
import {EnumObjetosBusca, OPCOES_ORDENACAO, ordenacaoComPesquisa} from "../../../tools/ModuloBusca";
import LoadingIcon from "../../../components/LoadingIcon/LoadingIcon";
import pegarImagemPorNome from "../../../tools/ImageHelper";

export default function GerenciarEquipe(){
    const navigate = useNavigate()
    const [carregando, setCarregando] = useState(true)

    let style = getComputedStyle(document.body)
    let gunmetal = style.getPropertyValue("--gunmetal")
    let white = style.getPropertyValue("--white")
    let borda = style.getPropertyValue("--borda-branca")
    let sombra = style.getPropertyValue("--sombra-vermelha")

    let btnsConfig = DEFAULT_BUTTON_CONFIG
    btnsConfig.yellow.style = {backgroundColor: gunmetal, color: white, border: borda, boxShadow: sombra}
    btnsConfig.yellow.icon = "clock-rotate-left"
    btnsConfig.yellow.iconFillInvert = true
    btnsConfig.yellow.text = "Visualizar histórico"
    btnsConfig.yellow.action = (infoUsuario)=>navigate("/historico-de-operacoes", { state: { usuario: infoUsuario } })
    btnsConfig.red.action = (infoUsuario) => navigate("/remover-colaborador", { state: { usuario: infoUsuario } });

    const [usuarios, setUsuarios] = useState([]);
    const [usuariosVisiveis, setUsuariosVisiveis] = useState([]);
    const [queryPesquisa, setQueryPesquisa] = useState(null)
    const [ordenacao, setOrdenacao] = useState(null)

     useEffect(() => {
             api.get('/proxy-java-api/usuarios').then((res) => {
                 setUsuarios(res.data);
                 sessionStorage.setItem('usuarios', JSON.stringify(res.data));
             }).catch((error) => {
                 errorToast("Erro ao buscar usuários. Contate o suporte.")
                 console.error("Erro ao buscar usuários:", error);
             }).finally(()=>setCarregando(false))
         }, []
     )

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       const storedData = sessionStorage.getItem('usuarios');
    //       const reloadDone = sessionStorage.getItem('reloadDone');
    //
    //       if (storedData && !reloadDone) {
    //         window.location.reload();
    //         sessionStorage.setItem('reloadDone', 'true');
    //       }
    //     }, 2500);
    //
    //     return () => clearInterval(interval);
    //   }, []);

    useEffect(() => {
        setUsuariosVisiveis(ordenacaoComPesquisa(usuarios, queryPesquisa, ordenacao, EnumObjetosBusca.USUARIO))
    }, [usuarios, queryPesquisa, ordenacao])

    return(
        <div className={styles.gerenciarEquipe}>
            <TopBar title={"Gerenciar equipe"}/>
            <div className={styles.barraDeBusca}>
                <IconInput onChange={(v) => setQueryPesquisa(v.target.value)} placeholder={"Pesquisa por nome"}/>
                <StrechList
                    showTitle={false} items={OPCOES_ORDENACAO.Usuario} hint={"Opções de ordenação"}
                    onChange={(v) => setOrdenacao(v)}
                />
            </div><hr/>
            <div className={styles.equipe}>
                <LoadingIcon carregando={carregando}/>
                {usuariosVisiveis?.map((u, i) => {
                    return <Product
                        name={u.nome} quantity={"Usuário(a)"} fullBorderRadius={true} buttonsConfig={btnsConfig}
                        infoUsuario={u} key={i}
                        addressImg={
                            u.imagem ? `data:image/jpeg;base64,${u.imagem}` : pegarImagemPorNome(u.nome)
                        }
                    />
                })}
            </div>
            <hr/>
            <div className={styles.containerBotao}>
                <Button insideText={"Adicionar colaborador"} onClick={() => navigate("/adicionando-colaborador")}/>
            </div>
        </div>
    )
}