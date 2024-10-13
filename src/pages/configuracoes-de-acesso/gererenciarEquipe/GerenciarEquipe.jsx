import styles from "./gerenciarEquipe.module.css"
import IconInput from "../../../components/IconInput/IconInput";
import StrechList from "../../../components/StrechList/StrechList";
import TopBar from "../../../components/TopBar/TopBar";
import Button from "../../../components/Button/Button";
import Product, {DEFAULT_BUTTON_CONFIG} from "../../../components/ProductItem/Product";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import React, { useEffect, useState } from 'react';


const MOCK_URL = "https://raw.githubusercontent.com/Grupo-2-Sustentare/sustentare-web/main/src/assets/images/usuarios/"
const OPCOES_ORDENACAO = ["Alfabética - Crescente", "Alfabética - Decrescente"]
// const MOCK_USUARIOS = [
//     {"urlImagem": MOCK_URL + "1.png", "nome": "Antônio"},
//     {"urlImagem": MOCK_URL + "2.jpeg", "nome": "Ingrid"},
//     {"urlImagem": MOCK_URL + "3.jpeg", "nome": "Sílvio"}
// ]

export default function GerenciarEquipe(){
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState(() => {
        const storedUsuarios = sessionStorage.getItem('usuarios');
        return storedUsuarios ? JSON.parse(storedUsuarios) : [];
      });      
    let btnsConfig = DEFAULT_BUTTON_CONFIG
    console.log(usuarios)
    let style = getComputedStyle(document.body)
    let gunmetal = style.getPropertyValue("--gunmetal")
    let white = style.getPropertyValue("--white")
    let borda = style.getPropertyValue("--borda-branca")
    let sombra = style.getPropertyValue("--sombra-vermelha")

    btnsConfig.yellow.style = {backgroundColor: gunmetal, color: white, border: borda, boxShadow: sombra}
    btnsConfig.yellow.icon = "clock-rotate-left"
    btnsConfig.yellow.iconFillInvert = true
    btnsConfig.yellow.text = "Visualizar histórico"
    btnsConfig.yellow.action = ()=>navigate("/historico-de-operacoes")

    btnsConfig.red.action = (infoUsuario) => navigate("/remover-colaborador", { state: { usuario: infoUsuario } });


    // useEffect(() => {
    //     const fetchUsuarios = async () => {
    //         try {
    //             const response = await api.get('/usuarios');
    //             setUsuarios(response.data);
    //             console.log(response.data);
    //             sessionStorage.setItem('usuarios', JSON.stringify(response.data));
    //         } catch (error) {
    //             console.error("Erro ao buscar usuários:", error);
    //         }
    //     };

    //     fetchUsuarios(); // Chama a função para buscar usuários
    // }, []); 

    return(
        <div className={styles.gerenciarEquipe}>
            <TopBar title={"Gerenciar equipe"}/>
            <div className={styles.barraDeBusca}>
                <IconInput placeholder={"Pesquisa por nome"}/>
                <StrechList
                    showTitle={false} items={OPCOES_ORDENACAO} hint={"Opções de ordenação"}
                />
            </div>
            <div className={styles.equipe}>
                {usuarios.map(u => {
                        return <Product
                        name={u.nome} quantity={"Usuário(a)"} addressImg={`data:image/jpeg;base64,${u.imagem}`}
                        fullBorderRadius={true} buttonsConfig={btnsConfig} infoUsuario={u}
                    />
                })}
            </div>
            <div className={styles.containerBotao}>
                <Button insideText={"Adicionar colaborador"} onClick={()=>navigate("/adicionando-colaborador")}/>
            </div>
        </div>
    )
}