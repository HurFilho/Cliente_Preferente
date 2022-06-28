import React from "react";
import ConnectDB from "./ConnectDB/ConnectDB";
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";

const dbName = "registro_de_sucursales"
const phpAddress = "http://" + document.location.hostname + "/src/api/indexSucursal.php";

const initialData = {
    Nombre: "",
    Numero: "",
    Direccion: "",
    Usuario: "",
    Contrasena: "",
    Telefono: "",
    isSubmitted: false,
};

class RegistrarSucursal extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialData;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.name) {
            case "Nombre":
                this.setState({ Nombre: event.target.value });
                break;
            case "Numero":
                this.setState({ Numero: event.target.value });
                break;
            case "Direccion":
                this.setState({ Direccion: event.target.value });
                break;
            case "Usuario":
                this.setState({ Usuario: event.target.value });
                break;
            case "Contrasena":
                this.setState({ Contrasena: event.target.value });
                break;
            case "Telefono":
                this.setState({ Telefono: formatToPhone(event.target.value) });
                break;
            default:
                break;
        }
        document.getElementById(event.target.name).setCustomValidity("")
        document.getElementById(event.target.name).reportValidity()
    }

    componentDidMount() {
        this.setState({ Telefono: formatToPhone(this.state.Telefono) });
    }

    handleSubmit(event) {
        const fetchTableData = async () => {
            if (await checkFields(this.state)) {
                if (await RegisterData([{
                    "columnName": "Nombre",
                    "value": this.state.Nombre
                },
                {
                    "columnName": "id",
                    "value": await createId()
                },
                {
                    "columnName": "Numero",
                    "value": this.state.Numero
                },
                {
                    "columnName": "Direccion",
                    "value": this.state.Direccion
                },
                {
                    "columnName": "Usuario",
                    "value": this.state.Usuario
                },
                {
                    "columnName": "Contrasena",
                    "value": this.state.Contrasena
                },
                {
                    "columnName": "Telefono",
                    "value": this.state.Telefono
                },])) {
                    this.setState({ isSubmitted: true })
                    this.setState({ Nombre: "" });
                    this.setState({ Numero: "" });
                    this.setState({ Direccion: "" });
                    this.setState({ Usuario: "" });
                    this.setState({ Contrasena: "" });
                    this.setState({ Telefono: "" });
                    document.getElementById("Telefono").blur()
                    setTimeout(() => {
                        this.setState({ isSubmitted: false })
                        // document.getElementById("Nombre").focus()
                    }, 5000)
                }
            }
        }
        fetchTableData()
        event.preventDefault();
    }

    render() {
        return (
            <div className="container-fluid element-background">
                <div id="FormRegistrarSucursal" className="container-fluid" >
                    <div className="container-fluid" style={{ borderRadius: '5px', }}>
                        <h1 style={{ padding: "0.3em", borderRadius: '5px', }}>Agregar datos de sucursal</h1>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <br />
                        <div className="row">
                            <span className="col">
                                <div className="input-group mb">
                                    <span className="input-group-text" id="labelNombre">Nombre</span>
                                    <input type="text" className="form-control" id="Nombre" name="Nombre" onChange={this.handleChange} value={this.state.Nombre} required autoFocus />
                                </div>
                            </span>
                            <span className="col-4">
                                <div className="input-group mb">
                                    <span className="input-group-text" id="labelNumero">Número</span>
                                    <input type="number" className="form-control" id="Numero" name="Numero" onChange={this.handleChange} value={this.state.Numero} required />
                                </div>
                            </span>
                        </div>
                        <br />
                        <div className="row">
                            <span className="col">
                                <div className="input-group mb">
                                    <span className="input-group-text" id="labelDireccion">Dirección</span>
                                    <input type="text" className="form-control" id="Direccion" name="Direccion" onChange={this.handleChange} value={this.state.Direccion} required />
                                </div>
                            </span>
                        </div>
                        <br />
                        <div className="row">
                            <span className="col">
                                <div className="input-group mb">
                                    <span className="input-group-text" id="labelUsuario">Usuario</span>
                                    <input type="text" className="form-control" id="Usuario" name="Usuario" onChange={this.handleChange} value={this.state.Usuario} required />
                                </div>
                            </span>
                            <span className="col">
                                <div className="input-group mb">
                                    <span className="input-group-text" id="labelContrasena">Contraseña</span>
                                    <input type="text" className="form-control" id="Contrasena" name="Contrasena" onChange={this.handleChange} value={this.state.Contrasena} required />
                                </div>
                            </span>
                        </div>
                        <br />
                        <div className="row">
                            <span className="col">
                                <div className="input-group mb">
                                    <span className="input-group-text" id="labelTelefono">Teléfono</span>
                                    <input type="tel" className="form-control" id="Telefono" name="Telefono" value={formatToPhone(this.state.Telefono)} onChange={this.handleChange} pattern="[(]{1}[0-9]{3}[)]{1} [0-9]{3} - [0-9]{4}" maxLength="16" required />
                                </div>
                            </span>
                            <span className="col-5">
                                <div className="input-group mb">
                                    <input type="submit" id="Registrar" name="Registrar" value="Registrar" className="btn btn-primary" style={{ width: "100%" }} onSubmit={this.handleSubmit.bind(this)} required />
                                </div>
                            </span>
                        </div>
                    </form >
                </div >
                {this.state.isSubmitted &&
                    <div className="container-fluid" style={{ marginTop: "2em", marginBottom: "2em" }}>
                        <h6>
                            <span className="alert alert-success align-items-center alert-dismissible fade show" role="alert">
                                Sucursal añadida con éxito!
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </span>
                        </h6>
                    </div>}
            </div>
        );
    }
}

export default RegistrarSucursal;

const formatToPhone = (telefono) => {
    const input = telefono.replace(/\D/g, '').substring(0, 10);
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) { telefono = `(${zip}) ${middle} - ${last}`; }
    else if (input.length > 3) { telefono = `(${zip}) ${middle}`; }
    else if (input.length > 0) { telefono = `(${zip}`; }
    return telefono
};

const checkFields = async (state) => {
    let columnsToCheck = [
        ["Nombre", state.Nombre],
        ["Numero", state.Numero],
        ["Telefono", state.Telefono],
        ["Usuario", state.Usuario]
    ]
    let validity = true
    for (let column of columnsToCheck) {
        if ((await ConnectDB(phpAddress, CreateSQLRequest.SelectWhereLike(dbName, column[0], column[1]), "object")).length) {
            let errorMessage = "El " + column[0].toLowerCase() + " que ingresó ya ha sido registrado, por favor cheque este " + column[0].toLowerCase();
            document.getElementById(column[0]).setCustomValidity(errorMessage);
            document.getElementById(column[0]).reportValidity();
            validity = false;
        }
    }
    return validity
}

async function RegisterData(dataToAdd) {
    return (await ConnectDB(phpAddress, CreateSQLRequest.Insert(dbName, dataToAdd), "boolean"))
}

const createId = async () => {
    // const tempId = await addZeros(await ConnectDB(phpAddress, CreateSQLRequest.SelectAll(dbName), "object").length)
    const tempId_1 = await ConnectDB(phpAddress, CreateSQLRequest.SelectAll(dbName), "object")
    const tempId_2 = await addZeros(parseInt(tempId_1[tempId_1.length - 1].id) + 1)
    return await checkId(tempId_2) ? (tempId_2) : createId()
}

const checkId = async (id) => {
    const columnsToCheck = [
        ["id", id],
    ]
    for (let column of columnsToCheck) {
        if ((await ConnectDB(phpAddress, CreateSQLRequest.SelectWhereLike(dbName, column[0], column[1]), "object")).length) {
            return false
        } else return true
    }
}


async function addZeros(id) {
    while ((id.toString()).length < 16) id = "0" + id;
    return id;
}