import { useContext } from "react";
import EgresosContext from "../context/EgresosProvider";

const useEgresos = () => {
    return useContext(EgresosContext);
}

export default useEgresos;