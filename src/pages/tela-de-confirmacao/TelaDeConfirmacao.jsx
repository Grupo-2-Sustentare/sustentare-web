import TopBar from "../../components/TopBar/TopBar";
import style from "../tela-de-confirmacao/telaDeConfirmacao.module.css";
import ListItem from "../../components/ListItem/ListItem";
import IconButton from "../../components/IconButton/IconButton";
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../api";
import { errorToast, successToast } from "../../components/Toast/Toast";
import React, { useEffect, useState } from 'react';

export default function TelaDeConfirmacao({ }) {
    var backNavigationPath = "/configuracoes-de-categorias" // Setinha de voltar na TopBar

    var tituloTopBar = "Removendo"
    var fullBorderRadius = false;
    var heading = "Pedro Coelho"
    var subheading = "Usuário(a)"
    var adressImg = "data:image/jpeg;base64,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"
    var mensagemConfirmacao = "O seguinte usuário será deletado: "


    const responsavelString = sessionStorage.getItem("responsavel"); 
    const responsavel = responsavelString ? JSON.parse(responsavelString) : null; 
    const idResponsavel = responsavel ? responsavel.id : null;

    const location = useLocation();
    const categoria = location.state?.categoria;
    const unidadeDeMedida = location.state?.unidadeDeMedida;
    
    const navigate = useNavigate()

    const removendo = async () => {
        if(categoria != undefined){

        }
    
        if(unidadeDeMedida != undefined){
            api.delete(`/unidades-medida/${unidadeDeMedida.id}?idResponsavel=${idResponsavel}`)
            .then((response) => {
                successToast(`Unidade "${unidadeDeMedida.nome}" desativada com sucesso!`);
                navigate("/configuracoes-de-unidade-medida", { state: { unidadeMedidaRemovida: unidadeDeMedida } })
            })
            .catch((error) => {
                console.error("Erro ao desativar unidade de medida:", error);
                errorToast("Ocorreu um erro ao tentar desativar a unidade de medida.");
            });
        }
    }

   
        if(categoria != undefined){
            heading = categoria.nome
            adressImg = categoria.imagem ? `data:image/jpeg;base64,${categoria.imagem}` : "https://placehold.co/400/F5FBEF/22333B?text=User"
            mensagemConfirmacao = "A seguinte categoria será deletada: "
        }
    
        if(unidadeDeMedida != undefined){
            heading = unidadeDeMedida.nome
            adressImg = unidadeDeMedida.imagem ? `data:image/jpeg;base64,${unidadeDeMedida.imagem}` : "https://placehold.co/400/F5FBEF/22333B?text=User"
            mensagemConfirmacao = "A seguinte unidade de medida será deletada: "
        }


    return (
        <>
            <div>
                <TopBar 
                title={tituloTopBar} 
                showBackArrow={false} 
                backNavigationPath={backNavigationPath}
                />
            </div>
            <div className={style.inicioMeioTela}>

                <div className={style.informacao}>
                    <p>{mensagemConfirmacao}</p>
                    <ListItem
                        fullBorderRadius={fullBorderRadius}
                        heading={heading}
                        subheading={subheading}
                        adressImg={adressImg}
                        // onClick={() => selectListItem(categoria)}
                    />
                </div>

                <div className={style.botoes}>
                    <IconButton
                        icone={"fa-solid fa-trash"}
                        texto={"Confirmar"}
                        onClick={removendo}
                    />
                    <IconButton
                        icone={"fa-solid fa-x"}
                        texto={"Cancelar"}
                    // onClick={}
                    />
                </div>
            </div>
        </>
    );
}