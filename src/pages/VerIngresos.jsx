import useIngresos from "../hooks/useIngresos";
import IngresoCard from "../components/IngresoCard";
import { useState } from "react";
import Modal from "../components/Modal";
import FormIngreso from "../components/FormIngreso";

const VerIngresos = () => {

    const [ingresosQuery, setIngresosQuery] = useState([]);
    const [query, setQuery] = useState('');

    const { ingresos, setEdicionIngreso } = useIngresos();

    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        
        const busquedaIngresos = ingresos.filter( ingresoState => {
            if (ingresoState.descripcion.toLowerCase().includes(query.toLowerCase())) {
                return ingresoState;
            }
        })
        setIngresosQuery(busquedaIngresos);
    }

    return (
        <>
            <div className="flex flex-row gap-3 w-full mb-5">
                <form onSubmit={handleSubmit} className="flex gap-5 place-content-center w-full">
                    <input type="text"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        className="focus:outline-none w-full h-auto px-4 placeholder:text-xl text-lg rounded-lg shadow-md"
                        placeholder="Buscar ingreso" />
                    <input
                        type="submit"
                        value="Buscar"
                        className="cursor-pointer p-3 bg-green-500 hover:bg-green-700 rounded-lg shadow-md text-white font-semibold" />
                </form>
                <button
                    className=" p-3 bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md text-white font-semibold"
                    onClick={() => {
                    setIngresosQuery([]);
                    setQuery('');
                    }}>Reset</button>
            </div>
            {ingresos.length ? (
                <>
                    <p className="text-center text-3xl font-bold mb-10">Lista de ingresos</p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {ingresosQuery.length ? ingresosQuery.map( ingreso => (
                            <IngresoCard
                                key={ingreso.id}
                                ingreso={ingreso}
                            />
                        )) : ingresos.map( ingreso => (
                            <IngresoCard
                                key={ingreso.id}
                                ingreso={ingreso}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center text-xl">No hay ingresos</p>
            )}
            <button 
                className="fixed z-[10] px-3 py-2 bg-green-500 hover:bg-green-600 text-xl font-extrabold rounded-full text-white left-[95%] bottom-10"
                onClick={() => {
                    setEdicionIngreso({});
                    setIsOpen(true);
                }}
                >+</button>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormIngreso /></Modal>}
        </>
    )
}

export default VerIngresos;