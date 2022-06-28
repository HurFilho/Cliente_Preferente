import React from 'react';
import ConnectDB from "./ConnectDB/ConnectDB";
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";
import { returnToApp } from "../App"

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Usuario: "",
            Contrasena: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.name) {
            case "Usuario":
                this.setState({ Usuario: event.target.value });
                break;
            case "Contrasena":
                this.setState({ Contrasena: event.target.value });
                break;
            default:
                break;
        }
        document.getElementById(event.target.name).setCustomValidity("")
        document.getElementById(event.target.name).reportValidity()
    }

    handleSubmit(event) {
        const fetchTableData = async () => {
            const DatosDeSucursal = await CheckAuthentication(this.state.Usuario, this.state.Contrasena)
            if (DatosDeSucursal.length) {
                returnToApp(DatosDeSucursal)
            } else showErrorMessage()
        }
        fetchTableData()
        event.preventDefault();
    }

    render() {
        return (
            <>
                <div className="container card align-mid" style={{ padding: "1em", backgroundColor: '#264653' }}>
                    <div style={{ padding: "1em" }}>
                        <h1 className="card-title align-mid" style={{ color: "#FFF", fontSize: "3em", lineHeight: ".6em", margin: "0" }} >Cliente<p />Preferente</h1>
                    </div>
                    <div className='row'>
                        <h1 className="card align-mid" style={{ backgroundColor: '#222', color: "#FFF", fontSize: "2em", padding: ".4em", height: "2em", }}><strong>APP DEL NEGÓCIO</strong></h1>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <br />
                        <div className="input-group" style={{ width: "12em" }}>
                            <input type="text" placeholder="Usuario" className="form-control align-mid" id="Usuario" name="Usuario" onChange={this.handleChange} value={this.state.Usuario} required autoFocus />
                        </div>
                        <br />
                        <div className="input-group" style={{ width: "12em" }}>
                            <input type="password" placeholder="Contraseña" className="form-control align-mid" id="Contrasena" name="Contrasena" onChange={this.handleChange} value={this.state.Contrasena} required />
                        </div>
                        <br />
                        <br />
                        <div className="input-group" style={{ width: "20em" }}>
                            <input placeholder="Iniciar sesión" type="submit" id="IniciarSesion" value="Iniciar Sesión" name="IniciarSesion" className="form-control button-submit align-mid" onSubmit={this.handleSubmit.bind(this)} required />
                        </div>
                    </form >
                </div>
            </>
        )
    }
}

export default Login

async function CheckAuthentication(userId, pass) {
    const dbName = "registro_de_sucursales"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexSucursal.php";
    return (await ConnectDB(phpAddress, CreateSQLRequest.CheckCredentials(dbName, userId, pass), "object"))
}

const showErrorMessage = async () => {
    let errorMessage = "El usuario o contraseña que ingresaste no está correcto. Por favor compruébalos y vuelve a intentarlos"
    document.getElementById("IniciarSesion").setCustomValidity(errorMessage)
    document.getElementById("IniciarSesion").reportValidity()
}
