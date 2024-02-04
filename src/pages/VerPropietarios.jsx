import PropietarioCard from "../components/PropietarioCard";
import usePropietarios from "../hooks/usePropietarios";
import { useState } from "react";
import Modal from "../components/Modal";
import FormPropietario from "../components/FormPropietario";

const VerPropietarios = () => {

    const [propietariosQuery, setPropietariosQuery] = useState([]);
    const [query, setQuery] = useState('');

    const { propietarios, setEdicion } = usePropietarios();

    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        const busquedaPropietarios = propietarios.filter( propietarioState => {
            if (propietarioState.nombre.toLowerCase().includes(query.toLowerCase()) ||
                propietarioState.apellido.toLowerCase().includes(query.toLowerCase()) ||
                propietarioState.email.toLowerCase().includes(query.toLowerCase())) {
                return propietarioState;
            }
        })
        setPropietariosQuery(busquedaPropietarios);
    }

    return (
        <>
            <div className="flex flex-row gap-3 w-full mb-5">
                <form onSubmit={handleSubmit} className="flex gap-5 place-content-center w-full">
                    <input type="text"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        className="focus:outline-none w-full h-auto px-4 placeholder:text-xl text-lg rounded-lg shadow-md"
                        placeholder="Buscar propietario" />
                    <input
                        type="submit"
                        value="Buscar"
                        className="cursor-pointer p-3 bg-green-500 hover:bg-green-700 rounded-lg shadow-md text-white font-semibold" />
                </form>
                <button
                    className=" p-3 bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md text-white font-semibold"
                    onClick={() => {
                    setPropietariosQuery([]);
                    setQuery('');
                    }}>Reset</button>
            </div>
            {propietarios.length ? (
                <>
                    <p className="text-center text-3xl font-bold mb-10">Lista de propietarios</p>

                    <div className="flex flex-wrap gap-6 justify-center">
                        {propietariosQuery.length ? propietariosQuery.map( propietario => (
                            <PropietarioCard
                                key={propietario.id}
                                propietario={propietario} />
                        )) : propietarios.map( propietario => (
                            <PropietarioCard
                                key={propietario.id}
                                propietario={propietario} />
                        ))}
                    </div>
                </>
            ) : 
                <>
                    <p className="text-center text-xl">No hay propietarios</p>
                </>
            }
            <button 
                className="fixed z-[10] px-3 py-2 bg-green-500 hover:bg-green-600 text-xl font-extrabold rounded-full text-white left-[95%] bottom-10"
                onClick={() => {
                    setEdicion({});
                    setIsOpen(true);
                }}
                >+</button>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormPropietario /></Modal>}
        </>
    )
}

export default VerPropietarios;