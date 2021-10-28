import { useCallback, useContext, useState } from "react";
import {useDropzone} from 'react-dropzone';
import Formulario from "./Formulario";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";

const Dropzone = () => {

    const AppContext = useContext(appContext);
    const {mostrarAlerta, subirArchivo, cargando, crearEnlace} = AppContext;

    const AuthContext = useContext(authContext);
    const {usuario, autenticado} = AuthContext;

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        // console.log(acceptedFiles);        
        // crear un form-data
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);
        
        subirArchivo(formData, acceptedFiles[0].path); // .path esta el nombre original con el q se sube la img
        
    }, []);

    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir, Limite 1MB para usuarios no registrados.');
    }

    // extraer contenido de dropzone
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({ onDropAccepted, onDropRejected, maxSize : 1000000});

    const archivos = acceptedFiles.map(archivo => {
        return(
            <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
                <p className="font-bold text-xl">{archivo.path}</p>
                <p className="text-sm text-gray-500">{ ( archivo.size / Math.pow(1024, 2) ).toFixed(2) } MB</p> 
            </li>
        );
    });


    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            {acceptedFiles.length > 0 ? 
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center">Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>

                    {autenticado ? <Formulario /> : null}

                    {cargando ? 
                        <p className="my-10 text-center text-gray-600">Subiendo Archivo ....</p> 
                        :
                        <button 
                            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                            onClick={crearEnlace}
                        >Crear enlace de descarga</button>
                    }
                </div>
            :
                <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                    <input className="h-100" {...getInputProps()} />
                    {isDragActive ?  
                        <p className="text-2xl text-center text-gray-600">Sueltalo papi</p>
                    : 
                        <div className="text-center">
                            <p className="text-2xl text-center text-gray-600"> Selecciona un archivo y arrastralo aquí</p>
                            <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                            >Selecciona archivos para subir</button>
                        </div>
                    }
                </div>
            }
        </div>
    );
}
 
export default Dropzone;