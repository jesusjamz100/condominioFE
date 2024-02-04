import { useContext } from "react";
import IngresosContext from "../context/IngresosProvider";

const useIngresos = () => {
    return useContext(IngresosContext);
}

export default useIngresos;