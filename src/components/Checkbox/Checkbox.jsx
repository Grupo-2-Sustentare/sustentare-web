// import styles from './Checkbox.module.css';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {useState} from "react";

// export default function Checkbox({
//         texto = "Texto da Checkbox",
//         ticadaPorPadrao = false
//     }) {
//     const [visibilidade, setVisibilidade] = useState(
//         ticadaPorPadrao ? 1 : 0
//     )

//     function ticarCheckbox(){
//         if (visibilidade === 1){
//             setVisibilidade(0)
//             console.log("nao esta ticada")
//         } else {
//             setVisibilidade(1)
//             console.log("esta ticada")
//         }
//     }

//     return(
//         <>
//             <label className={styles.containerCheckbox} onClick={() => ticarCheckbox()}>
//                 <span className={styles.checkbox}>
//                     <FontAwesomeIcon icon="fa-solid fa-check" style={{opacity: visibilidade}}/>
//                 </span>
//                 {texto}
//             </label>
//         </>
//     )
// }