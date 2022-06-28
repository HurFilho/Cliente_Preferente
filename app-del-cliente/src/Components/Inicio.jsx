import React from "react";
import Session from 'react-session-api'
import { NavLink } from 'react-router-dom'
import QrReader from "./LeitorDeCuponQR";
import ConnectDB from "./ConnectDB/ConnectDB";
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";
import { LeerCuponButton, EscanearButton } from "./StyledComponents/Buttons";

class Inicio extends React.Component {

    _isMounted = false

    constructor(props) {
        super(props);
        window.updatePage = this
        this.state = {
            DatosDelCliente: [],
            ViewButtons: true,
            isLoading: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    updatePage() {
        const fetchData = async () => {
            !this.state.isLoading ? this.setState({ ViewButtons: true }) : fetchData()
        }
        fetchData()

    }

    handleClick(event) {
        switch (event.target.id) {
            case "EscanearCodigoQr":
                this.setState({ ViewButtons: false })
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

    componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
            this.setState({ isLoading: false })
        }
        const fetchClientData = async () => {
            let DatosDelCliente = await Session.items().DatosDelCliente
            if (!DatosDelCliente) fetchClientData()
            else {
                DatosDelCliente = await JSON.parse(DatosDelCliente)
                this.setState({ DatosDelCliente })
            }
        }
        fetchClientData()

        const fetchPromociones = async () => {
            let Promociones = await Session.items().Promociones
            if (!Promociones) fetchPromociones()
            else {
                Promociones = await JSON.parse(Promociones)
                this.setState({ Promociones })
                this.setState({ VerCupones: Promociones.length > 0 ? true : false })
            }
        }
        fetchPromociones()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                {
                    this.state.ViewButtons &&
                    <div className="row" style={{ backgroundColor: "#264653", color: "#FFF", padding: "3em 0 1em 3em" }}>
                        <div style={{ alignSelf: "self-end" }} className="col-8">
                            <h4>Hola, {this.state.DatosDelCliente.Nombre} {this.state.DatosDelCliente.Apellido}</h4>
                        </div>
                        <div className="col-2">
                            <label htmlFor="Puntos">Puntos</label>
                            <h4 id="Puntos">{calculatePoints(this.state.DatosDelCliente.Puntos).puntosDisponibles}</h4>
                        </div>
                        <div className="col-2">
                            <label htmlFor="Visitas">Visitas</label>
                            <h4 id="Visitas">{calculateVisits(this.state.DatosDelCliente.Visitas)}</h4>
                        </div>
                    </div>
                }
                {
                    this.state.ViewButtons &&
                    <div className="align-mid">
                        <NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/cupon`}>
                            <LeerCuponButton id="VerCupones">
                                Ver cupones
                            </LeerCuponButton>
                        </NavLink>
                    </div>
                }
                {
                    this.state.ViewButtons &&
                    <div className="align-mid">
                        <NavLink className="nav-link" to={`${process.env.PUBLIC_URL}`}>
                            <EscanearButton id="EscanearCodigoQr" onClick={this.handleClick} >
                                Escanear código QR del cupón
                            </EscanearButton>
                        </NavLink>
                    </div>
                }
                {
                    !this.state.ViewButtons &&
                    <>
                        <div style={{ heigth: "80%" }}>
                            <QrReader />
                            <br />
                            <br />
                        </div>
                    </>
                }

            </>
        );
    }
}

export default Inicio;

export async function returnHome() {
    await updateSession()
    await window.updatePage.updatePage()
}

const getClientData = async () => {
    const DatosDelClienteJSON = await Session.items().DatosDelCliente
    const DatosDelCliente = await JSON.parse(DatosDelClienteJSON)
    const userId = await DatosDelCliente.id
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexClienteAPP.php"
    return await ConnectDB(CreateSQLRequest.GetUserData(await userId), phpAddress, "object")
}

const updateSession = async () => {
    const clientData = await getClientData()
    const promociones = await CarregaPromociones()
    Session.set("DatosDelCliente", JSON.stringify(clientData[0]));
    Session.set("Promociones", JSON.stringify(promociones));
    Session.set("isUserAuthenticated", true);
}

const CarregaPromociones = async () => {
    const dbName = "registro_de_promociones"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexPromocion.php";
    const promociones = await ConnectDB(CreateSQLRequest.SelectWhereLike('Disponibilidad', 'TodosLosClientes', dbName), phpAddress, "object")
    return promociones
}

const calculateVisits = json => {
    const visits = getJson(json)
    return visits === '' ? 0 : visits.length
}

const calculatePoints = puntos => {
    const basePoints = { puntosDisponibles: 0 }
    const points = getJson(puntos)
    return points === '' ? basePoints : points
}

const getJson = json => {
    const parsedJSON = json === '' || undefined ? '' : json ? JSON.parse(json) : ""
    return parsedJSON
}