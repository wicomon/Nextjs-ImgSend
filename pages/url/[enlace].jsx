import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Alerta from "../../components/Alerta";
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import appContext from "../../context/app/appContext";

export async function getInitialPaths() {
    const enlaces = await clienteAxios.get("/api/enlaces");
    // console.log(enlaces);
    return {
        fallback: false,
    };
}

const Enlace = () => {
    const router = useRouter();
    const {
        query: { enlace },
    } = router;

    // console.log(enlace);

    const [url, setUrl] = useState(enlace);
    const [error, guardarError] = useState(false);
    const [existePassword, setExistePassword] = useState(); //enlace.password
    const [password, setPassword] = useState("");
    
    const AppContext = useContext(appContext);
    const { mostrarAlerta, mensaje_archivo } = AppContext;

    useEffect(() => {
        if(enlace){
            const obtenerProducto = async () => {
                try {
                    // console.log(enlace);
                    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
                    // console.log(resultado);
                    setUrl(resultado.data);
                    setExistePassword(resultado.data.password);
                    guardarError(true);
                } catch (error) {
                    guardarError(false);
                }
            };
            obtenerProducto();
        }
    },[enlace]);

    // console.log(existePassword);

    const verificarPassword = async (e) => {
        e.preventDefault();
        const data = {
            password,
        };
        try {
            const respuesta = await clienteAxios.post(`/api/enlaces/${enlace}`, data);
            setExistePassword(respuesta.data.password);
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
    };

    return (
        <Layout>
            {error ? 
            <>
                {existePassword ? (
                    <>
                        {mensaje_archivo && <Alerta />}
                        <p className="text-center text-2xl">
                            Enlace portegido por contraseña
                        </p>
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form
                                    onSubmit={(e) => verificarPassword(e)}
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                >
                                    <div className="mb-4">
                                        <label
                                            htmlFor="password"
                                            className="block text-black text-sm font-bold mb-2"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Contraseña del archivo"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        value="Enviar"
                                        className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">
                            Descarga tu archivo :{" "}
                        </h1>
                        <div className="flex items-center justify-center mt-10">
                            <a
                                href={`${process.env.backendURL}/api/archivos/${url.archivo}`}
                                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                            >
                                Aquí
                            </a>
                        </div>
                    </>
                )}
            </>
            :'cargando'}
        </Layout>
    );
};


export default Enlace;
