import { useState } from "react";
import useCuentas from "../hooks/useCuentas";
import axios from "axios";
import CuentaInfo from "../components/CuentaInfo";

const VerCuenta = () => {

    const [cuenta, setCuenta] = useState({});

    const { cuentas } = useCuentas();

    const handleChange = async e => {
        const id = e.target.value;
        const url = import.meta.env.VITE_BACKEND_URL;

        try {
            const { data } = await axios(`${url}/cuentas/${id}`);
            setCuenta(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <select className="select-buscar" name="cuenta" id="cuenta" onChange={handleChange}>
                <option value="0">Elegir Cuenta</option>
                {cuentas.map( cuenta => (
                    <option key={cuenta.id} value={cuenta.id}>{cuenta.id} - {cuenta.nombre}</option>
                ))}
            </select>
            {cuenta.id ? (
                <CuentaInfo
                    key={cuenta.id}
                    cuenta={cuenta}
                />
            ) : (
                <p className="text-xl text-center mt-10">Seleccione una cuenta para ver su información</p>
            )}
        </>
    )
}

export default VerCuenta;