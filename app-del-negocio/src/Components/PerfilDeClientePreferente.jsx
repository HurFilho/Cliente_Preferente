import React from "react";
import Session from 'react-session-api'
import { NavLink } from 'react-router-dom'
import ConnectDB from "./ConnectDB/ConnectDB";
import { returnHere } from './AsignarPuntosOVisitas'
import CurrencyInput from 'react-currency-input-field';
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";


class PerfilDeClientePrefrente extends React.Component {


    _isMounted = false

    constructor(props) {
        super(props);
        this.state = {
            DatosDelCliente: [],
            Consumo: 0,
            PuntosAgregados: 0,
            isLoading: true,
            ClientLoaded: false,
            Asignado: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePage = this.updatePage.bind(this);


    }

    updatePage() {
        const fetchData = async () => {
            console.log(this.state.isLoading)
            !this.state.isLoading ? this.setState({ ClientLoaded: false }) : fetchData()
        }
        fetchData()
    }

    handleSubmit(event) {
        if (window.confirm('¿Realmente desea asignar el consumo informado y una visita a este Cliente?')) {
            const fetchTableData = async () => {
                const tempVisitas = this.state.DatosDelCliente.Visitas
                const visitas = tempVisitas === "" ? [] : await JSON.parse(tempVisitas)
                const nuevosPuntos = agregaPuntos(this.state.PuntosAgregados, this.state.DatosDelCliente.Puntos)
                visitas.push(createVisit(today(), parseInt(this.state.Consumo).toFixed(2), +this.state.PuntosAgregados))
                console.log(visitas)
                await editarCliente(this.state.DatosDelCliente.id, await prepareColumns(nuevosPuntos, JSON.stringify(visitas)))
                const NuevosDatosDelCliente = await getClientData(this.state.DatosDelCliente.id, this.state.DatosDelCliente.CorreoElectronico)
                this.setState({ DatosDelCliente: await NuevosDatosDelCliente[0] });
                this.setState({ Asignado: true, ClientLoaded: false });
                setTimeout(() => {
                    returnHere()
                }, 3000);
            }
            fetchTableData()
        }
        event.preventDefault();
    }

    enableSaving(value) {
        this.setState({ Consumo: value })
        this.setState({ PuntosAgregados: Math.round(value != 0 ? value * .05 : 0) })
        this.setState({ Guardar: value > 0 ? false : true })
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ isLoading: false })
        }
        const fetchClientLoad = async () => {
            const clientLoaded = await Session.items().clientLoaded
            if (clientLoaded === false) this.setState({ ClientLoaded: false })
            else if (clientLoaded === true) {
                const fetchClientData = async () => {
                    var DatosDelCliente = await Session.items().DatosDelCliente
                    if (DatosDelCliente) {
                        DatosDelCliente = await JSON.parse(DatosDelCliente)
                        this.setState({ ClientLoaded: true })
                        this.setState({ DatosDelCliente })
                    } else fetchClientData()
                }
                fetchClientData()

            } else fetchClientLoad()
        }
        fetchClientLoad()
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div style={{ backgroundColor: "#FAFAFA" }}>
                <div style={{ backgroundColor: "#FAFAFA" }}>
                    {
                        this.state.ClientLoaded &&
                        <>
                            <div className="profile-items" style={{ backgroundColor: "#FAFAFA", height: "100%" }}>

                                <div style={{ padding: "1em 1em 1em 1em", width: "100%" }}>

                                    <div className="row card" style={{ minWidth: "450px", padding: "1em", backgroundColor: "#DDD" }}>
                                        <h1 className="card-title2">{this.state.DatosDelCliente.Nombre} {this.state.DatosDelCliente.Apellido}</h1>
                                        <hr />

                                        <div className="row" style={{ textAlign: 'center' }}>

                                            <label className="col" htmlFor="CorreoElectronico" style={{ padding: ".2em" }}>
                                                <strong>Correo Electronico:</strong>
                                            </label>
                                            <div className="col" name="CorreoElectronico" key={"CorreoElectronico_id_" + this.state.DatosDelCliente.id}
                                                style={{ padding: ".2em" }}>
                                                {this.state.DatosDelCliente.CorreoElectronico}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row" style={{ textAlign: 'center' }}>
                                            <div className="col">
                                                <label htmlFor="Telefono"><strong>Teléfono</strong></label>
                                                <div name="Telefono" key={"Telefono_id_" + this.state.DatosDelCliente.id}
                                                    style={{ padding: ".2em" }}>
                                                    {this.state.DatosDelCliente.Telefono}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="Genero"><strong>Genero</strong></label>
                                                <div name="Genero" key={"Genero_id_" + this.state.DatosDelCliente.id} style={{ padding: ".2em" }}>
                                                    {this.state.DatosDelCliente.Genero}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row align-mid">
                                            <div className="card col" style={{ textAlign: 'center', padding: "1em", backgroundColor: "#F4F4F4" }}>
                                                <label style={{ margin: "0 0 1em 0" }} htmlFor="Puntos"><strong>Puntos disponibles</strong></label>
                                                <h2 className="align-mid">{calculatePoints(this.state.DatosDelCliente.Puntos).puntosDisponibles}</h2>
                                                {/* <h2 className="align-mid">{calculatePoints(this.state.DatosDelCliente.Puntos)}</h2> */}
                                            </div>
                                            <div className="card col" style={{ textAlign: 'center', padding: "1em", backgroundColor: "#F4F4F4" }}>
                                                <label style={{ margin: "0 0 1em 0" }} htmlFor="Visitas"><strong>Número de Visitas</strong></label>

                                                <h2 name="Visitas" >{calculateVisits(this.state.DatosDelCliente.Visitas)}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ padding: "1em 1em 1em 1em", width: "100%", display: "flex" }}>
                                    <div className="row card" style={{ minWidth: "450px", padding: "1em", backgroundColor: "#DDD" }}>
                                        <h1 className="align-mid"><strong>Asignar Consumo y Visita</strong></h1>
                                        <div className="input-money">
                                            <div className="align-mid">
                                                <br />
                                                <br />
                                                <br />
                                                <h5 className="label">Agregar el valor consumado</h5>
                                                <br />
                                                <CurrencyInput className="form-control" id="Consumo"
                                                    style={{ fontSize: "xx-large", width: "400px", height: "2.2em" }}
                                                    name="Consumo" placeholder="0.00" decimalsLimit={2}
                                                    onValueChange={(value) => this.enableSaving(value)} required autoFocus />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="align-mid" >

                                <div className="profile-items" style={{ justifyContent: "center", margin: "0 0 3em" }}>

                                    <div className="card" style={{ padding: "1em", minWidth: "600px", backgroundColor: "#CCC" }} >
                                        <div className="card card-asignar" style={{ padding: "1em 1em 0 1em" }} >

                                            <h3><strong>Fecha de la visita:</strong></h3>
                                            <div className="card" style={{ marginBottom: ".5em" }}>
                                                <div id="fecha" style={{ alignSelf: "center", padding: ".2em" }}>{today()}</div>
                                            </div>
                                            <br />
                                            <div className="row" style={{ height: "4em" }}>
                                                <h5 className="col-8" style={{ alignSelf: "end" }}><strong>Puntos a agregar:</strong></h5>
                                                <h1 className="col-4 card" id="puntos" style={{ alignSelf: "end" }}>{this.state.PuntosAgregados}</h1>
                                            </div>
                                            <br />
                                            <div className="align-right" style={{ alignSelf: "end" }}><i>Puntos equivalen al 5% del total consumido</i></div>

                                        </div>
                                    </div>


                                    <div className="align-mid profile-buttons" style={{ alignSelf: "center" }}>
                                        <div style={{ margin: "1em" }}>
                                            <NavLink to={`${process.env.PUBLIC_URL}/inicio`}>
                                                <button className="btn btn-secondary" style={{ width: "8em", height: "3em" }}
                                                    type="button" id="buttonCancelar">Cancelar</button>
                                            </NavLink>
                                        </div>
                                        <div style={{ margin: "1em" }}>
                                            <button className="btn btn-success" style={{ width: "8em", height: "3em" }}
                                                type="button" id="buttonGuardar" onClick={this.handleSubmit} disabled={this.state.Guardar}>Guardar</button>
                                        </div>
                                    </div>


                                </div>



                            </div>


                        </>
                    }
                    {
                        this.state.Asignado &&
                        <>
                            <div className="card align-mid" style={{ margin: "15%", fontSize: "100%", backgroundColor: "#a7d379", color: "#FFF" }}>
                                <h1 style={{ margin: "1em" }}>¡Puntos y visita asignados con éxito!</h1>
                            </div>
                        </>
                    }
                    {/* {
                        !this.state.ClientLoaded &&
                        <>
                        </>
                    } */}
                </div>
            </div >
        );
    }
}

export default PerfilDeClientePrefrente;

const editarCliente = async (id, columns) => {
    const dbName = "registro_de_clientes_preferentes"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexCliente.php";
    console.log(id)
    console.log(columns)
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

const getClientData = async (id, CorreoElectronico) => {
    const dbName = "registro_de_clientes_preferentes"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexCliente.php"
    // console.log(await ConnectDB(phpAddress, CreateSQLRequest.GetClientData(dbName, id, CorreoElectronico), "object"))
    return await ConnectDB(phpAddress, CreateSQLRequest.GetClientData(dbName, id, CorreoElectronico), "object")
}


const today = () => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const weekDays = ['domingo', 'junes', 'martes', 'miércoles', 'nueves', 'viernes', 'sábado'];
    const days = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const date = new Date();

    return weekDays[date.getDay()] + ', ' + days[date.getDate()] + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear();
}

const createVisit = (date, amount, points) => {
    return ({
        fecha: date,
        consumo: amount,
        puntos: points,
    })
}

const calculateVisits = json => {
    const visits = getJson(json)
    return visits === '' ? 0 : visits.length
}

const calculatePoints = json => {
    const basePoints = { puntosDisponibles: 0 }
    const points = getJson(json)
    return points === '' ? basePoints : points
}

const agregaPuntos = (newPuntos, oldPuntos) => {
    console.log(newPuntos)
    console.log(oldPuntos)
    oldPuntos = oldPuntos === '' ? { puntosTotales: 0, puntosDisponibles: 0, puntosAbonados: 0 } : getJson(oldPuntos)
    oldPuntos.puntosTotales += newPuntos
    oldPuntos.puntosDisponibles += newPuntos
    return JSON.stringify(oldPuntos)
}

const getJson = json => {
    const parsedJSON = json === '' || undefined ? '' : json ? JSON.parse(json) : ""
    return parsedJSON
}