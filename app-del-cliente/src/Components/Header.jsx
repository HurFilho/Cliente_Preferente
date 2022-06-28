import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Session from 'react-session-api'
import { createBrowserHistory } from "history";

import '../index.css';
import Helmet from 'react-helmet';

import Navbar from './Navbar'
import Cupon from './Cupons'
import Perfil from './Perfil'
import Inicio from './Inicio'

export const appHistory = createBrowserHistory();

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            DatosDelCliente: []
        };
    }

    componentDidMount() {
        const fetchTableData = async () => {
            const DatosDelCliente = await this.props.DatosDelCliente[0]
            const Promociones = await this.props.Promociones
            Session.set("DatosDelCliente", JSON.stringify(DatosDelCliente));
            Session.set("Promociones", JSON.stringify(Promociones));
            Session.set("isUserAuthenticated", true);
            this.setState({
                DatosDelCliente
            })
        }
        fetchTableData()
        // .then((data) => {
        //     if (!data) fetchTableData()
        // })
    }

    render() {
        return (
            <div>
                <Helmet>
                    <body style="display:block; align-items: center;" />
                </Helmet>
                {/* <BrowserRouter basename={'/app-del-cliente'}> */}
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route exact path={`/`} element={<Inicio />} />
                        <Route exact path={`${process.env.PUBLIC_URL}`} element={<Inicio />} />
                        <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Inicio />} />
                        <Route exact path={`${process.env.PUBLIC_URL}/index.html`} element={<Inicio />} />
                        <Route path={`${process.env.PUBLIC_URL}/inicio`} element={<Inicio />} />
                        <Route path={`${process.env.PUBLIC_URL}/perfil`} element={<Perfil />} />
                        <Route path={`${process.env.PUBLIC_URL}/cupon`} element={<Cupon />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default Header;
