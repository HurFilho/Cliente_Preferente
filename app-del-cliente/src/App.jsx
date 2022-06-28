import React from 'react';
import Login from './Components/Login'
import RegistroCompleto from './Components/RegistroCompleto'
import Header from './Components/Header'
import QrContainer from './Components/LeitorDeCuponQR'
import { qrRegister } from './Components/RegistroCompleto'

const initialData = {
    Login: false,
    NuevoRegistro: false,
    TerminaRegistro: false,
    LerCodigoQR: false,
    SesionActiva: false,
}

export async function returnToApp(data = null) {
    this.setState(initialData);
    if (data) {
        this.setState({ TerminaRegistro: true });
        if (await qrRegister(data)) {
        }
    } else {
        this.setState({ Login: true });
    }
}

export function returnToAppDelCliente(datosDelCliente, promociones) {
    this.setState({ DatosDelCliente: datosDelCliente })
    this.setState({ Promociones: promociones })
    this.setState({ Login: false });
    this.setState({ SesionActiva: true });
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Login: true,
            SesionActiva: false,
            // Login: false,
            // SesionActiva: true,
            LerCodigoQR: false,
            LimpaTela: false,
            NuevoRegistro: false,
            TerminaRegistro: false,
            DatosDelCliente: [],
            Promociones: [],
        }
        returnToApp = returnToApp.bind(this);
        returnToAppDelCliente = returnToAppDelCliente.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        switch (event.target.name) {
            case "LerCodigoQR":
                this.setState(initialData);
                this.setState({ LerCodigoQR: true });
                this.setState({ LimpaTela: true });
                break;
            case "NuevoRegistro":
                this.setState(initialData);
                this.setState({ NuevoRegistro: true });
                break;
            case "Login":
                this.setState(initialData);
                this.setState({ Login: true });
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <>
                {
                    this.state.Login &&
                    <>
                        <div name="loginScreen" id="loginScreen">
                            <div className="card appScreen">
                                <Login />
                                {/* <div className="card align-mid" style={{ padding: ".4em", margin: ".6em 0 .6em 0" }}>
                                    <div className="row align-mid" style={{ display: "table", verticalAlign: "middle" }}>
                                        <div className="col-7 info" style={{ display: "table-cell" }}>¿Tienes un codigo QR?</div>
                                        <div className="col-5" style={{ display: "table-cell" }}>
                                            <input type="button" onClick={this.handleChange.bind(this)} className="btn btn-outline-secondary" id="LerCodigoQR" name="LerCodigoQR" value="Leer el codigo" style={{ width: "100%", fontSize: ".8em", fontWeight: "600" }} />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="container card" style={{ padding: ".4em", margin: ".6em 0 .6em 0" }}>
                                    <div className="row align-mid" style={{ display: "table", verticalAlign: "middle" }}>
                                        <div className="col-7 info" style={{ display: "table-cell" }}>¿No tienes una cuenta?</div>
                                        <div className="col-5" style={{ display: "table-cell" }}>
                                            <input type="button" onClick={(e) => this.handleChange(e)} className="btn btn-outline-secondary" id="NuevoRegistro" name="NuevoRegistro" value="Regístrate" style={{ width: "100%", fontSize: ".8em", fontWeight: "600" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    this.state.NuevoRegistro &&
                    <div name="nuevoRegistro" id="nuevoRegistro">
                        <div className="card appScreen">
                            <RegistroCompleto />
                        </div>
                    </div>
                }
                {
                    this.state.TerminaRegistro &&
                    <div name="terminaRegistro" id="terminaRegistro">
                        <div className="card appScreen">
                            <RegistroCompleto />
                        </div>
                    </div>
                }
                {
                    this.state.SesionActiva &&
                    <div name="sesionActiva" id="sesionActiva" style={{ minWidth: "290px" }}>
                        <Header DatosDelCliente={this.state.DatosDelCliente} Promociones={this.state.Promociones} />
                    </div>
                }
                {
                    this.state.LerCodigoQR &&
                    <QrContainer />
                }

            </>
        );
    }
};

export default App;