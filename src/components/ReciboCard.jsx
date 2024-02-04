import usePropietarios from "../hooks/usePropietarios";
import useIngresos from "../hooks/useIngresos";
import { useState } from "react";
import Modal from "./Modal";
import FormRecibo from "./FormRecibo";

const ReciboCard = ({recibo}) => {

    const [isOpen, setIsOpen] = useState(false);

    const { id, propietario_id, ingreso_id, cantidad, fecha } = recibo;
    const { propietarios } = usePropietarios();
    const { ingresos, setEdicionRecibo, eliminarRecibo } = useIngresos();

    const propietario = propietarios.filter( propietarioState => propietarioState.id === propietario_id);
    const ingreso = ingresos.filter( ingresoState => ingresoState.id === ingreso_id);

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-VE', {dateStyle: 'long'}).format(nuevaFecha);
    };

    return (
        <>
            <div className="card p-5 flex flex-col rounded-lg shadow-lg sm:w-[31%] w-full flex-wrap justify-center">
                <p className="text-red-400 text-xl font-bold">ID #{id}</p>     
                <p className="text-lg break-normal"><span className="font-bold">Propietario:</span> {propietario[0] ? `${propietario[0].nombre} ${propietario[0].apellido}` : 'Sin propietario'}</p>
                <p className="text-lg break-normal"><span className="font-bold">Ingreso:</span> {ingreso[0] ? ingreso[0].descripcion : 'Sin propietario'}</p>
                <p className="text-lg break-normal"><span className="font-bold">Cantidad:</span> ${cantidad}</p>
                <p className="text-lg break-normal"><span className="font-bold">Fecha:</span> {formatearFecha(fecha)}</p>
                <div className="flex flex-row md:flex-col lg:flex-row gap-2">
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 w-fit py-1 mt-2"
                        onClick={() => {
                            setEdicionRecibo(recibo);
                            setIsOpen(true);
                        }}
                    >Editar</button>
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-red-500 text-red-500 hover:text-white border border-red-500 w-fit py-1 mt-2"
                        onClick={ () => eliminarRecibo(id)}
                    >Eliminar</button>
                </div>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormRecibo /></Modal>}
        </>
    )
}

export default ReciboCard;