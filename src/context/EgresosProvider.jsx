import { createContext, useState, useEffect } from "react";
import axios from "axios";

const EgresosContext = createContext();

export const EgresosProvider = ({children}) => {

    const [egreso, setEgreso] = useState({});
    const [egresos, setEgresos] = useState([]);

    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect( () => {
        const obtenerCuentas = async () => {
            try {
                const { data } = await axios(`${url}/egresos`);
                setEgresos(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerCuentas();
    }, [egreso])

    const guardarEgreso = async egreso => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (egreso.id) {
            try {
                const { data } = await axios.put(`${url}/egresos/${egreso.id}`, egreso, config);
                const egresosActualizados = egresos.map( egresoState => egresoState.id === data.id ? data : egresoState);
                setEgresos(egresosActualizados);
                return {
                    msg: "Egreso actualizado correctamente"
                }
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                }
            }
        } else {
            try {
                const { data } = await axios.post(`${url}/egresos/`, egreso, config);
                const { ...egresoAlmacenado } = data;
                setEgresos(...egresos, egresoAlmacenado);
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                }
            }
        }
    }

    const setEdicionEgreso = egreso => {
        setEgreso(egreso);
    }

    const eliminarEgreso = async id => {

        try {
            const { data } = await axios.delete(`${url}/egresos/${id}`, config);
            const egresosActualizados = egresos.filter( egresoState => egresoState.id !== id);
            setEgresos(egresosActualizados);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <EgresosContext.Provider
            value={{
                egreso,
                egresos,
                guardarEgreso,
                setEdicionEgreso,
                eliminarEgreso
            }}
        >
            {children}
        </EgresosContext.Provider>
    )
}

export default EgresosContext;