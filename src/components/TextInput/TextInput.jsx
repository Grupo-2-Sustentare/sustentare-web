import styles from "./textInput.module.css"
const TIPOS_PERMITIDOS = ["text", "password"]

export default function TextInput({ label, type="text", onChange, placeholder,value}){

    // Se o tipo não for permitido, dá exception.
    if (!TIPOS_PERMITIDOS.includes(type)) throw new Error("Tipo não permitido ou não implementado. Medida de qualidade.")

    // Criando a label, caso tenha sido informada.
    let tagLabel = null;
    if (label !== undefined){
        tagLabel = <label>{label}</label>
    }

    const handleChange = (event) => {
       /* const value = event.target.value;*/
        if (onChange) {
            onChange(event); // Passa o valor do campo, não o evento
        }
    };


    return (
        <div className={styles.textInput}>
            {tagLabel}
            <input type={type}  onChange={handleChange} placeholder={placeholder} value={value}/>
        </div>
    )
}
                    