import { useEffect, useState } from "react";
import useEgresos from "../hooks/useEgresos";
import useCuentas from "../hooks/useCuentas";
import Alerta from '../components/Alerta';
import FormFactura from "./FormFactura";

const FormEgreso = () => {

    const [id, setId] = useState(null);
    const [cuentaId, setCuentaId] = useState(0);
    const [descripcion, setDescripcion] = useState('');
    const [factura, setFactura] = useState({});
    const [alerta, setAlerta] = useState({});

    const [mostrarFactura, setMostrarFactura] = useState(false);

    const { cuentas } = useCuentas();
    const { egreso, guardarEgreso } = useEgresos();

    useEffect( () => {
        if (egreso?.id) {
            setDescripcion(egreso.descripcion);
            setCuentaId(egreso.cuenta_id);
            setId(egreso.id);
            if (egreso.factura) {
                setFactura(egreso.factura)
            }
        }
    }, [egreso])

    const handleSubmit = async e => {
        e.preventDefault();
        
        if ([cuentaId, descripcion].includes('')) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true });
            setTimeout(() => setAlerta({}), 3000);
            return;
        }

        const resultado = await guardarEgreso({id, cuenta_id: cuentaId, descripcion});
        setAlerta(resultado);
        if (resultado.error) {
            setTimeout(() => setAlerta({}), 3000);
            return;
        }

        setTimeout(() => setAlerta({}), 3000);

        setId(null);
        setCuentaId(0);
        setDescripcion('');
    }

    const handleClick = () => {
        setMostrarFactura(!mostrarFactura);
    }

    const { msg } = alerta;
    
    return (
        <div className="flex flex-col items-center">
            {msg && (
                <Alerta 
                    alerta={alerta}
                />
            )}
            <h2 className="text-lg text-center font-bold mb-5">{id ? 'Actualizar egreso' : 'Agregar egreso'}</h2>
            <div className="w-full flex gap-5">
                <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                    <label htmlFor="cuenta_id" className="text-md mb-3 font-semibold">Nombre:</label>
                    <select name="cuenta_id" id="cuenta_id" className="form-input" onChange={e => setCuentaId(e.target.value)} value={cuentaId}>
                        <option value={0}>Seleccione Cuenta</option>
                        {cuentas.length && cuentas.map( cuenta => (
                            <option key={cuenta.id} value={cuenta.id}>{cuenta.nombre}</option>
                        ))}
                    </select>
                    <label htmlFor="descripcion" className="text-md mb-3 font-semibold">Descripcion:</label>
                    <input type="text" name="descripcion" id="descripcion" className="form-input" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                    <input
                        className="bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-800 cursor-pointer transition-colors rounded-lg max-w-fit self-center mt-3"
                        type="submit"
                        value={id ? 'Editar Egreso' : 'Agregar Egreso'}
                    />
                </form>
                {mostrarFactura && (
                    <FormFactura factura={factura} />
                )}
            </div>
            <p className="underline text-gray-400 cursor-pointer select-none" onClick={handleClick}>Editar Factura</p>
        </div>
    )
}

export default FormEgreso