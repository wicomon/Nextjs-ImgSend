import { useContext, useState } from "react";
import appContext from "../context/app/appContext";


const Formulario = () => {

    const AppContext = useContext(appContext);
    const {agregarPassword, agregarDescargas} = AppContext;

    const [password, setPassword] = useState(false);

    return (
        <div className="w-full mt-20">
            <div>
                <label htmlFor="" className="text-lg text-gray-800">Eliminar tras : </label>
                <select 
                    defaultValue={''} 
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    onChange={e => agregarDescargas(parseInt(e.target.value))}
                >
                    <option value="" disabled>--Seleccione--</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="20">20 Descargas</option>
                </select>

                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="" className="text-lg text-gray-800 mr-2">Proteger con Contraseña : </label>
                        <input 
                            type="checkbox" 
                            className="form-checkbox text-pink-600 h-6 w-6" 
                            onChange={() => setPassword(!password)}
                        />
                    </div>
                    {password ?  
                        <input
                            type="password" 
                            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500" 
                            onChange={ e => agregarPassword(e.target.value) }
                        />
                    
                    : 
                        null
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Formulario;