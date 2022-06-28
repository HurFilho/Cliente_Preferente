import React from 'react';
import { NavLink } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { returnHere } from './LeerCuponPromocional'


export const appHistory = createBrowserHistory();

class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid" style={{ width: "100%" }}>
                {/* <nav className='navbar navbar-light bg-light fixed-bottom'> */}
                <nav className='navbar navbar-light fixed-bottom' style={{ backgroundColor: "#D9D9D9" }}>
                    <div className="container-fluid">
                        <div className="navbar-nav"    >
                            <NavLink className="nav-link active" to={`${process.env.PUBLIC_URL}/inicio`}>Inicio</NavLink>
                            <NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/asignar-puntos-o-visitas`}>Asignar Puntos o Visitas</NavLink>
                            <NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/leer-cupon-promocional`}>Abonar Cupón Promocional</NavLink>
                        </div>
                    </div>
                </nav >
            </div>
        )
    }
}

export default Navbar;
