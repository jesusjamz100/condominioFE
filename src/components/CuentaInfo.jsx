
const CuentaInfo = ({cuenta}) => {

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-VE', {dateStyle: 'short'}).format(nuevaFecha);
    };

    return (
        <>
            <div className="flex flex-col w-[60%] lg:w-[40%] gap-5 card rounded-lg py-6 shadow-lg items-center px-10 mx-auto">
                <p className="text-red-500 text-2xl w-full text-center">ID #{cuenta.id}</p>
                <div className="flex flex-row gap-5 md:flex-col">
                    <p className="text-2xl text-center">{cuenta.nombre}</p>
                    <p className="text-2xl text-center">${cuenta.saldo}</p>
                </div>
            </div>
            <br />
            <p className="text-center text-2xl font-semibold">Transacciones</p>
            <br />
            <div className="flex flex-col md:flex-row gap-5 justify-center">
                <div className="card w-full rounded-lg shadow-md p-5">
                    <p className="text-center text-xl font-semibold mb-5">Ingresos</p>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-md">ID</th>
                                <th className="text-md">Descripcion</th>
                                <th className="text-md">Cantidad</th>
                                <th className="text-md">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuenta.ingresos.map( ingreso => (
                                <tr key={ingreso.id} className="text-center">
                                    <td>{ingreso.id}</td>
                                    <td>{ingreso.descripcion}</td>
                                    <td>{ingreso.recibo ? `$${ingreso.recibo.cantidad}` : 'Sin recibo'}</td>
                                    <td>{ingreso.recibo ? formatearFecha(ingreso.recibo.fecha) : 'Sin recibo'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card w-full rounded-lg shadow-md p-5">
                    <p className="text-center text-xl font-semibold mb-5">Egresos</p>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-md">ID</th>
                                <th className="text-md">Descripcion</th>
                                <th className="text-md">Cantidad</th>
                                <th className="text-md">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuenta.egresos.map( egreso => (
                                <tr key={egreso.id} className="text-center">
                                    <td>{egreso.id}</td>
                                    <td>{egreso.descripcion}</td>
                                    <td>{egreso.factura ? `$${egreso.recibo.cantidad}` : 'Sin factura'}</td>
                                    <td>{egreso.factura ? formatearFecha(egreso.recibo.fecha) : 'Sin factura'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CuentaInfo;