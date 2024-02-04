
const Alerta = ({alerta}) => {
    return (
        <div
            className={`${alerta.error ? 'bg-red-600' : 'bg-green-600'} p-3 rounded-lg uppercase font-semibold text-white text-sm mb-10`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta;