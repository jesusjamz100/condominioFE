import { BrowserRouter, Route, Routes } from "react-router-dom";
import CondoLayout from "./layout/CondoLayout";
import Dashboard from "./pages/Dashboard";
import VerPropietarios from "./pages/VerPropietarios";
import { PropietariosProvider } from "./context/PropietariosProvider";
import VerPropietario from "./pages/VerPropietario";
import VerCuentas from "./pages/VerCuentas";
import { CuentasProvider } from "./context/CuentasProvider";
import VerCuenta from "./pages/VerCuenta";
import VerIngresos from "./pages/VerIngresos";
import { IngresosProvider } from "./context/IngresosProvider";
import VerIngreso from "./pages/VerIngreso";
import VerRecibos from "./pages/VerRecibos";
import VerRecibo from "./pages/VerRecibo";
import VerEgresos from "./pages/VerEgresos";

function App() {

    return (
        <>
            <BrowserRouter>
                <PropietariosProvider>
                    <CuentasProvider>
                        <IngresosProvider>
                            <Routes>
                                <Route path="/" element={<CondoLayout />}>
                                    <Route index element={<Dashboard />} />
                                    <Route path="/propietarios" element={<VerPropietarios />} />
                                    <Route path="/buscar-propietario" element={<VerPropietario />} />
                                    <Route path="/cuentas" element={<VerCuentas />} />
                                    <Route path="/buscar-cuenta" element={<VerCuenta />} />
                                    <Route path="/ingresos" element={<VerIngresos />} />
                                    <Route path="/buscar-ingreso" element={<VerIngreso />} />
                                    <Route path="/recibos" element={<VerRecibos />} />
                                    <Route path="/buscar-recibo" element={<VerRecibo />} />
                                    <Route path="/egresos" element={<VerEgresos />} />
                                </Route>
                            </Routes>
                        </IngresosProvider>
                    </CuentasProvider> 
                </PropietariosProvider>
            </BrowserRouter>
        </>
    )
}

export default App
