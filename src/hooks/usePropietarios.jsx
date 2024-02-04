import { useContext } from "react";
import PropietariosContext from "../context/PropietariosProvider";

const usePropietarios = () => {
    return useContext(PropietariosContext);
}

export default usePropietarios;