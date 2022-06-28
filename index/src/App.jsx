import React from 'react';
import Helmet from 'react-helmet';
import { Routes, Route, BrowserRouter } from 'react-router-dom'

const initialData = {
    Inicio: false,
    AppDelCliente: false,
    PanelDeAdministracion: false,
    AppDelNegocio: false,
};

export async function returnToApp(data = null) {
    // this.setState(initialData);
    // if (data) {
    //     this.setState({ PanelDeAdministracion: true });
    //     if (await qrRegister(data)) {
    //     }
    // } else {
    //     this.setState({ AppDelNegocio: true });
    // }
};

export function returnToAppDelCliente() {
    this.setState(initialData);
    this.setState({ SesionActiva: true });
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Inicio: true,
            AppDelCliente: false,
            AppDelNegocio: false,
            PanelDeAdministracion: false,
        };
        returnToApp = returnToApp.bind(this);
        returnToAppDelCliente = returnToAppDelCliente.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        switch (event.target.name) {
            case "PanelDeAdministracion":
                this.setState(initialData);
                this.setState({ PanelDeAdministracion: true });
                break;
            case "AppDelCliente":
                this.setState(initialData);
                this.setState({ AppDelCliente: true });
                break;
            case "AppDelNegocio":
                this.setState(initialData);
                this.setState({ AppDelNegocio: true });
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div>
                <Helmet>
                    <body style="align-items: center;" />
                </Helmet>

                <BrowserRouter basename={'/app-del-cliente'}>
                    <Navbar DatosDelCliente={this.state.DatosDelCliente} />
                    <Routes>
                        <Route exact path={'/'} element={<Inicio />} />
                        <Route path={'inicio'} element={<Inicio />} />
                        <Route path={'perfil'} element={<Perfil />} />
                        <Route path={'cupon'} element={<Cupon />} />
                    </Routes>
                </BrowserRouter>

                {
                    this.state.Inicio &&
                    <div className="indexScreen" >
                        <div className="card" style={{ padding: "1em", margin: "1em" }}>
                            <div className="row" style={{ alignItems: "center" }}>
                                <div className="col-7 info" >PANEL DE ADMINISTRACION</div>
                                <div className="col-5" >
                                    <input type="button" onClick={this.handleChange.bind(this)} className="btn btn-outline-secondary" id="PanelDeAdministracion" name="PanelDeAdministracion" value="Abrir" style={{ width: "8em" }} />
                                </div>
                            </div>
                        </div>
                        <div className="card" style={{ padding: "1em", margin: "1em" }}>
                            <div className="row" style={{ alignItems: "center" }}>
                                <div className="col-7 info" >APP DEL CLIENTE</div>
                                <div className="col-5" >
                                    <input type="button" onClick={this.handleChange.bind(this)} className="btn btn-outline-secondary" id="AppDelCliente" name="AppDelCliente" value="Abrir" style={{ width: "8em" }} />
                                </div>
                            </div>
                        </div>
                        <div className="card" style={{ padding: "1em", margin: "1em" }}>
                            <div className="row" style={{ alignItems: "center" }}>
                                <div className="col-7 info" >APP DEL NEGÓCIO</div>
                                <div className="col-5" >
                                    <input type="button" onClick={this.handleChange.bind(this)} className="btn btn-outline-secondary" id="AppDelNegocio" name="AppDelNegocio" value="Abrir" style={{ width: "8em" }} />
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    // </div>
                }
                {
                    this.state.AppDelCliente &&
                    <div>AppDelCliente</div>
                    // <AppDelCliente />
                }
                {
                    this.state.AppDelNegocio &&
                    <div>AppDelNegocio</div>
                    // <AppDelNegocio />
                }
                {
                    this.state.PanelDeAdministracion &&
                    <div>PanelDeAdministracion</div>
                    // <PanelDeAdministracion />
                }

            </div>
        );
    }
}

export default App;