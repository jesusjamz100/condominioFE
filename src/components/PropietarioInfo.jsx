import axios from "axios";
import { useEffect, useState } from "react";
import InfoApartamento from "./InfoApartamento";


const PropietarioInfo = ({propietario}) => {
    
    const [apartamento, setApartamento] = useState({});
    const [recibo, setRecibo] = useState({});

    const url = import.meta.env.VITE_BACKEND_URL;

    // useEffect( () => {
    //     setApartamento({});
    //     setRecibo({});
    // }, [propietario])

    const handleChangeApartamentos = async e => {
        const id = e.target.value;
        try {
            const { data } = await axios(`${url}/apartamentos/${id}`);
            setApartamento(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeRecibos = async e => {
        const id = e.target.value;
        try {
            const { data } = await axios(`${url}/recibos/${id}`);
            setRecibo(data);
        } catch (error) {
            console.log(error)
        }   
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-evenly w-full gap-10 card rounded-lg py-6 shadow-lg items-center px-10">
                <div className="flex flex-col w-full">
                    <p className="text-red-500 text-2xl w-full mb-2">ID #{propietario.id}</p>
                    <p className="text-lg"><span className="font-bold">Nombre: </span>{propietario.nombre}</p>
                    <p className="text-lg"><span className="font-bold">Apellido: </span>{propietario.apellido}</p>
                    <p className="text-lg"><span className="font-bold">Email: </span>{propietario.email}</p>
                </div>
                <div className="flex flex-col w-full">
                    <p className="text-lg font-bold">Apartamentos</p>
                    <select className="bg-gray-200 p-2 rounded-lg text-md my-3" onChange={handleChangeApartamentos}>
                        <option defaultChecked value='0'>Seleccionar Apartamento</option>
                        {propietario.apartamentos.map( apartamentoSelect => (
                            <option
                                key={apartamentoSelect.id}
                                value={apartamentoSelect.id}
                                >{apartamentoSelect.codigo}
                            </option> 
                        ))}
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <p className="text-lg font-bold">Recibos</p>
                    <select className="bg-gray-200 p-2 rounded-lg text-md my-3" onChange={handleChangeRecibos}>
                        <option value="0">Seleccionar Recibo</option>
                        {propietario.recibos.map( reciboSelect => (
                            <option
                                key={reciboSelect.id}
                                value={reciboSelect.id}
                                >$ {reciboSelect.cantidad}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex mt-5 justify-evenly w-full gap-10">
                {apartamento.id ? (
                    <InfoApartamento 
                        key={apartamento.id}
                        apartamento={apartamento}
                        propietario={propietario}
                    />
                ) : (
                    <p className="text-lg font-semibold w-full text-center">Seleccione un apartamento para ver la información</p>
                )}
                {recibo.id ? (
                    <div className="w-full card rounded-lg shadow-lg p-5">
                        Hola
                    </div>
                ) : (
                    <p className="text-lg font-semibold w-full text-center">Seleccione un recibo para ver la información</p>
                )}
            </div>
        </>
    )
}

export default PropietarioInfo;