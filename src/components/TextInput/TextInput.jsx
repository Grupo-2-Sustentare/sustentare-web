const TIPOS_PERMITIDOS = ["text", "password"]

export default function Input({ label, value, type, onChange}){

    // Se o tipo não for permitido, dá exception.
    if (!TIPOS_PERMITIDOS.includes(type)) throw new Error("Tipo não permitido ou não implementado. Medida de qualidade.")

    // Criando a label, caso tenha sido informada.
    let tagLabel = null;
    if (label !== undefined){
        tagLabel = <label>{label}</label>
    }

    return (
        <div>
            {tagLabel}
            <input value={value} type={type} onChange={onChange}/>
        </div>
    )
}
