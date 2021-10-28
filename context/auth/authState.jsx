import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { USUARIO_AUTENTICADO, REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA,
    LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from "../../types";

import clienteAxios from '../../config/axios';
import tokenAuth from "../../config/tokenAuth";

const AuthState = (props) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    // definir el state inicial
    const initialState = {
        // token : typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        token : token,
        autenticado : null,
        usuario : null,
        mensaje: null
    }

    // definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // registrar nuevos usuarios
    const registrarUsuario = async(datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            // console.log(respuesta);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            // console.log(error.response.data.msg);
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response ? error.response.data.msg : 'Hubo un error'
            });
        }
        // Limpiar alerta
        setTimeout(() =>{
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
    }

    // autenticar usuarios
    const iniciarSesion = async(datos) =>{
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            // console.log(respuesta.data.msg);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            // console.log(error.response.data);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response ? error.response.data.msg : 'Hubo un error'
            });
        }
        // Limpiar alerta
        setTimeout(() =>{
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
        
    }

    // usuario autenticado
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta);
            if (respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                })
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response ? error.response.data.msg : 'Hubo un error'
            });
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION,
        });
    }
    return (
        <authContext.Provider
            value={{
                token : state.token,
                autenticado : state.autenticado,
                usuario : state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}
 
export default AuthState;
