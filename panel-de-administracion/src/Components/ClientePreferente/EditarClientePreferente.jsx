import React from "react";
import ConnectDB from "../ConnectDB/ConnectDB";
import CreateSQLRequest from "../ConnectDB/CreateSQLRequest";
import { DetalhesDeVisita } from "./DetalhesDeVisita";

const dbName = "registro_de_clientes_preferentes"
const phpAddress = "http://" + document.location.hostname + "/src/api/indexCliente.php";

class EditarClientePreferente extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            MostrarDetalles: false,
            Cliente: [],
            // EditarPuntos: true,
            Guardar: true,
            // Puntos: 0,
            EditarVisitas: true,
            // EditarPuntosTexto: "Editar",
            // EditarVisitasTexto: "Editar",
            // Visitas: 0,
            tableData: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.edited = this.edited.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChange(event) {
        switch (event.target.name) {
            case "MostrarDetalles":
                this.setState({ MostrarDetalles: (this.state.MostrarDetalles ? false : true) });
                this.setState({ Cliente: this.state.tableData[parseInt(event.target.id)] });
                // this.setState({ Puntos: parseInt(this.state.tableData[parseInt(event.target.id)].Puntos) })
                // this.setState({ Visitas: parseInt(this.state.tableData[parseInt(event.target.id)].Visitas) })
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
            case "buttonCancelar":
                this.setState({ MostrarDetalles: (this.state.MostrarDetalles ? false : true) });
                // this.setState({ Puntos: 0 });
                // this.setState({ Visitas: 0 });
                this.setState({ Cliente: [] });
                this.setState({ tableData: [] });
                this.componentDidMount()
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
            // EditarPuntos: true,
            Guardar: true,
            // Puntos: 0,
            EditarVisitas: true,
            // EditarPuntosTexto: "Editar",
            // EditarVisitasTexto: "Editar",
            // Visitas: 0,
            tableData: []
        });
    }

    edited(visitas) {
        let tempCliente = this.state.Cliente
        tempCliente.Visitas = JSON.stringify(visitas)
        let nuevoTotaleDeVisitas = 0
        visitas.map(item => nuevoTotaleDeVisitas += item.puntos)
        let tempPuntos = JSON.parse(this.state.Cliente.Puntos)
        tempPuntos.puntosTotales = nuevoTotaleDeVisitas
        tempPuntos.puntosDisponibles = nuevoTotaleDeVisitas - tempPuntos.puntosAbonados
        tempCliente.Puntos = JSON.stringify(tempPuntos)
        this.setState({ Cliente: tempCliente })
        this.setState({ Guardar: false })
    }

    handleSubmit(event) {
        if (window.confirm('¿Realmente desea editar los datos de este cliente?')) {
            const fetchTableData = async () => {

                // puntos(this.state.Puntos)
                // this.setState({ Puntos: puntos() })
                await editarCliente(this.state.Cliente.id, await prepareColumns(this.state.Cliente.Visitas, preparePoints()))
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
            console.log(tableData)
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
                        !this.state.MostrarDetalles && <>

                            <div className="row">
                                <div className="col-3 align-mid" style={{ alignSelf: "center" }}>
                                    {/* <button className="btn btn-primary align-mid" style={{ margin: '1em' }} type="button"
                                        id="buttonAddCliente" onClick={this.props.addClient}>Registrar Cliente Preferente</button> */}
                                </div>
                                <div className="col-6">
                                    <h1 className="card-title2 align-mid" style={{ margin: '1em' }} >Clientes preferentes</h1>
                                </div>
                                <div className="col-3 align-mid">
                                </div>
                                <table className='table table-responsiv e table-striped' style={{ textAlign: "center" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Género</th>
                                            <th scope="col">Correo Electronico</th>
                                            <th scope="col">Puntos disponibles</th>
                                            <th scope="col">Visitas</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.tableData.map((item, index) => {
                                                return (
                                                    <tr key={"tr_id_" + item.id}>
                                                        <td key={"Nombre_id_" + item.id}>{item.Nombre} {item.Apellido}</td>
                                                        <td key={"Genero_id_" + item.id}>{item.Genero}</td>
                                                        <td key={"CorreoElectronico_id_" + item.id}>{item.CorreoElectronico}</td>
                                                        <td key={"Puntos_id_" + item.id}>{calculatePoints(item.Puntos).puntosDisponibles}</td>
                                                        <td key={"Visitas_id_" + item.id}>{calculateVisits(item.Visitas)}</td>
                                                        <td key={"ID_id" + item.id}>
                                                            <input type="button" className="btn btn-secondary" id={index.toString()}
                                                                name="MostrarDetalles" value="Mostrar detalles" onClick={this.handleChange} />
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
                    {
                        this.state.MostrarDetalles &&
                        <div>
                            <div style={{ padding: "1em 1em 1em 1em" }}>

                                <div className="row card align-mid" style={{ minWidth: "450px", padding: "1em 1em 0 1em", backgroundColor: "#DDD" }}>
                                    <h1 className="card-title2">{this.state.Cliente.Nombre} {this.state.Cliente.Apellido}</h1>
                                    <hr />
                                    <hr />
                                    <div className="row" style={{ textAlign: 'center' }}>
                                        <div className="col">
                                            <div className="col" htmlFor="CorreoElectronico" style={{ padding: ".2em" }}><strong>Correo Electronico:</strong></div>
                                            <div className="col" name="CorreoElectronico"
                                                key={"CorreoElectronico_id_" + this.state.Cliente.id} style={{ padding: ".2em" }}>
                                                {this.state.Cliente.CorreoElectronico}
                                            </div>
                                        </div>
                                        <div className="col">

                                            <label htmlFor="Telefono"><strong>Teléfono</strong></label>
                                            <div name="Telefono" key={"Telefono_id_" + this.state.Cliente.id} style={{ padding: ".2em" }}>
                                                {this.state.Cliente.Telefono}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="Genero"><strong>Genero</strong></label>
                                            <div name="Genero" key={"Genero_id_" + this.state.Cliente.id} style={{ padding: ".2em" }}> {this.state.Cliente.Genero}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row align-mid">
                                        <div className="col">
                                            <div className="row">
                                                <div className="card col" style={{ textAlign: 'center', padding: "1em", backgroundColor: "#F4F4F4" }}>
                                                    <label style={{ margin: "1em 0 1em 0" }} htmlFor="puntos-disponibles"><strong>Puntos disponibles</strong></label>
                                                    <h1 className="align-mid" style={{ color: "#2e6930" }} name="puntos-disponibles">
                                                        <strong>
                                                            {calculatePoints(this.state.Cliente.Puntos).puntosDisponibles}
                                                        </strong>
                                                    </h1>
                                                </div>
                                                <div className="card col">
                                                    <div className="row" style={{
                                                        textAlign: 'center', backgroundColor: "#F4F4F4", alignItems: "center",
                                                        flexDirection: "row", margin: ".6em 0 1em 0"
                                                    }}>
                                                        <label className="col" htmlFor="puntos-agregados"><strong>Puntos agregados</strong></label>
                                                        <h2 className="align-mid col" name="puntos-agregados" style={{ margin: ".4em" }}>
                                                            {calculatePoints(this.state.Cliente.Puntos).puntosTotales}
                                                        </h2>
                                                    </div>
                                                    <div className="row" style={{
                                                        textAlign: 'center', backgroundColor: "#F4F4F4", alignItems: "center",
                                                        flexDirection: "row", margin: "0 0 .6em 0"
                                                    }}>
                                                        <label className="col" htmlFor="puntos-abonados"><strong>Puntos abonados</strong></label>
                                                        <h2 className="align-mid col" name="puntos-abonados" style={{ margin: ".4em" }}>
                                                            {calculatePoints(this.state.Cliente.Puntos).puntosAbonados}
                                                        </h2>
                                                    </div>
                                                </div>
                                                <div className="card col" name="puntos-abonados"
                                                    style={{ textAlign: 'center', padding: "1em", backgroundColor: "#F4F4F4" }}>
                                                    <label style={{ margin: "1em 0 1em 0" }} htmlFor="Visitas"><strong>Número de Visitas</strong></label>
                                                    <h1 name="Visitas" >
                                                        <strong>
                                                            {calculateVisits(this.state.Cliente.Visitas)}
                                                        </strong>
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DetalhesDeVisita edited={this.edited}>{JSON.parse(this.state.Cliente.Visitas)}</DetalhesDeVisita>
                                </div>

                                <div className="container row align-mid" style={{ padding: "0", margin: "2em 0 2em 0" }}>
                                    <div className="col">
                                        <button className="btn btn-danger" style={{ width: "12em", height: "3em" }} type="button"
                                            id="buttonEliminar" onClick={this.handleClick}>Eliminar Cliente</button>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-secondary" style={{ width: "12em", height: "3em" }} type="button"
                                            id="buttonCancelar" onClick={this.handleClick}>Cancelar</button>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-success" style={{ width: "12em", height: "3em" }} type="button"
                                            id="buttonGuardar" onClick={this.handleSubmit} disabled={this.state.Guardar}>Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div >
        );
    }
}

export default EditarClientePreferente;

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

const prepareColumns = async (visitas, puntos) => {
    return [{
        "columnName": "Visitas",
        "value": visitas
    },
    {
        "columnName": "Puntos",
        "value": puntos
    }
    ]
}

const calculateVisits = json => {
    if (json === "") { var visits = [] }
    else { var visits = json ? JSON.parse(json) : void 0 }
    return visits ? visits.length : 0
}

const calculatePoints = json => {
    if (json === "") { var visits = [] }
    else { var visits = json ? JSON.parse(json) : void 0 }
    return visits
}

const preparePoints = (nuevosPuntos, viejosPuntos) => {
    return JSON.stringify({
        puntosTotales: 100,
        puntosAbonados: 20,
        puntosDisponibles: 80
    })
}