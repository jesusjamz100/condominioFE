import { createContext, useState, useEffect } from "react";
import axios from "axios";

const EgresosContext = createContext();

export const EgresosProvider = ({children}) => {

    const [egreso, setEgreso] = useState({});
    const [egresos, setEgresos] = useState([]);

    const [factura, setFactura] = useState({});
    const [facturas, setFacturas] = useState([]);

    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect( () => {
        const obtenerEgresos = async () => {
            try {
                const { data } = await axios(`${url}/egresos`);
                setEgresos(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerEgresos();
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
                setEgresos([...egresos, egresoAlmacenado]);
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
        const confirmar = confirm('Confirme que va a eliminar el egreso')

        if (confirmar) {
            try {
                const { data } = await axios.delete(`${url}/egresos/${id}`, config);
                const egresosActualizados = egresos.filter( egresoState => egresoState.id !== id);
                setEgresos(egresosActualizados);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect( () => {
        const obtenerFacturas = async () => {
            try {
                const { data } = await axios(`${url}/facturas/`);
                setFacturas(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerFacturas();
    }, [factura])

    const guardarFactura = async factura => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (factura.id) {
            try {
                const { data } = await axios.put(`${url}/facturas/${factura.id}`, factura, config);
                const facturasActualizadas = facturas.map( facturaState => facturaState.id === data.id ? data : facturaState);
                setFacturas(facturasActualizadas);
                return {
                    msg: "Factura actualizada correctamente"
                }
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                }
            }
        } else {
            try {
                const { data } = await axios.post(`${url}/facturas/`, factura, config);
                const { ...facturaAlmacenada } = data;
                setFacturas([...facturas, facturaAlmacenada]);
                return {
                    msg: "Factura almacenada correctamente"
                }
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                }
            }
        }
    }

    const setEdicionFactura = factura => {
        setFactura(factura)
    }

    const eliminarFactura = async id => {
        const confirmar = confirm('Confirme que quiere eliminar la factura');

        if (confirmar) {
            try {
                const { data } = await axios.delete(`${url}/facturas/${id}`);
                const facturasActualizadas = facturas.filter( facturaState => facturaState.id !== id);
                setFacturas(facturasActualizadas);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <EgresosContext.Provider
            value={{
                egreso,
                egresos,
                guardarEgreso,
                setEdicionEgreso,
                eliminarEgreso,
                facturas,
                factura,
                guardarFactura,
                setEdicionFactura,
                eliminarFactura
            }}
        >
            {children}
        </EgresosContext.Provider>
    )
}

export default EgresosContext;