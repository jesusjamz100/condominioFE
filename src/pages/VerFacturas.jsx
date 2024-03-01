import { useState } from "react";
import Modal from "../components/Modal";
import useEgresos from "../hooks/useEgresos";
import FormFactura from "../components/FormFactura";
import FacturaCard from "../components/FacturaCard";

const VerFacturas = () => {

    const { facturas, setEdicionFactura } = useEgresos();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {facturas.length ? (
                <>
                    <p className="text-center text-3xl font-bold mb-10">Lista de facturas</p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {facturas.map( factura => (
                            <FacturaCard factura={factura} key={factura.id} />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center text-xl">No hay facturas</p>
            )}
            <button 
                className="fixed z-[10] px-3 py-2 bg-green-500 hover:bg-green-600 text-xl font-extrabold rounded-full text-white left-[95%] bottom-10"
                onClick={() => {
                    setEdicionFactura({});
                    setIsOpen(true);
                }}
                >+</button>
            {isOpen && <Modal setIsOpen={setIsOpen}><FormFactura /></Modal>}
        </>
    )
}

export default VerFacturas