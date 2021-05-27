import React from 'react'
import { NavLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { logoutAccion } from '../redux/usuarioDucks'
import { withRouter } from 'react-router'

const NavBar = (props) => {
    const dispatch = useDispatch()
    const activo = useSelector(state => state.usuario.activo)

    const cerrarSesion = () => {
        dispatch(logoutAccion())
        props.history.push('/login')
    }

    return (
        <div className="container-fluid navbar navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand">Poke API</NavLink>
            <div>
                <div className="d-flex">
                    <NavLink 
                        className="btn btn-dark mx-1" 
                        to="/"
                        exact
                        hidden={!activo}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        className="btn btn-dark mx-1" 
                        to="/login"
                        exact
                        hidden={activo}
                    >
                        Login
                    </NavLink>
                    <button
                        className="btn btn-dark mx-1"
                        onClick={()=> cerrarSesion()}
                        hidden={!activo}
                    >
                        cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(NavBar)
