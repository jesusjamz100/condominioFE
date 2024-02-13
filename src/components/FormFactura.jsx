import { useState, useEffect } from "react";
import useEgresos from "../hooks/useEgresos";
import Alerta from "./Alerta";

const FormFactura = () => {

    const [id, setId] = useState(null);
    const [fecha, setFecha] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [egresoId, setEgresoId] = useState(0);

    const [alerta, setAlerta] = useState({});

    const { egresos, factura, guardarFactura } = useEgresos();

    useEffect( () => {
        if (factura.id) {
            setId(factura.id);
            setFecha(factura.fecha);
            setCantidad(factura.cantidad);
            setEgresoId(factura.egreso_id);
        }
    }, [factura])

    const handleSubmit = async e => {
        e.preventDefault();
        
        if ([fecha, cantidad, egresoId].includes('')) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true });
            setTimeout(() => setAlerta({}), 3000);
        }

        const resultado = await guardarFactura({ id, fecha, cantidad, egreso_id: egresoId });
        setAlerta(resultado);
        if (resultado.error) {
            setTimeout(() => setAlerta({}), 3000);
            return;
        }

        setTimeout(() => setAlerta({}), 3000);

        setId(null);
        setFecha('');
        setCantidad(0);
        setEgresoId(0);
    }

    const { msg } = alerta;

    return (
        <div>FormFactura</div>
    )
}

export default FormFactura