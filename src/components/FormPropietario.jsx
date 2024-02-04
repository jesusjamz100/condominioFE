import { useEffect, useState } from "react";
import usePropietarios from "../hooks/usePropietarios";
import Alerta from "./Alerta";

const FormPropietario = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({})

    const { propietario, guardarPropietario } = usePropietarios();

    useEffect( () => {
        if (propietario?.nombre) {
            setNombre(propietario.nombre);
            setApellido(propietario.apellido);
            setEmail(propietario.email);
            setId(propietario.id);
        }
    }, [propietario])

    const handleSubmit = async e => {
        e.preventDefault();
        
        // Validar el formulario
        if ([nombre, apellido, email].includes('')) {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true})
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            return
        }

        const resultado = await guardarPropietario({nombre, apellido, email, id});
        setAlerta(resultado);
        if (resultado.error) {
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            return;
        }

        setTimeout(() => {
            setAlerta({});
        }, 3000);

        setNombre('');
        setApellido('');
        setEmail('');
        setId(null);
        
    }

    const {msg} = alerta;

    return (
        <div className="flex flex-col items-center">
            {msg && (
                <Alerta 
                    alerta={alerta}
                />
            )}
            <h2 className="text-lg text-center font-bold mb-5">{id ? 'Actualizar propietario' : 'Agregar propietario'}</h2>
            <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                <label htmlFor="nombre" className="text-md mb-3 font-semibold">Nombre:</label>
                <input type="text" name="nombre" id="nombre" className="form-input" value={nombre} onChange={e => setNombre(e.target.value)} />
                <label htmlFor="apellido" className="text-md mb-3 font-semibold">Apellido:</label>
                <input type="text" name="apellido" id="apellido" className="form-input" value={apellido} onChange={e => setApellido(e.target.value)} />
                <label htmlFor="email" className="text-md mb-3 font-semibold">Email:</label>
                <input type="email" name="email" id="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
                <input
					className="bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-800 cursor-pointer transition-colors rounded-lg max-w-fit self-center mt-3"
					type="submit"
					value={id ? 'Editar Propietario' : 'Agregar Propietario'}
				/>
            </form>
        </div>
    )
}

export default FormPropietario