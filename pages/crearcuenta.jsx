import Layout from "../components/Layout";
import { useContext, useEffect } from "react";
import {useRouter} from 'next/router';
import authContext from "../context/auth/authContext";
import Alerta from '../components/Alerta';
// formik y yup para validar formularios
import { useFormik } from 'formik';
import * as Yup from 'yup';


const CrearCuenta = () => {
    // leer el context
    const AuthContext = useContext(authContext);
    const {registrarUsuario, mensaje, autenticado} = AuthContext;

    // next router
    const router = useRouter();

    useEffect(() =>{
        if (autenticado) {
            router.push('/');
        }
    }, [autenticado]);

    // Formulario y validacion con Formik y Yup
    const formik = useFormik({
        initialValues : {
            nombre: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            email: Yup.string().required('El email es obligatorio').email('Email ingresado no valido'),
            password: Yup.string().required('El nombre es obligatorio').min(6, 'El password debe contener almenos 6 caracteres'),
        }),
        onSubmit: (valores) => {
            registrarUsuario(valores);
        }
    });



    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">

                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crear Cuenta</h2>
                {mensaje ? <Alerta /> :null}

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form onSubmit={formik.handleSubmit} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label htmlFor="nombre" className="block text-black text-sm font-bold mb-2">
                                    Nombre
                                </label>
                                <input type="text" id="nombre" value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre de Usuario" />
                                {formik.touched.nombre && formik.errors.nombre ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-2">
                                        <p className="font-bold">Error : {formik.errors.nombre}</p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input type="text" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email de Usuario" />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-2">
                                        <p className="font-bold">Error : {formik.errors.email}</p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password de Usuario" />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-2">
                                        <p className="font-bold">Error : {formik.errors.password}</p>
                                    </div>
                                ) : null}
                            </div>

                            <input type="submit" value="Enviar" className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold" />

                        </form>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default CrearCuenta;
