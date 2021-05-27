import React, {useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { loginAccion } from '../redux/usuarioDucks';
import { withRouter } from 'react-router';

const Login = (props) => {
    const dispatch = useDispatch();
    const loading = useSelector(store => store.usuario.loading)
    const activo = useSelector(store => store.usuario.activo)

    useEffect(() => {
        if(activo){
            props.history.push('/')
        }
    }, [activo])

    return (
        <div className="mt-5 text-center">
            <h3 className="display-3">Ingreso de usuarios</h3>
            <hr/>
            <button className="btn btn-primary"
                onClick={()=> dispatch(loginAccion())}
                disabled={loading}
                >
                <i className="fab fa-google me-2"></i>
                Google
            </button>
        </div>
    )
}

export default withRouter(Login)
