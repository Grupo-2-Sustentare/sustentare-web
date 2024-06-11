export default function Input({ value, type, onChange, className }){
    return (
        <>
            <input value={value} type={type} onChange={onChange} className={className}/>
        </>
    )
}
