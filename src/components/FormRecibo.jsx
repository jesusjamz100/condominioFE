import useIngresos from "../hooks/useIngresos";
import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import usePropietarios from "../hooks/usePropietarios"

const FormRecibo = () => {
    
    const [id, setId] = useState(null);
    const [fecha, setFecha] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [ingresoId, setIngresoId] = useState(0);
    const [propietarioId, setPropietarioId] = useState(0);

    const [alerta, setAlerta] = useState({});

    const { ingresos, recibo, guardarRecibo } = useIngresos();
    const { propietarios } = usePropietarios();

    useEffect( () => {
        if (recibo.id) {
            setId(recibo.id);
            setFecha(recibo.fecha);
            setCantidad(recibo.cantidad);
            setIngresoId(recibo.ingreso_id);
            setPropietarioId(recibo.propietario_id);
        }
    }, [recibo])

    const handleSubmit = async e => {
        e.preventDefault();
        
        if ([fecha, cantidad, ingresoId, propietarioId].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            setTimeout( () => setAlerta({}), 3000);
            return;
        }

        const resultado = await guardarRecibo({ id, fecha, cantidad: cantidad, ingreso_id: ingresoId, propietario_id: propietarioId });
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

        setId(null);
        setFecha('');
        setCantidad(0);
        setIngresoId(0);
        setPropietarioId(0);
    }

    const { msg } = alerta;
    
    return (
        <div className="flex flex-col items-center w-full">
            {msg && (
                <Alerta 
                    alerta={alerta}
                />
            )}
            <h2 className="text-lg text-center font-bold">{id ? 'Actualizar recibo' : 'Agregar recibo'}</h2>
            <form className="flex flex-col w-full mb-5" onSubmit={handleSubmit}>
                <label htmlFor="ingreso_id" className="text-md mb-3 font-semibold">Ingreso:</label>
                <select name="ingreso_id" id="ingreso_id" className="form-input" onChange={e => setIngresoId(e.target.value)} value={ingresoId}>
                    <option value={0}>Seleccione Ingreso</option>
                    {ingresos.length && ingresos.map( ingreso => (
                        <option key={ingreso.id} value={ingreso.id}>{ingreso.descripcion}</option>
                    ))}
                </select>
                <label htmlFor="propietario_id" className="text-md mb-3 font-semibold">Propietario:</label>
                <select name="propietario_id" id="propietario_id" className="form-input" onChange={e => setPropietarioId(e.target.value)} value={propietarioId || 0}>
                    <option value={0}>Seleccione Propietario</option>
                    {propietarios.length && propietarios.map( propietario => (
                        <option key={propietario.id} value={propietario.id}>{propietario.nombre} {propietario.apellido}</option>
                    ))}
                </select>
                <label htmlFor="cantidad" className="text-md mb-3 font-semibold">Cantidad:</label>
                <input type="number" name="cantidad" id="cantidad" className="form-input" value={cantidad} onChange={e => setCantidad(e.target.value)} />
                <label htmlFor="fecha" className="text-md mb-3 font-semibold">Fecha:</label>
                <input type="date" name="fecha" id="fecha" className="form-input" value={fecha} onChange={e => setFecha(e.target.value)} />
                <input
					className="bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-800 cursor-pointer transition-colors rounded-lg max-w-fit self-center mt-3"
					type="submit"
					value={id ? 'Editar Recibo' : 'Agregar Recibo'}
				/>
            </form>
        </div>
    )
}

export default FormRecibo;