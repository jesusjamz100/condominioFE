import { useState } from "react";
import usePropietarios from "../hooks/usePropietarios";
import Modal from "./Modal";
import FormPropietario from "./FormPropietario";

const PropietarioCard = ({propietario}) => {

    const { id, nombre, apellido, email, apartamentos, recibos } = propietario;

    const { eliminarPropietario, setEdicion } = usePropietarios();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="card flex flex-col flex-wrap p-6 rounded-xl shadow-lg sm:min-w-[30%] min-w-full">
                <p className="text-red-400 text-xl font-bold">ID #{id}</p>
                <p className="text-lg"><span className="font-bold ">Nombre:</span> {nombre + ' ' + apellido}</p>
                <p className="text-lg"><span className="font-bold">Email:</span> {email}</p>
                <p className="text-lg"><span className="font-bold">Numero de Apartamentos: </span> {apartamentos.length}</p>
                <p className="text-lg"><span className="font-bold">Numero de Recibos: </span> {recibos.length}</p>
                <div className="flex gap-2">
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 w-fit py-1 mt-2"
                        onClick={() => {
                            setEdicion(propietario);
                            setIsOpen(true);
                        }}
                    >Editar</button>
                    <button 
                        className="px-3 rounded-lg font-bold hover:bg-red-500 text-red-500 hover:text-white border border-red-500 w-fit py-1 mt-2"
                        onClick={ () => eliminarPropietario(propietario.id)}
                    >Eliminar</button>
                </div>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormPropietario /></Modal>}
        </>
    )
}

export default PropietarioCard;