import { auth, firebase } from '../firebase'

const dataInicial = {
    loading: false,
    activo: false
}

const LOADING = "LOADING"
const USUARIO_LOGIN = "USUARIO_LOGIN"
const USUARIO_LOGOUT = "USUARIO_LOGOUT"
const ERROR = "ERROR"

export default function userReducer (state=dataInicial, action){
    switch(action.type) {
        case LOADING:
            return {...state, loading: true}
        case USUARIO_LOGIN:
            return {...state, loading: false, user: action.payload, activo: true}
        case USUARIO_LOGOUT:
            return {...dataInicial}
        case ERROR:
            return {...dataInicial}
        default:
            return {...state}
    }
}

export const loginAccion = () => async(dispatch, geState) => {
    dispatch({
        type: LOADING
    })
    try{

        const provider = new firebase.auth.GoogleAuthProvider();
        const resp = await auth.signInWithPopup(provider);

        dispatch({
            type: USUARIO_LOGIN,
            payload: {
                uid: resp.user.uid,
                emai: resp.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: resp.user.uid,
            email: resp.user.email
        }))
        
    }catch(error){
        console.error(error)
        dispatch({
            type: ERROR
        })
    }
}

export const logoutAccion = () => async(dispatch, geState) => {
    try{
        auth.signOut();
        localStorage.removeItem('usuario')
        dispatch({
            type: USUARIO_LOGOUT
        })
        
    }catch(error){
        console.error(error)
        dispatch({
            type: ERROR
        })

    }
}

export const usuarioActivo = () => (dispatch, getState) => {

    if(localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_LOGIN,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}