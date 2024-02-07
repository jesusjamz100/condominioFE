import { useState } from "react";
import useEgresos from "../hooks/useEgresos";
import EgresoCard from "../components/EgresoCard";
import Modal from "../components/Modal";
import FormEgreso from "../components/FormEgreso";

const VerEgresos = () => {

    const [egresosQuery, setEgresosQuery] = useState('');
    const [query, setQuery] = useState('');

    const { egresos, setEdicionEgreso } = useEgresos();

    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        
        const busquedaEgresos = egresos.filter( egresoState => {
            if (egresoState.descripcion.toLowerCase().includes(query.toLowerCase())) {
                return egresoState;
            }
        })
        setEgresosQuery(busquedaEgresos);
    }

    return (
        <>
            <div className="flex flex-row gap-3 w-full mb-5">
                <form onSubmit={handleSubmit} className="flex gap-5 place-content-center w-full">
                    <input type="text"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        className="focus:outline-none w-full h-auto px-4 placeholder:text-xl text-lg rounded-lg shadow-md"
                        placeholder="Buscar egreso" />
                    <input
                        type="submit"
                        value="Buscar"
                        className="cursor-pointer p-3 bg-green-500 hover:bg-green-700 rounded-lg shadow-md text-white font-semibold" />
                </form>
                <button
                    className=" p-3 bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md text-white font-semibold"
                    onClick={() => {
                    setEgresosQuery([]);
                    setQuery('');
                    }}>Reset</button>
            </div>
            {egresos.length ? (
                <>
                    <p className="text-center text-3xl font-bold mb-10">Lista de egresos</p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {egresosQuery ? egresosQuery.map( egreso => (
                            <EgresoCard
                                key={egreso.id}
                                egreso={egreso}
                            />
                        )) : egresos.map( egreso => (
                            <EgresoCard
                                key={egreso.id}
                                egreso={egreso}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center text-xl">No hay egresos</p>
            )}
            <button 
                className="fixed z-[10] px-3 py-2 bg-green-500 hover:bg-green-600 text-xl font-extrabold rounded-full text-white left-[95%] bottom-10"
                onClick={() => {
                    setEdicionEgreso({});
                    setIsOpen(true);
                }}
                >+</button>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormEgreso /></Modal>}
        </>
    )
}

export default VerEgresos