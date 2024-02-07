import { useState } from 'react';
import useEgresos from '../hooks/useEgresos';
import useCuentas from '../hooks/useCuentas';
import formatearFecha from '../utils/formatearFecha';
import Modal from './Modal';
import FormEgreso from './FormEgreso';

const EgresoCard = ({egreso}) => {

    const [isOpen, setIsOpen] = useState(false);

    const { id, descripcion, factura, cuenta_id } = egreso;

    const { eliminarEgreso, setEdicionEgreso, setEdicionFactura } = useEgresos();
    const { cuentas } = useCuentas();

    const cuenta = cuentas.filter( cuentaState => cuentaState.id === cuenta_id);

    return (
        <>
            <div className="card p-5 flex flex-col rounded-lg shadow-lg sm:w-[31%] w-full flex-wrap">
                <p className="text-red-400 text-xl font-bold">ID #{id}</p>
                <p className="text-lg"><span className="font-bold ">Cuenta:</span> {cuenta[0].nombre}</p>
                <p className="text-lg break-normal"><span className="font-bold">Descripción:</span> {descripcion}</p>
                <p className="text-lg break-normal"><span className="font-bold">Cantidad:</span> {factura ? `$${factura.cantidad}` : 'Sin factura'}</p>
                <p className="text-lg break-normal"><span className="font-bold">Fecha:</span> {factura ? formatearFecha(factura.fecha) : 'Sin factura'}</p>
                <div className="flex flex-row md:flex-col lg:flex-row gap-2">
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 w-fit py-1 mt-2"
                        onClick={() => {
                            setEdicionEgreso(egreso);
                            setIsOpen(true)
                        }}
                    >Editar</button>
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-red-500 text-red-500 hover:text-white border border-red-500 w-fit py-1 mt-2"
                        onClick={ () => eliminarEgreso(id)}
                    >Eliminar</button>
                </div>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormEgreso /></Modal>}
        </>
    )
}

export default EgresoCard