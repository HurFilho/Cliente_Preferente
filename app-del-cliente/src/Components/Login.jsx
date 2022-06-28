import React from 'react';
import ConnectDB from "./ConnectDB/ConnectDB";
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";
import { returnToAppDelCliente } from '../App'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Contrasena: "",
            CorreoElectronico: "",
            IniciarSesion: false,
            LerCodigoQR: false,
            NuevoRegistro: false,
            DatosDelCliente: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "CorreoElectronico":
                this.setState({ CorreoElectronico: event.target.value });
                break;
            case "Contrasena":
                this.setState({ Contrasena: event.target.value });
                break;
            case "IniciarSesion":
                this.setState({ IniciarSesion: true });
                break;
            case "LerCodigoQR":
                this.setState({ LerCodigoQR: true });
                break;
            case "NuevoRegistro":
                this.setState({ NuevoRegistro: true });
                this.setState({ Login: false });
                break;
            default:
                break;
        }
        document.getElementById(event.target.id).setCustomValidity("")
        document.getElementById(event.target.id).reportValidity()
    }

    handleSubmit(event) {
        const fetchTableData = async () => {
            const datosDelCliente = await CheckAuthentication(this.state.CorreoElectronico, this.state.Contrasena)
            if (datosDelCliente.length) {
                const promociones = await CarregaPromociones()
                returnToAppDelCliente(datosDelCliente, promociones)
            } else showErrorMessage()
        }
        fetchTableData()
        event.preventDefault();
    }

    render() {
        return (
            <>
                <div className="container card">
                    <h1 className="card-title align-mid" style={{ color: "#353535" }} >Cliente<p />Preferente</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <input type="text" placeholder="Correo electrónico" className="form-control" id="CorreoElectronico" name="CorreoElectronico" onChange={this.handleChange} value={this.state.CorreoElectronico} required autoFocus />
                        </div>
                        <div className="row">
                            <div className="input-group">
                                <input type="password" placeholder="Contraseña" className="form-control" id="Contrasena" name="Contrasena" onChange={this.handleChange} value={this.state.Contrasena} required />
                            </div>
                        </div>
                        <div className="input-group">
                            <input placeholder="Iniciar sesión" type="submit" id="IniciarSesion" value="IniciarSesion" name="IniciarSesion" className="form-control button-submit" style={{ marginTop: ".5em", width: "80%" }} onSubmit={this.handleSubmit.bind(this)} required />
                        </div>
                    </form >
                </div>
            </>
        )
    }
}

export default Login

async function CheckAuthentication(userId, pass) {
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexClienteAPP.php";
    const datosDelCliente = await ConnectDB(CreateSQLRequest.CheckCredentials(userId, pass), phpAddress, "object")
    return (datosDelCliente)
}

const showErrorMessage = async () => {
    let errorMessage = "El correo electrónico o contraseña que ingresaste no está correcto. Por favor compruébalos y vuelve a intentarlos"
    document.getElementById("IniciarSesion").setCustomValidity(errorMessage)
    document.getElementById("IniciarSesion").reportValidity()
}

const CarregaPromociones = async () => {
    const dbName = "registro_de_promociones"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexPromocion.php";
    const promociones = await ConnectDB(CreateSQLRequest.SelectWhereLike('Disponibilidad', 'TodosLosClientes', dbName), phpAddress, "object")
    return promociones
}