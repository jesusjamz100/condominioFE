import { useState, useEffect } from "react";
import useEgresos from "../hooks/useEgresos";
import Alerta from "./Alerta";

const FormFactura = () => {

    const [id, setId] = useState(null);
    const [fecha, setFecha] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [egresoId, setEgresoId] = useState(0);

    const [alerta, setAlerta] = useState({});

    const { egresos, factura, guardarFactura } = useEgresos();

    useEffect( () => {
        if (factura.id) {
            setId(factura.id);
            setFecha(factura.fecha);
            setCantidad(factura.cantidad);
            setEgresoId(factura.egreso_id);
        }
    }, [factura])

    const handleSubmit = async e => {
        e.preventDefault();
        
        if ([fecha, cantidad, egresoId].includes('')) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true });
            setTimeout(() => setAlerta({}), 3000);
        }

        const resultado = await guardarFactura({ id, fecha, cantidad, egreso_id: egresoId });
        setAlerta(resultado);
        if (resultado.error) {
            setTimeout(() => setAlerta({}), 3000);
            return;
        }

        setTimeout(() => setAlerta({}), 3000);

        setId(null);
        setFecha('');
        setCantidad(0);
        setEgresoId(0);
    }

    const { msg } = alerta;

    return (
        <div className="flex flex-col items-center w-full">
            {msg && (
                <Alerta 
                    alerta={alerta}
                />
            )}
            <h2 className="text-lg text-center font-bold">{id ? 'Actualizar factura' : 'Agregar factura'}</h2>
            <form className="flex flex-col w-full mb-5" onSubmit={handleSubmit}>
                <label htmlFor="egreso_id" className="text-md mb-3 font-semibold">Egreso:</label>
                <select name="egreso_id" id="egreso_id" className="form-input" onChange={e => setEgresoId(e.target.value)} value={egresoId}>
                    <option value={0}>Seleccione Egreso</option>
                    {egresos.length && egresos.map( egreso => (
                        <option key={egreso.id} value={egreso.id}>{egreso.descripcion}</option>
                    ))}
                </select>
                <label htmlFor="cantidad" className="text-md mb-3 font-semibold">Cantidad:</label>
                <input type="number" name="cantidad" id="cantidad" className="form-input" value={cantidad} onChange={e => setCantidad(e.target.value)} />
                <label htmlFor="fecha" className="text-md mb-3 font-semibold">Fecha:</label>
                <input type="date" name="fecha" id="fecha" className="form-input" value={fecha} onChange={e => setFecha(e.target.value)} />
                <input
					className="bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-800 cursor-pointer transition-colors rounded-lg max-w-fit self-center mt-3"
					type="submit"
					value={id ? 'Editar Factura' : 'Agregar Facura'}
				/>
            </form>
        </div>
    )
}

export default FormFactura;