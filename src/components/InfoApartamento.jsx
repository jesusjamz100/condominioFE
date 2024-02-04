import axios from "axios";
import { useEffect, useState } from "react";

const InfoApartamento = ({apartamento, propietario}) => {

    const [piso, setPiso] = useState({});
    const [torre, setTorre] = useState({});

    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect( () => {
        const obtenerPiso = async () => {
            try {
                const { data } = await axios(`${url}/pisos/${apartamento.piso_id}`);
                setPiso(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPiso();
    }, [])

    useEffect( () => {
        const obtenerTorre = async () => {
            try {
                const { data } = await axios(`${url}/torres/${piso.torre_id}`)
                setTorre(data);
            } catch (error) {
                console.log(error)
            }
        };
        obtenerTorre();
    }, [piso])

    return (
        <div className="w-full card rounded-lg shadow-lg p-5">
            <p className="text-xl text-center font-bold mb-4">Apartamento {apartamento.codigo}</p>
            <p className="text-lg text-center font-semibold">Propietario:</p>
            <p className="text-lg text-center mb-3">{propietario.nombre} {propietario.apellido}</p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-center">
                <p className="text-lg text-center font-semibold">Piso:</p>
                <p className="text-lg text-center md:mb-0">{piso.numero}</p>
                <p className="text-lg text-center font-semibold">Torre:</p>
                <p className="text-lg text-center md:mb-0">{torre.letra}</p>
            </div>
        </div>
    )
}

export default InfoApartamento;