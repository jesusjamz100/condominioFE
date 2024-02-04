import { useState } from "react";
import Modal from "../components/Modal";
import useIngresos from '../hooks/useIngresos';
import ReciboCard from "../components/ReciboCard";
import FormRecibo from "../components/FormRecibo";

const VerRecibos = () => {

    const { recibos, setEdicionRecibo } = useIngresos();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {recibos.length ? (
                <>
                    <p className="text-center text-3xl font-bold mb-10">Lista de recibos</p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {recibos.map( recibo => (
                            <ReciboCard recibo={recibo} key={recibo.id} />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center text-xl">No hay recibos</p>
            )}
            <button 
                className="fixed z-[10] px-3 py-2 bg-green-500 hover:bg-green-600 text-xl font-extrabold rounded-full text-white left-[95%] bottom-10"
                onClick={() => {
                    setEdicionRecibo({});
                    setIsOpen(true);
                }}
                >+</button>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormRecibo /></Modal>}
        </>
    )
}

export default VerRecibos;