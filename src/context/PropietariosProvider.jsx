import { createContext, useState, useEffect } from "react";
import axios from "axios";

const PropietariosContext = createContext();

export const PropietariosProvider = ({children}) => {
    const [propietarios, setPropietarios] = useState([]);
    const [propietario, setPropietario] = useState({});

    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect( () => {
        const obtenerPropietarios = async () => {
            try {
                const { data } = await axios(`${url}/propietarios`);
                setPropietarios(data);
            } catch (error) {
                console.log(error)
            }
        };
        obtenerPropietarios();
    }, [propietario])

    const guardarPropietario = async propietario => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        if (propietario.id) {
            try {
                const { data } = await axios.put(`${url}/propietarios/${propietario.id}`, propietario, config);
                const propietarioActualizado = propietarios.map( propietarioState => propietarioState.id === data.id ? data : propietarioState);
                setPropietario(propietarioActualizado);
                return {
                    msg: "Propietario actualizado correctamente"
                }
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                };
            }
        } else {
            try {
                const { data } = await axios.post(`${url}/propietarios`, propietario, config);
                const {...propietarioAlmacenado} = data;
                setPropietarios([...propietarios, propietarioAlmacenado]);
                return {
                    msg: "Propietario creado correctamente"
                }
            } catch (error) {
                return {
                    msg: error.response.data.message,
                    error: true
                };
            }
        }
    }

    const setEdicion = propietario => {
        setPropietario(propietario);
    }

    const eliminarPropietario = async id => {
        const confirmar = confirm('Por favor confirme que desea eliminar al propietario');

        if (confirmar) {
            try {
                const { data } = await axios.delete(`${url}/propietarios/${id}`)
                const propietariosActualizados = propietarios.filter( propietariosState => propietariosState.id !== id);
                setPropietarios(propietariosActualizados);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PropietariosContext.Provider
        value={{
            propietarios,
            propietario,
            eliminarPropietario,
            setEdicion,
            guardarPropietario
        }}
        >
            {children}
        </PropietariosContext.Provider>
    )
}

export default PropietariosContext;