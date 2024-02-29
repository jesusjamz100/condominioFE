import useEgresos from "../hooks/useEgresos";
import { useState } from "react";
import Modal from "./Modal";
import FormFactura from "./FormFactura";
import formatearFecha from "../utils/formatearFecha.js";

const FacturaCard = ({factura}) => {

    const [isOpen, setIsOpen] = useState(false);

    const { id, egreso_id, cantidad, fecha } = factura;
    const { egresos, setEdicionFactura, eliminarFactura } = useEgresos();
    
    const egreso = egresos.filter( egresoState => egresoState.id === egreso_id);

    return (
        <>
            <div className="card p-5 flex flex-col rounded-lg shadow-lg sm:w-[31%] w-full flex-wrap justify-center">
                <p className="text-red-400 text-xl font-bold">ID #{id}</p>
                <p className="text-lg break-normal"><span className="font-bold">Egreso:</span> {egreso[0] ? egreso[0].descripcion : 'No Asociado'}</p>
                <p className="text-lg break-normal"><span className="font-bold">Cantidad:</span> ${cantidad}</p>
                <p className="text-lg break-normal"><span className="font-bold">Fecha:</span> {formatearFecha(fecha)}</p>
                <div className="flex flex-row md:flex-col lg:flex-row gap-2">
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 w-fit py-1 mt-2"
                        onClick={() => {
                            setEdicionFactura(factura);
                            setIsOpen(true);
                        }}
                    >Editar</button>
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-red-500 text-red-500 hover:text-white border border-red-500 w-fit py-1 mt-2"
                        onClick={ () => eliminarFactura(id)}
                    >Eliminar</button>
                </div>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormFactura /></Modal>}
        </>
    )
}

export default FacturaCard;