import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormPropietario from "../components/FormPropietario";

const CondoLayout = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen">
                <Header />  
                <main className="flex flex-col p-5 w-full h-screen overflow-auto basis-full md:basis-3/4">
                    <div className="mb-5">
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </div>
        </>
    )
}

export default CondoLayout