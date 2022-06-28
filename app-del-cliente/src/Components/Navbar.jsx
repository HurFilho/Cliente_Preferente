import React from 'react';
import { NavLink } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { returnHome } from './Inicio'


export const appHistory = createBrowserHistory();

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.updatePage = this.updatePage.bind(this);
    }

    updatePage() {
        returnHome()
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                {/* <nav className='navbar navbar-light bg-light fixed-bottom'> */}
                <nav className='navbar navbar-light fixed-bottom' style={{ backgroundColor: "#D9D9D9" }}>
                    <div className="container-fluid">
                        <div className="navbar-nav" >
                            <NavLink className="nav-link active" to={`${process.env.PUBLIC_URL}/inicio`} onClick={this.updatePage}>Inicio</NavLink>
                            <NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/perfil`}>Perfil</NavLink>
                            <NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/cupon`}>Coupons</NavLink>
                        </div>
                    </div>
                </nav >
            </div>
        )
    }
}

export default Navbar;
