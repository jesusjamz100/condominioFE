import { useState } from "react";
import useIngresos from "../hooks/useIngresos";
import Modal from "./Modal";
import FormIngreso from "./FormIngreso";
import useCuentas from "../hooks/useCuentas";

const IngresoCard = ({ingreso}) => {

    const [isOpen, setIsOpen] = useState(false);

    const { id, descripcion, recibo, cuenta_id } = ingreso;

    const { eliminarIngreso, setEdicionIngreso, setEdicionRecibo } = useIngresos();
    const { cuentas } = useCuentas();

    const cuenta = cuentas.filter( cuentaState => cuentaState.id === cuenta_id);

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-VE', {dateStyle: 'long'}).format(nuevaFecha);
    };

    return (
        <>
            <div className="card p-5 flex flex-col rounded-lg shadow-lg sm:w-[31%] w-full flex-wrap">
                <p className="text-red-400 text-xl font-bold">ID #{id}</p>
                <p className="text-lg"><span className="font-bold ">Cuenta:</span> {cuenta[0].nombre}</p>
                <p className="text-lg break-normal"><span className="font-bold">Descripción:</span> {descripcion}</p>
                <p className="text-lg break-normal"><span className="font-bold">Cantidad:</span> {recibo ? `$${recibo.cantidad}` : 'Sin recibo'}</p>
                <p className="text-lg break-normal"><span className="font-bold">Fecha:</span> {recibo ? formatearFecha(recibo.fecha) : 'Sin recibo'}</p>
                <div className="flex flex-row md:flex-col lg:flex-row gap-2">
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 w-fit py-1 mt-2"
                        onClick={() => {
                            setEdicionIngreso(ingreso);
                            setIsOpen(true);
                            if (ingreso.recibo) {
                                setEdicionRecibo(ingreso.recibo);
                            }
                        }}
                    >Editar</button>
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-red-500 text-red-500 hover:text-white border border-red-500 w-fit py-1 mt-2"
                        onClick={ () => eliminarIngreso(id)}
                    >Eliminar</button>
                </div>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormIngreso /></Modal>}
        </>
    )
}

export default IngresoCard;