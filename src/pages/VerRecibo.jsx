import useCuentas from "../hooks/useCuentas";
import useIngresos from "../hooks/useIngresos";
import usePropietarios from "../hooks/usePropietarios";

const VerRecibo = () => {

    const { recibos, ingresos } = useIngresos();
    const { propietarios } = usePropietarios();
    const { cuentas } = useCuentas();

    const handleChange = (e) => {

    }

    return (
        <>
            {/* <select className="select-buscar" name="ingreso" id="ingreso"
                onChange={handleChange}>
                <option value="0">Elegir Recibo</option>
                {recibos.map( recibo => (
                    <option key={recibo.id} value={recibo.id}>{recibo.id} - Ingreso: {}</option>
                ))}
            </select> */}
        </>
    )
}

export default VerRecibo;