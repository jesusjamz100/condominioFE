import SaldoTotal from "../components/SaldoTotal";

const Dashboard = () => {

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex gap-4 card px-8 py-5 mb-5 rounded-lg w-full shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00abfb" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                    <input type="text" className="focus:outline-none w-full h-auto px-4 placeholder:text-xl text-lg" placeholder="Buscar en la pagina" />
                </div>
                <div className="flex gap-3">
                    <SaldoTotal />
                </div>
            </div>
        </>
    )
}

export default Dashboard