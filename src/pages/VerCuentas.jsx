import useCuentas from '../hooks/useCuentas';
import CuentaCard from '../components/CuentaCard';
import { useState } from 'react';
import FormCuenta from '../components/FormCuenta';
import Modal from '../components/Modal';

const VerCuentas = () => {

    const [cuentasQuery, setCuentasQuery] = useState([]);
    const [query, setQuery] = useState('');

    const { cuentas, setEdicionCuenta } = useCuentas();

    const [ isOpenCuentas, setIsOpenCuentas ] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        
        const busquedaCuentas = cuentas.filter( cuentaState => {
            if (cuentaState.nombre.toLowerCase().includes(query.toLowerCase())) {
                return cuentaState;
            }
        })
        setCuentasQuery(busquedaCuentas);
    }

    return (
        <>
            <div className="flex flex-row gap-3 w-full mb-5">
                <form onSubmit={handleSubmit} className="flex gap-5 place-content-center w-full">
                    <input type="text"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        className="focus:outline-none w-full h-auto px-4 placeholder:text-xl text-lg rounded-lg shadow-md"
                        placeholder="Buscar cuenta" />
                    <input
                        type="submit"
                        value="Buscar"
                        className="cursor-pointer p-3 bg-green-500 hover:bg-green-700 rounded-lg shadow-md text-white font-semibold" />
                </form>
                <button
                    className=" p-3 bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md text-white font-semibold"
                    onClick={() => {
                    setCuentasQuery([]);
                    setQuery('');
                    }}>Reset</button>
            </div>
            {cuentas.length ? (
                <>
                    <p className="text-center text-3xl font-bold mb-10">Lista de Cuentas</p>

                    <div className="flex flex-wrap gap-6 justify-center">
                        {cuentasQuery.length ? cuentasQuery.map( cuenta => (
                            <CuentaCard 
                                key={cuenta.id}
                                cuenta={cuenta}
                            />
                        )) : cuentas.map( cuenta => (
                            <CuentaCard 
                                key={cuenta.id}
                                cuenta={cuenta}
                            />
                        )
                        )}
                    </div>
                </>
            ) : (
                <>
                    <p className="text-center text-xl">No hay cuentas</p>
                </>
            )}
            <button 
                className="fixed z-[10] px-3 py-2 bg-green-500 hover:bg-green-600 text-xl font-extrabold rounded-full text-white left-[95%] bottom-10"
                onClick={() => {
                    setEdicionCuenta({});
                    setIsOpenCuentas(true);
                }}
                >+</button>
            {isOpenCuentas && <Modal setIsOpen={setIsOpenCuentas}><FormCuenta /></Modal>}
        </>
    )
}

export default VerCuentas;