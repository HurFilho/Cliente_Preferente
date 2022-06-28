import React from 'react';
import RegistrarSucursal from './Components/RegistrarSucursal';
import VisualizarSucursales from './Components/VisualizarSucursales';
import RegistrarClientePreferente from './Components/ClientePreferente/RegistrarClientePreferente';
import EditarClientePreferente from './Components/ClientePreferente/EditarClientePreferente';
import VisualizarPromociones from './Components/VisualixarPromociones/VisualizarPromociones';
import VisualizarClientesPreferentes from "./Components/ClientePreferente/VisualizarClientesPreferentes";
import CrearPromocion from "./Components/CrearPromocion";
import Helmet from 'react-helmet';

const resetData = {
    VisualizarSucursales: false,
    RegistrarSucursal: false,
    ClientePreferente: false,
    VisualizarClientesPreferentes: false,
    AdicionarCliente: false,
    Promocion: false,
    Inicio: false,
}

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            VisualizarSucursales: false,
            RegistrarSucursal: false,
            ClientePreferente: false,
            VisualizarClientesPreferentes: false,
            AdicionarCliente: false,
            Promocion: false,
            Inicio: true,
        }

        this.addClient = this.addClient.bind(this);
        this.funcaoTal = this.funcaoTal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    funcaoTal() {
        return "nada"
    }

    handleChange(event) {
        switch (event.target.id) {
            case "VisualizarSucursales":
                this.setState(resetData)
                if (!this.state.VisualizarSucursales) this.setState({ VisualizarSucursales: true });
                else {
                    this.setState({ VisualizarSucursales: false });
                    if (!this.state.RegistrarSucursal && !this.state.ClientePreferente && !this.state.VisualizarClientesPreferentes && !this.state.Inicio && !this.state.Promocion) this.setState({ Inicio: true });
                }
                break;
            case "RegistrarSucursal":
                this.setState(resetData)
                if (!this.state.RegistrarSucursal) this.setState({ RegistrarSucursal: true });
                else {
                    this.setState({ RegistrarSucursal: false });
                    if (!this.state.VisualizarSucursales && !this.state.ClientePreferente && !this.state.VisualizarClientesPreferentes && !this.state.Inicio && !this.state.Promocion) this.setState({ Inicio: true });
                }
                break;
            case "ClientePreferente":
                this.setState(resetData)
                if (!this.state.ClientePreferente) this.setState({ ClientePreferente: true });
                else {
                    this.setState({ ClientePreferente: false });
                    if (!this.state.VisualizarSucursales && !this.state.RegistrarSucursal && !this.state.VisualizarClientesPreferentes && !this.state.Inicio && !this.state.Promocion) this.setState({ Inicio: true });
                }
                break;
            case "Promocion":
                this.setState(resetData)
                if (!this.state.Promocion) this.setState({ Promocion: true });
                else {
                    this.setState({ Promocion: false });
                    if (!this.state.VisualizarSucursales && !this.state.RegistrarSucursal && !this.state.VisualizarClientesPreferentes && !this.state.ClientePreferente && !this.state.Inicio) this.setState({ Inicio: true });
                }
                break;
            case "VisualizarClientesPreferentes":
                this.setState(resetData)
                if (!this.state.VisualizarClientesPreferentes) this.setState({ VisualizarClientesPreferentes: true });
                else {
                    this.setState({ VisualizarClientesPreferentes: false });
                    if (!this.state.VisualizarSucursales && !this.state.RegistrarSucursal && !this.state.ClientePreferente && !this.state.Inicio && !this.state.Promocion) this.setState({ Inicio: true });
                }
                break;
            default:
                if (!this.state.Inicio) this.setState({ Inicio: true });
                break;
        }
    }

    addClient() {
        setTimeout(() => {
            this.setState({ AdicionarCliente: this.state.AdicionarCliente ? false : true })
        }, 100);
    }

    render() {
        return (
            <>
                <Helmet>
                    <body style="display:block;" />
                </Helmet>
                <div className="container-fluid no-print align-mid" style={{ width: "100%", backgroundColor: "#284B63" }}>
                    <h1 style={{ padding: ".5em 0 .3em 0", color: "#FFF" }}><strong>Panel de Administración - Clientes Preferentes</strong></h1>
                    <div id="header-menu">
                        <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button onClick={this.handleChange} className="nav-link" id="RegistrarSucursal" data-bs-toggle="tab" type="button"
                                    role="tab" aria-controls="RegistrarSucursal" aria-selected="true">Registrar Sucursal</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button onClick={this.handleChange} className="nav-link" id="VisualizarSucursales" data-bs-toggle="tab" type="button"
                                    role="tab" aria-controls="VisualizarSucursales" aria-selected="false">Visualizar Sucursales</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button onClick={this.handleChange} className="nav-link" id="ClientePreferente" data-bs-toggle="tab" type="button"
                                    role="tab" aria-controls="ClientePreferente" aria-selected="false">Cliente Preferente</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button onClick={this.handleChange} className="nav-link" id="Promocion" data-bs-toggle="tab" type="button"
                                    role="tab" aria-controls="Promocion" aria-selected="false">Promociones</button>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    this.state.Inicio &&
                    <div className="container no-print" style={{ width: "50em", marginTop: "10em" }}>
                        <div className="card align-mid">
                            <h1>
                                <span>Seleccione una de las opciones</span>
                            </h1>
                        </div>
                    </div>
                }
                {
                    this.state.RegistrarSucursal &&
                    <div className="container" style={{ width: "50em", marginTop: "2em" }}>
                        <RegistrarSucursal />
                    </div>
                }
                {
                    this.state.VisualizarSucursales &&
                    <div className="container" style={{ width: "90%", marginTop: "2em", marginBottom: "2em" }}>
                        <VisualizarSucursales />
                    </div>
                }
                {
                    this.state.ClientePreferente &&
                    <div className="row tela align-mid" style={{ padding: "1em" }}>
                        {
                            this.state.AdicionarCliente &&
                            <div className="custom-col-5">
                                <RegistrarClientePreferente addClient={this.addClient} />
                                <br />
                            </div>
                        }
                        {
                            !this.state.AdicionarCliente &&
                            <div >
                                <EditarClientePreferente addClient={this.addClient} style={{ width: "100%" }} />
                                <br />
                            </div>
                        }
                    </div>
                }
                {
                    this.state.VisualizarClientesPreferentes &&
                    <div className="container" style={{ width: "90%", marginTop: "2em", marginBottom: "2em" }}>
                        <VisualizarClientesPreferentes />
                        <br />
                        <br />
                    </div>
                }
                {
                    this.state.Promocion &&
                    // <div className="tela align-mid" style={{ padding: "1em" }}>
                    <div className="align-mid" style={{ padding: "1em" }}>
                        <div style={{ alignSelf: "flex-start" }}>
                            <CrearPromocion />
                            <br />
                        </div>
                        <VisualizarPromociones />
                    </div>
                }
            </>
        )
    }
}

export default App