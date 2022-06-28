import React from "react";
import ConnectDB from "./ConnectDB/ConnectDB";
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";

const dbName = "registro_de_clientes_preferentes"
const phpAddress = "http://" + document.location.hostname + "/src/api/indexClienteApp.php";

class EditarPerfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            MostrarDetalles: false,
            Cliente: [],
            EditarPuntos: true,
            Guardar: true,
            Puntos: 0,
            EditarVisitas: true,
            EditarPuntosTexto: "Editar",
            EditarVisitasTexto: "Editar",
            Visitas: 0,
            tableData: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChange(event) {

        switch (event.target.name) {
            case "MostrarDetalles":
                this.setState({ MostrarDetalles: (this.state.MostrarDetalles ? false : true) });
                this.setState({ Cliente: this.state.tableData[parseInt(event.target.id) - 1] });
                this.setState({ Puntos: parseInt(this.state.tableData[parseInt(event.target.id) - 1].Puntos) })
                this.setState({ Visitas: parseInt(this.state.tableData[parseInt(event.target.id) - 1].Visitas) })
                break;
            case "inputPuntos":
                this.setState({ Puntos: parseInt(event.target.value) });
                break;
            case "inputVisitas":
                this.setState({ Visitas: parseInt(event.target.value) });
                break;
            default:
                break;
        }
        setTimeout(() => {
            // console.log(this.state)
        }, 50);
        document.getElementById(event.target.id).setCustomValidity("")
        document.getElementById(event.target.id).reportValidity()
    }

    handleClick(event) {
        switch (event.target.id) {
            case "buttonPuntos":
                if (!this.state.EditarPuntos) {
                    document.getElementById("inputPuntos").value = this.state.Cliente.Puntos
                    this.setState({ Puntos: this.state.Cliente.Puntos })
                }
                this.setState({ EditarPuntos: (this.state.EditarPuntos ? false : true) });
                this.setState({ EditarPuntosTexto: (this.state.EditarPuntosTexto === "Editar" ? "Cancelar" : "Editar") });
                setTimeout(() => {
                    this.setState({ Guardar: this.state.EditarVisitas ? this.state.EditarPuntos : false })
                }, 10);
                break;
            case "buttonVisitas":
                if (!this.state.EditarVisitas) {
                    document.getElementById("inputVisitas").value = this.state.Cliente.Visitas
                    this.setState({ Visitas: this.state.Cliente.Visitas })
                }
                this.setState({ EditarVisitas: (this.state.EditarVisitas ? false : true) });
                this.setState({ EditarVisitasTexto: (this.state.EditarVisitasTexto === "Editar" ? "Cancelar" : "Editar") });
                setTimeout(() => {
                    this.setState({ Guardar: this.state.EditarPuntos ? this.state.EditarVisitas : false })
                }, 10);
                break;
            case "buttonCancelar":
                this.setState({ MostrarDetalles: (this.state.MostrarDetalles ? false : true) });
                this.setState({ Puntos: 0 });
                this.setState({ Visitas: 0 });
                this.setState({ Cliente: [] });
                break;
            case "buttonEliminar":
                deleteCliente(this.state.Cliente.id)
                this.setState({ MostrarDetalles: (this.state.MostrarDetalles ? false : true) });
                this.setState({ Cliente: [] });
                break;
            default:
                break;
        }
        setTimeout(() => {
            // console.log(this.state)
        }, 50);
        document.getElementById(event.target.id).setCustomValidity("")
        document.getElementById(event.target.id).reportValidity()
    }

    handleReset() {
        // this.setState({ EditarPuntos: true });
        this.setState({
            MostrarDetalles: false,
            Cliente: [],
            EditarPuntos: true,
            Guardar: true,
            Puntos: 0,
            EditarVisitas: true,
            EditarPuntosTexto: "Editar",
            EditarVisitasTexto: "Editar",
            Visitas: 0,
            tableData: []
        });
    }

    handleSubmit(event) {
        if (window.confirm('¿Realmente desea editar los datos de este cliente?')) {
            const fetchTableData = async () => {
                await editarCliente(this.state.Cliente.id, await prepareColumns(this.state.Puntos, this.state.Visitas))
                this.setState({ MostrarDetalles: (this.state.MostrarDetalles ? false : true) });
                this.setState({ Cliente: [] });
                this.setState({ tableData: [] });
                this.componentDidMount()
                this.handleReset()
                window.alert('Cliente editado con éxito.')
            }
            fetchTableData()
        }
        event.preventDefault();
    }

    componentDidMount() {
        const fetchTableData = async () => {
            const tableData = await ConnectDB(phpAddress, CreateSQLRequest.SelectAll(dbName), "object")
            this.setState({
                tableData
            })
        }
        fetchTableData()
    }

    render() {
        return (
            <div>
                <div className="card container-fluid" style={{ backgroundColor: "#EEE", minWidth: "700px" }}>
                    {
                        !this.state.MostrarDetalles &&
                        <div>
                            <div style={{ margin: "2em" }}>
                                <h1 className="card-title2" >{this.state.Cliente.Nombre} {this.state.Cliente.Apellido}</h1>
                            </div>

                            <div className="container row" style={{ padding: "0", margin: "0" }}>

                                <div className="col-7" style={{ display: "flex", alignContent: "center", flexDirection: "column", alignItems: "center" }}>

                                    <span className="card" style={{ textAlign: 'left', padding: ".5em 1em 0 1em", marginBottom: "2em" }} data-type="selectors">
                                        <label className="form-label" style={{ margin: "0" }} htmlFor="Puntos"><strong>Puntos acumulados</strong></label>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" id="inputPuntos" name="inputPuntos" onChange={this.handleChange} value={parseInt(this.state.Puntos)} disabled={this.state.EditarPuntos} />
                                            <button className="btn btn-secondary" style={{ width: "6.5em" }} type="button" id="buttonPuntos" onClick={this.handleClick}>{this.state.EditarPuntosTexto}</button>
                                        </div>
                                    </span>

                                    <span className="card" style={{ textAlign: 'left', padding: ".5em 1em 0 1em" }} data-type="selectors">
                                        <label className="form-label" style={{ margin: "0" }} htmlFor="Puntos"><strong>Número de Visitas</strong></label>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" id="inputVisitas" name="inputVisitas" onChange={this.handleChange} value={parseInt(this.state.Visitas)} disabled={this.state.EditarVisitas} />
                                            <button className="btn btn-secondary" style={{ width: "6.5em" }} type="button" id="buttonVisitas" onClick={this.handleClick}>{this.state.EditarVisitasTexto}</button>
                                        </div>
                                    </span>

                                </div>
                                <div className="col-5">
                                    <div className="card" style={{ textAlign: 'left', padding: "1em" }}>
                                        <label htmlFor="Telefono"><strong>Teléfono</strong></label>
                                        <div name="Telefono" key={"Telefono_id_" + this.state.Cliente.id} style={{ padding: ".2em" }}> {this.state.Cliente.Telefono}</div>

                                        <label htmlFor="CorreoElectronico"><strong>Correo Electronico</strong></label>
                                        <div name="CorreoElectronico" key={"CorreoElectronico_id_" + this.state.Cliente.id} style={{ padding: ".2em" }}> {this.state.Cliente.CorreoElectronico}</div>

                                        <label htmlFor="FechaDeNacimiento"><strong>Fecha De Nacimiento</strong></label>
                                        <div name="FechaDeNacimiento" key={"FechaDeNacimiento_id_" + this.state.Cliente.id} style={{ padding: ".2em" }}> {this.state.Cliente.FechaDeNacimiento}</div>

                                        <label htmlFor="Genero"><strong>Genero</strong></label>
                                        <div name="Genero" key={"Genero_id_" + this.state.Cliente.id} style={{ padding: ".2em" }}> {this.state.Cliente.Genero}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="container row align-mid" style={{ padding: "0", margin: "2em 0 2em 0" }}>
                                <div className="col">
                                    <button className="btn btn-danger" style={{ width: "12em", height: "3em" }} type="button" id="buttonEliminar" onClick={this.handleClick}>Eliminar Cliente</button>
                                </div>
                                <div className="col">
                                    <button className="btn btn-secondary" style={{ width: "12em", height: "3em" }} type="button" id="buttonCancelar" onClick={this.handleClick}>Cancelar</button>
                                </div>
                                <div className="col">
                                    <button className="btn btn-success" style={{ width: "12em", height: "3em" }} type="button" id="buttonGuardar" onClick={this.handleSubmit} disabled={this.state.Guardar}>Guardar</button>
                                </div>
                            </div>


                        </div>

                    }
                </div>
            </div >
        );
    }
}

export default EditarPerfil;

const deleteCliente = async (id) => {
    return (await ConnectDB(phpAddress, CreateSQLRequest.Delete(dbName, await addZeros(id)), "boolean"))
}

const editarCliente = async (id, columns) => {
    return (await ConnectDB(phpAddress, CreateSQLRequest.Update(dbName, columns, await addZeros(id)), "boolean"))
}

async function addZeros(id) {
    while ((id.toString()).length < 8) id = "0" + id;
    return id;
}

const prepareColumns = async (puntos, visitas) => {
    return [{
        "columnName": "Puntos",
        "value": puntos
    },
    {
        "columnName": "Visitas",
        "value": visitas
    }
    ]
}