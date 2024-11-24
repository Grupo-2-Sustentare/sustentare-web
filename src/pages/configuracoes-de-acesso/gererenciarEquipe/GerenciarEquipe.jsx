import styles from "./gerenciarEquipe.module.css"
import TopBar from "../../../components/TopBar/TopBar";
import Button from "../../../components/Button/Button";
import Product, {DEFAULT_BUTTON_CONFIG} from "../../../components/ProductItem/Product";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import React, { useEffect, useState } from 'react';
import {errorToast} from "../../../components/Toast/Toast";

export default function GerenciarEquipe(){
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState([]);

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


     useEffect(() => {
             api.get('/usuarios').then((res) => {
                 setUsuarios(res.data);
                 sessionStorage.setItem('usuarios', JSON.stringify(res.data));
             }).catch((error) => {
                 errorToast("Erro ao buscar usuários. Contate o suporte.")
                 console.error("Erro ao buscar usuários:", error);
             })
         }
     )

    useEffect(() => {
        const interval = setInterval(() => {
          const storedData = sessionStorage.getItem('usuarios');
          const reloadDone = sessionStorage.getItem('reloadDone');

          if (storedData && !reloadDone) {
            window.location.reload();
            sessionStorage.setItem('reloadDone', 'true'); 
          }
        }, 2500);
    
        return () => clearInterval(interval);
      }, []);

    return(
        <div className={styles.gerenciarEquipe}>
            <TopBar title={"Gerenciar equipe"}/>
            <div className={styles.equipe}>
                {usuarios.length === 0 ? <p>Carregando usuarios...</p> : <p></p>}
                {usuarios?.map(u => {
                        return <Product
                        name={u.nome} quantity={"Usuário(a)"} fullBorderRadius={true} buttonsConfig={btnsConfig} infoUsuario={u}
                        addressImg={
                            u.imagem ? `data:image/jpeg;base64,${u.imagem}` : "https://placehold.co/400/F5FBEF/22333B?text=User"
                        }
                    />
                })}
            </div><hr/>
            <div className={styles.containerBotao}>
                <Button insideText={"Adicionar colaborador"} onClick={()=>navigate("/adicionando-colaborador")}/>
            </div>
        </div>
    )
}