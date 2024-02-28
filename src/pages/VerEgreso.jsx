import { useState } from "react";
import useEgresos from "../hooks/useEgresos";
import useCuentas from "../hooks/useCuentas";
import formatearFecha from "../utils/formatearFecha.js";

const VerEgreso = () => {

    const [egreso, setEgreso] = useState({});
    const [cuenta, setCuenta] = useState({});
    const { egresos } = useEgresos();
    const { cuentas } = useCuentas();

    const handleChange = async e => {
        const id = e.target.value;
        try {
            setEgreso(await egresos.find( egreso => egreso.id === parseInt(id)));
            setCuenta(cuentas.filter( cuenta => cuenta.id === egreso.cuenta_id));
            console.log(egresos);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <select className="select-buscar" name="egreso" id="egreso"
                onChange={handleChange}>
                <option value="0">Elegir Egreso</option>
                {egresos.map( egreso => (
                    <option key={egreso.id} value={egreso.id}>{egreso.id} - {egreso.descripcion}</option>
                ))}
            </select>
            {egreso.id ? (
                <>
                    <div className={`${egreso.factura ? 'flex-row justify-center' : 'flex-col justify-center'} flex mb-5 gap-10`}>
                        <div className={`${egreso.factura ? '' : 'mx-auto'} flex flex-col justify-center w-[60%] lg:w-[40%] gap-5 card rounded-lg py-6 shadow-lg items-center px-10`}>
                            <p className="text-red-500 text-2xl w-full text-center">ID #{egreso.id}</p>
                            <div className="flex flex-row gap-5 md:flex-col">
                                <p className="text-2xl text-center">{egreso.descripcion}</p>
                                <p className="text-2xl text-center">Cuenta: {cuenta[0].nombre}</p>
                            </div>
                        </div>
                        {egreso.factura ? (
                            <div className="flex flex-col gap-5 card p-5 rounded-lg shadow-md w-[40%] justify-center">
                                <p className="text-center text-xl font-semibold">Factura #{egreso.factura.id}</p>
                                <p className="text-center text-xl">{formatearFecha(egreso.factura.fecha)}</p>
                                <p className="text-center text-xl">Cantidad: ${egreso.factura.cantidad}</p>
                            </div>
                        ) : 
                            <>
                                <p className="text-lg font-semibold w-full text-center">Este egreso no tiene factura</p>
                            </>
                        }
                    </div>
                </>
            ) : 
                <>
                    <p className="text-xl text-center mt-10">Seleccione un egreso para ver su información</p>
                </>
            }
        </>
    )
}

export default VerEgreso;