import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from "history";

import '../index.css';
import Helmet from 'react-helmet';

import Navbar from './Navbar'
import LeerCuponPromocional from './LeerCuponPromocional'
import AsignarPuntosOVisitas from './AsignarPuntosOVisitas'
import Inicio from './Inicio'

export const appHistory = createBrowserHistory();

class BottomHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // DatosDelCliente: []
        };
    }

    componentDidMount() {
        const fetchTableData = async () => {
            // const DatosDelCliente = await this.props.DatosDelCliente[0]
            // Session.set("DatosDelCliente", JSON.stringify(DatosDelCliente));
            // Session.set("isUserAuthenticated", true);
            // this.setState({
            //     DatosDelCliente
            // })
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
                {/* <BrowserRouter basename={'/app-del-negocio'}> */}
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route exact path={`/`} element={<Inicio />} />
                        <Route exact path={`${process.env.PUBLIC_URL}`} element={<Inicio />} />
                        <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Inicio />} />
                        <Route exact path={`${process.env.PUBLIC_URL}/index.html`} element={<Inicio />} />
                        <Route exact path={`${process.env.PUBLIC_URL}/Inicio`} element={<Inicio />} />
                        <Route path={`${process.env.PUBLIC_URL}/asignar-puntos-o-visitas`} element={<AsignarPuntosOVisitas />} />
                        <Route path={`${process.env.PUBLIC_URL}/leer-cupon-promocional`} element={<LeerCuponPromocional />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default BottomHeader;
