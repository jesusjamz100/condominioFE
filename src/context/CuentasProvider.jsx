import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CuentasContext = createContext();

export const CuentasProvider = ({children}) => {

    const [cuentas, setCuentas] = useState([]);
    const [cuenta, setCuenta] = useState({});

    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect( () => {
        const obtenerCuentas = async () => {
            try {
                const { data } = await axios(`${url}/cuentas`);
                setCuentas(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerCuentas();
    }, [cuenta])

    const guardarCuenta = async cuenta => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (cuenta.id) {
            try {
                const { data } = await axios.put(`${url}/cuentas/${cuenta.id}`, cuenta, config);
                const cuentasActualizadas = cuentas.map( cuentaState => cuentaState.id === data.id ? data : cuentaState)
                setCuentas(cuentasActualizadas);
                return {
                    msg: 'Cuenta actualizada correctamente'
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await axios.post(`${url}/cuentas`, cuenta, config);
                const { ...cuentaAlmacenada } = data;
                setCuentas([...cuentas, cuentaAlmacenada])
                return {
                    msg: 'Cuenta creada correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                }
            }
        }
    }

    const setEdicionCuenta = cuenta => {
        setCuenta(cuenta);
    }

    const eliminarCuenta = async id => {
        const confirmar = confirm('Confirme que va a eliminar la cuenta');
        
        if (confirmar) {
            try {
                const { data } = await axios.delete(`${url}/cuentas/${id}`)
                const cuentasActualizadas = cuentas.filter( cuentaState => cuentaState.id !== id);
                setCuentas(cuentasActualizadas);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <CuentasContext.Provider
            value={{
                cuenta,
                cuentas,
                eliminarCuenta,
                setEdicionCuenta,
                guardarCuenta
            }}
        >
            {children}
        </CuentasContext.Provider>
    )
}

export default CuentasContext;