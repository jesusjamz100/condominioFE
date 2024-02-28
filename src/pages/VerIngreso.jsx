import { useState } from "react";
import useIngresos from "../hooks/useIngresos";
import useCuentas from "../hooks/useCuentas";
import usePropietarios from "../hooks/usePropietarios";
import formatearFecha from "../utils/formatearFecha";


const VerIngreso = () => {

    const [ingreso, setIngreso] = useState({});
    const [cuenta, setCuenta] = useState({});
    const [propietario, setPropietario] = useState({});
    const { ingresos } = useIngresos();
    const { cuentas } = useCuentas();
    const { propietarios } = usePropietarios();

    const handleChange = async e => {
        const id = e.target.value;
        try {
            setIngreso(await ingresos.find( ingreso => ingreso.id === parseInt(id)));
            setCuenta(cuentas.filter( cuenta => cuenta.id === ingreso.cuenta_id));
            setPropietario(propietarios.filter( propietario => propietario.id === ingreso.recibo.propietario_id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <select className="select-buscar" name="ingreso" id="ingreso"
                onChange={handleChange}>
                <option value="0">Elegir Ingreso</option>
                {ingresos.map( ingreso => (
                    <option key={ingreso.id} value={ingreso.id}>{ingreso.id} - {ingreso.descripcion}</option>
                ))}
            </select>
            {ingreso.id ? (
                <>
                    <div className={`${ingreso.recibo ? 'flex-row justify-center' : 'flex-col justify-center'} flex mb-5 gap-10`}>
                        <div className={`${ingreso.recibo ? '' : 'mx-auto'} flex flex-col justify-center w-[60%] lg:w-[40%] gap-5 card rounded-lg py-6 shadow-lg items-center px-10`}>
                            <p className="text-red-500 text-2xl w-full text-center">ID #{ingreso.id}</p>
                            <div className="flex flex-row gap-5 md:flex-col">
                                <p className="text-2xl text-center">{ingreso.descripcion}</p>
                                <p className="text-2xl text-center">Cuenta: {cuenta[0].nombre}</p>
                            </div>
                        </div>
                        {ingreso.recibo ? (
                            <div className="flex flex-col gap-5 card p-5 rounded-lg shadow-md w-[40%] justify-center">
                                <p className="text-center text-xl font-semibold">Recibo #{ingreso.recibo.id}</p>
                                <p className="text-center text-xl">{formatearFecha(ingreso.recibo.fecha)}</p>
                                <p className="text-center text-xl">Cantidad: ${ingreso.recibo.cantidad}</p>
                                <p className="text-center text-xl">Propietario: {propietario[0] ? `${propietario[0].nombre} ${propietario[0].apellido}` : 'Sin Propietario'}</p>
                            </div>
                        ) : 
                            <>
                                <p className="text-lg font-semibold w-full text-center">Este ingreso no tiene recibo</p>
                            </>
                        }
                    </div>
                </>
            ) : 
                <>
                    <p className="text-xl text-center mt-10">Seleccione un ingreso para ver su información</p>
                </>
            }
        </>
    )
}

export default VerIngreso;