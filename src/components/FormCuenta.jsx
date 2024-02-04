import { useState, useEffect } from "react";
import useCuentas from "../hooks/useCuentas";
import Alerta from "./Alerta";

const FormCuenta = () => {

    const [nombre, setNombre] = useState('');
    const [saldo, setSaldo] = useState(0);
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    const { cuenta, guardarCuenta } = useCuentas();

    useEffect( () => {
        if (cuenta?.id) {
            setNombre(cuenta.nombre);
            setSaldo(cuenta.saldo);
            setId(cuenta.id);
        }
    }, [cuenta]);

    const handleSubmit = async e => {
        e.preventDefault();
        
        if ([nombre, saldo].includes('')) {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true});
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            return;
        }

        const resultado = await guardarCuenta({nombre, saldo, id});
        setAlerta(resultado);
        if (resultado.error) {
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            return;
        }

        setTimeout(() => {
            setAlerta({});
        }, 3000);

        setNombre('');
        setSaldo(0);
        setId(null);
    };

    const {msg} = alerta;

    return (
        <div className="flex flex-col items-center">
            {msg && (
                <Alerta 
                    alerta={alerta}
                />
            )}
            <h2 className="text-lg text-center font-bold mb-5">{id ? 'Actualizar cuenta' : 'Agregar cuenta'}</h2>
            <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                <label htmlFor="nombre" className="text-md mb-3 font-semibold">Nombre:</label>
                <input type="text" name="nombre" id="nombre" className="form-input" value={nombre} onChange={e => setNombre(e.target.value)} />
                <label htmlFor="saldo" className="text-md mb-3 font-semibold">Saldo:</label>
                <input type="text" name="saldo" id="saldo" className="form-input" value={saldo} onChange={e => setSaldo(e.target.value)} />
                <input
					className="bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-800 cursor-pointer transition-colors rounded-lg max-w-fit self-center mt-3"
					type="submit"
					value={id ? 'Editar Cuenta' : 'Agregar Cuenta'}
				/>
            </form>
        </div>
    )
}

export default FormCuenta;