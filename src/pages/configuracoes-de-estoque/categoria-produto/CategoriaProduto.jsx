import IconInput from "../../../components/IconInput/IconInput.jsx";
import ListItem from "../../../components/ListItem/ListItem.jsx";
import StrechList from "../../../components/StrechList/StrechList.jsx";
import TopBar from "../../../components/TopBar/TopBar";
import style from "../categoria-produto/categoriaProduto.module.css";
import {useNavigate} from "react-router-dom";

export default function ConfigurationMenu({}){
     const navigate = useNavigate();

     const github = "https://github.com/Grupo-2-Sustentare/sustentare-web/tree/main/src/assets/images/catgorias";
     return(
          <>
             <div className={style.topBar}>
               <TopBar title="Categoria do produto" showBackArrow={false}/>
             </div>
            
             <div className={style.conteudoInicioTela}>
                <IconInput placeholder={"Pesquisar por nome"}/>
                <StrechList showTitle={false} hint="Ordenar por nome"/>
             </div>
                <hr></hr>
             <div className={style.conteudoTela}>
                <ListItem 
                    heading={"Ingredientes do self service"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={github + "/Self service"}/>
                <ListItem 
                    heading={"Bebidas"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJoN1-whoTTukSdz0dLPTXwt_gJodJ-OKJrpQmVEVTQBUFJm_lRs0xITVAfR1duTCjWGp6K-0QyN85zXsRH4yAueWQfIy3btbCuXcIUScTqopyTuF4-Fy7aydrMzi4rU1blc83eXcL0BwF/s1600/Foto+1.jpg"}/>
                <ListItem 
                    heading={"Doces para encomenda"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={"https://soubh.uai.com.br/uploads/post/image/11608/main_shutterstock_394680466.jpg"}/>
                <ListItem 
                    heading={"Produtos de limpeza"} 
                    subheading={""} fullBorderRadius={true} 
                    adressImg={"https://www.hygibras.com/wp-content/uploads/2022/01/produtos-quimicos-de-limpeza-destaque.png"}/>
                <ListItem 
                    heading={"Utensilios de cozinha"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={"https://cdn.awsli.com.br/757/757427/produto/1404312321e408e8f2b.jpg"}/>
                <ListItem 
                    heading={"Descartáveis"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={"https://sg-delivery.s3.sa-east-1.amazonaws.com/upload/images/164006202303286423429611628.jpg"}/>
                <ListItem 
                    heading={"Condimentos avulsos"} 
                    subheading={""} 
                    fullBorderRadius={true} 
                    adressImg={"https://imgs.extra.com.br/1558877951/1xg.jpg"}/>
             </div>

          </>
     );
}