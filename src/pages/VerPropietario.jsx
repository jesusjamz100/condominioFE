import { useState } from "react";
import usePropietarios from "../hooks/usePropietarios";
import axios from "axios";
import PropietarioInfo from "../components/PropietarioInfo";

const VerPropietario = () => {

    const [propietario, setPropietario] = useState({});

    const { propietarios } = usePropietarios();

    const url = import.meta.env.VITE_BACKEND_URL;

    const handleChange = async e => {
        const id = e.target.value

        try {
            const { data } = await axios(`${url}/propietarios/${id}`);
            setPropietario(data);
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            <select className="select-buscar" onChange={handleChange}>
                <option defaultValue={true}>Elegir Propietario</option>
                {propietarios.map( propietarioSelect => (
                    <option 
                        value={propietarioSelect.id} 
                        key={propietarioSelect.id}
                        >{`${propietarioSelect.id} - ${propietarioSelect.nombre} ${propietarioSelect.apellido}`}
                    </option>
                ))}
            </select>
            {propietario.id ? (
                <>
                    <PropietarioInfo
                        key={propietario.id}
                        propietario={propietario}
                    />
                </>
            ) : (
                <>
                    <p className="text-xl text-center mt-10">Seleccione un propietario para ver su información</p>
                </>
            )}
        </>
    )
}

export default VerPropietario;