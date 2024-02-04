import { useState } from "react";
import useCuentas from "../hooks/useCuentas";
import Modal from "./Modal";
import FormCuenta from "./FormCuenta";

const CuentaCard = ({cuenta}) => {

    const [isOpen, setIsOpen] = useState(false);

    const { id, nombre, saldo, ingresos, egresos } = cuenta;

    const { eliminarCuenta, setEdicionCuenta } = useCuentas();

    return (
        <>
            <div className="card flex flex-col flex-wrap p-6 rounded-xl shadow-lg sm:min-w-[30%] min-w-full">
                <p className="text-red-400 text-xl font-bold">ID #{id}</p>
                <p className="text-lg"><span className="font-bold ">Nombre:</span> {nombre}</p>
                <p className="text-lg"><span className="font-bold">Saldo: </span>${saldo}</p>
                <p className="text-lg"><span className="font-bold">Ingresos: </span>{ingresos.length}</p>
                <p className="text-lg"><span className="font-bold">Egresos: </span>{egresos.length}</p>
                <div className="flex gap-2">
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 w-fit py-1 mt-2"
                        onClick={ () => {
                            setEdicionCuenta(cuenta);
                            setIsOpen(true);
                        }}
                    >Editar</button>
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-red-500 text-red-500 hover:text-white border border-red-500 w-fit py-1 mt-2"
                        onClick={ () => eliminarCuenta(id)}
                    >Eliminar</button>
                </div>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormCuenta /></Modal>}
        </>
    )
}

export default CuentaCard;