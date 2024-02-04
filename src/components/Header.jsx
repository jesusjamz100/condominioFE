import { useState } from "react";
import { Link} from "react-router-dom";
import Submenu from "./Submenu";
import Modal from "./Modal";
import FormPropietario from "./FormPropietario";
import FormCuenta from "./FormCuenta";
import usePropietarios from "../hooks/usePropietarios";
import useCuentas from "../hooks/useCuentas";

const Header = () => {

    const [propietarios, setPropietarios] = useState(false);
    const [cuentas, setCuentas] = useState(false);
    const [ingresos, setIngresos] = useState(false);
    const [egresos, setEgresos] = useState(false);

    const [isOpenPropietarios, setIsOpenPropietarios] = useState(false);
    const [isOpenCuentas, setIsOpenCuentas] = useState(false);

    const { setEdicion } = usePropietarios();
    const { setEdicionCuenta } = useCuentas();

    return (
        <>
            <div className="md:hidden mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width={44} height={44} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 6l16 0" />
                    <path d="M4 12l16 0" />
                    <path d="M4 18l16 0" />
                </svg>
            </div>
            <div className="md:flex flex-col min-h-full bg-white shadow-md min-w-fit basis-1/4 hidden bottom-0 pb-auto">
                <header>
                    <p className="text-blue-600 text-3xl mt-5 mx-10 font-bold text-center">Valle Jardin</p>
                </header>
                <div className="mt-5 mx-5"
                >
                    <div className="hover:shadow hover:transition hover:duration-300 hover:translate-x-3 hover:bg-gray-100 rounded-md select-none py-3">
                        <Link
                            to="/"
                            className="w-full text-xl text-gray-400 font-bold px-2 mx-2"
                            >Dashboard
                        </Link>
                    </div>
                    <Submenu
                        onMouseEnter={() => setPropietarios(true)}
                        onMouseLeave={() => setPropietarios(false)}
                        titulo="Propietarios">
                        <Link to="/propietarios" className={`${propietarios ? 'sidebar-submenu-link' : 'hidden'} text-lg text-gray-400`}>
                            Ver Propietarios
                        </Link>
                        <Link to="/buscar-propietario" className={`${propietarios ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Buscar Propietario
                        </Link>
                        <Link
                            className={`${propietarios ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}
                            onClick={() => {
                                setEdicion({});
                                setIsOpenPropietarios(true);
                            }}
                            >Crear Propietario
                        </Link>
                    </Submenu>
                    <Submenu
                        onMouseEnter={() => setCuentas(true)}
                        onMouseLeave={() => setCuentas(false)}
                        titulo='Cuentas'>
                        <Link to='/cuentas' className={`${cuentas ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Ver Cuentas
                        </Link>
                        <Link to='/buscar-cuenta' className={`${cuentas ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Buscar Cuenta
                        </Link>
                        <Link
                            className={`${cuentas ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}
                            onClick={ () => {
                                setEdicionCuenta({});
                                setIsOpenCuentas(true);
                            }}
                            >Crear Cuenta
                        </Link>
                    </Submenu>
                    <Submenu
                        onMouseEnter={() => setIngresos(true)}
                        onMouseLeave={() => setIngresos(false)}
                        titulo="Ingresos">
                        <Link to='/ingresos' className={`${ingresos ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Ver Ingresos
                        </Link>
                        <Link to='/buscar-ingreso' className={`${ingresos ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Buscar Ingreso
                        </Link>
                        <Link to='/recibos' className={`${ingresos ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Ver Recibos
                        </Link>
                        <Link to='/buscar-recibo' className={`${ingresos ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Buscar Recibo
                        </Link>
                    </Submenu>
                    <Submenu
                        onMouseEnter={() => setEgresos(true)}
                        onMouseLeave={() => setEgresos(false)}
                        titulo="Egresos">
                        <Link to='/egresos' className={`${egresos ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Ver Egresos
                        </Link>
                        <Link className={`${egresos ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Buscar Egreso
                        </Link>
                        <Link className={`${egresos ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Ver Facturas
                        </Link>
                        <Link className={`${egresos ? 'sidebar-submenu-link' : 'hidden'}  text-lg text-gray-400`}>
                            Buscar Factura
                        </Link>
                    </Submenu>
                </div>
            </div>
            {isOpenPropietarios && <Modal setIsOpen={setIsOpenPropietarios}><FormPropietario /></Modal>}
            {isOpenCuentas && <Modal setIsOpen={setIsOpenCuentas}><FormCuenta /></Modal>}
        </>
    )
}

export default Header