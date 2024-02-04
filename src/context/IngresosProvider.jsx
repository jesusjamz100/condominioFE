import axios from "axios";
import { createContext, useEffect, useState } from "react";

const IngresosContext = createContext();

export const IngresosProvider = ({children}) => {

    const [ingreso, setIngreso] = useState({});
    const [ingresos, setIngresos] = useState([]);

    const [recibo, setRecibo] = useState({});
    const [recibos, setRecibos] = useState([]);

    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect( () => {
        const obtenerIngresos = async () => {
            try {
                const { data } = await axios(`${url}/ingresos`);
                setIngresos(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerIngresos();
    }, [ingreso])

    const guardarIngreso = async ingreso => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (ingreso.id) {
            try {
                const { data } = await axios.put(`${url}/ingresos/${ingreso.id}`, ingreso, config);
                const ingresoActualizado = ingresos.map( ingresoState => ingresoState.id === ingreso.id ? data : ingresoState);
                setIngreso(ingresoActualizado);
                return {
                    msg: 'Ingreso actualizado correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                }
            }
        } else {
            try {
                const { data } = await axios.post(`${url}/ingresos`, ingreso, config);
                const { ...ingresoAlmacenado } = data;
                setIngresos([...ingresos, ingresoAlmacenado]);
                return {
                    msg: 'Ingreso agregado correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                }
            }
        }
    }

    const setEdicionIngreso = ingreso => {
        setIngreso(ingreso);
    }

    const eliminarIngreso = async id => {
        const confirmar = confirm('¿Desea eliminar este ingreso?');

        if (confirmar) {
            try {
                const { data } = await axios.delete(`${url}/ingresos/${id}`);
                const ingresosActualizados = ingresos.filter( ingresoState => ingresoState.id !== id);
                setIngresos(ingresosActualizados);
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect( () => {
        const obtenerRecibos = async () => {
            try {
                const { data } = await axios(`${url}/recibos`);
                setRecibos(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerRecibos();
    }, [recibo])

    const guardarRecibo = async recibo => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (recibo.id) {
            try {
                const { data } = await axios.put(`${url}/recibos/${recibo.id}`, recibo, config);
                const reciboActualizado = recibos.map( reciboState => reciboState.id === recibo.id ? data : reciboState);
                setRecibos(reciboActualizado);
                return {
                    msg: 'El recibo fue actualizado correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                }
            }
        } else {
            try {
                const { data } = await axios.post(`${url}/recibos/`, recibo, config);
                const {...reciboAlmacenado} = data;
                setRecibos([...recibos, reciboAlmacenado]);
                return {
                    msg: 'El recibo fue creado correctamente'
                }
            } catch (error) {
                console.log(error);
                return {
                    msg: error.response.data.message,
                    error: true
                }
            }
        }
    }

    const setEdicionRecibo = recibo => {
        setRecibo(recibo);
    }

    const eliminarRecibo = async id => {
        const confirmar = confirm('¿Desea eliminar este ingreso?');

        if (confirmar) {
            try {
                const { data } = await axios.delete(`${url}/recibos/${id}`);
                const recibosActualizados = recibos.filter( reciboState => reciboState.id !== id);
                setRecibos(recibosActualizados);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <IngresosContext.Provider
            value={{
                ingreso,
                ingresos,
                eliminarIngreso,
                guardarIngreso,
                setEdicionIngreso,
                recibo,
                recibos,
                eliminarRecibo,
                guardarRecibo,
                setEdicionRecibo
            }}
        >
            {children}
        </IngresosContext.Provider>
    )
}

export default IngresosContext;