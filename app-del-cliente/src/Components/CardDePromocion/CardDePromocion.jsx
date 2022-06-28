import React from "react";
import Session from 'react-session-api'
import QrGenerator from "../QrGenerator"
import ConnectDB from "../ConnectDB/ConnectDB";
import CreateSQLRequest from "../ConnectDB/CreateSQLRequest";
import './style.css'

class CardDePromocion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            DatosDelCliente: [],
            Promociones: { disponible: [], usadas: [] },
            HayCupons: false,
            QrCodeFullscreen: false,
            QrCode: "",
            DisponibleTab: true,
        };
        this.agrandaQrCode = this.agrandaQrCode.bind(this);

    }

    agrandaQrCode(event) {
        this.setState({ QrCodeFullscreen: this.state.QrCodeFullscreen ? false : true })
        this.setState({ QrCode: event.target.id })
    }

    componentDidMount() {

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
                Promociones = await prepararPromociones(Promociones, await JSON.parse(this.state.DatosDelCliente.Promociones))
                this.setState({ Promociones })
                this.setState({ VerCupones: Promociones.length > 0 ? true : false })
            }
        }
        fetchPromociones()
    }

    changeTab(e) {
        this.setState({ DisponibleTab: e })
    }

    render() {
        return (
            <>
                {
                    this.state.DisponibleTab &&
                    <div className="align-mid row" style={{ width: "100%" }}>
                        <div className="row">
                            <input type="button" className='col btn btn-disponibilidad' value='Disponible'
                                style={{
                                    fontWeight: '600',
                                    borderRadius: '0',
                                    fontSize: 'calc(10px + .8vw)',
                                    heigth: 'calc(20px + 1vw)',
                                    borderBottom: 'solid #777',
                                    color: '#212529'
                                }} />
                            <input type="button" className='col btn btn-disponibilidad' value='Usados'
                                style={{
                                    fontWeight: '600',
                                    fontSize: 'calc(10px + .8vw)',
                                    heigth: 'calc(20px + 1vw)',
                                    borderRadius: '0'
                                }}
                                onClick={() => this.changeTab(false)} />
                            <div style={{ padding: 'calc(6px + .4vw)' }} />
                        </div>
                        {
                            this.state.QrCodeFullscreen &&
                            <div className="card" onClick={this.agrandaQrCode} id={this.state.QrCode}>
                                <QrGenerator codigo={createClientQrCode(
                                    this.state.DatosDelCliente.id,
                                    this.state.DatosDelCliente.CorreoElectronico,
                                    this.state.QrCode)} id={this.state.QrCode} />
                                <div style={{ fontSize: 'calc(12px + 2.2vw)' }} >
                                    Click en el código QR para alejar
                                </div>
                            </div>
                        }
                        {
                            !this.state.QrCodeFullscreen &&
                            <>
                                {
                                    this.state.Promociones.disponible.map((item) => {
                                        return (
                                            <div className="card" style={{ width: "90%", margin: "1vw", maxWidth: '600px' }}
                                                key={"Key_id_" + item.id}
                                                name="CardPromocion"
                                                id="CardPromocion">
                                                <div className="card row no-margin">
                                                    <div style={{ backgroundColor: "#FFF" }}>
                                                        <div className="card no-margin align-left" key={"Titulo_id_" + item.id}
                                                            style={{
                                                                fontSize: 'calc(12px + 1vw)', fontWeight: "600", borderRadius: ".25rem .25rem 0 0",
                                                                color: "#FFF", padding: "1vw 0 1vw 3vw", backgroundColor: "#444"
                                                            }}>
                                                            {item.Titulo}
                                                        </div>
                                                        <div className="no-margin align-left"
                                                            key={"Descripcion_id_" + item.id}
                                                            style={{ fontSize: 'calc(8px + .8vw)', padding: "1vw 0 0 3vw", fontStyle: "italic", }}>
                                                            {item.Descripcion}
                                                        </div>
                                                        <input className='btn btn-outline-secondary btn-sm'
                                                            id={item.QrCode}
                                                            style={{
                                                                margin: '1vw',
                                                                height: 'calc(12px + 2vw)',
                                                                fontSize: 'calc(6px + 1vw)',
                                                                padding: '4px 40px 4px 40px',
                                                                fontWeight: '500'
                                                            }}
                                                            onClick={this.agrandaQrCode}
                                                            type='button'
                                                            value='Mostrar código QR'>
                                                        </input>
                                                        {
                                                            item.FechaFinal !== '-' &&
                                                            <div className="align-right row" >
                                                                <div htmlFor="FechaFinal"
                                                                    style={{ fontSize: 'calc(8px + 1vw)', fontWeight: "400", margin: "0 2em 0 0" }}
                                                                    key={"FechaFinal_id_" + item.id}>
                                                                    <i>{`Válido hasta ${item.FechaFinal}`}</i>
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            item.FechaFinal === '-' &&
                                                            <div style={{ padding: 'calc(6px + .4vw)' }} />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </>
                        }
                    </div>
                }
                {
                    !this.state.DisponibleTab &&
                    <div className="align-mid row" style={{ width: "100%" }}>
                        <div className="row">
                            <input type="button" className='col btn btn-disponibilidad' value='Disponible'
                                style={{
                                    fontWeight: '600',
                                    borderRadius: '0',
                                    fontSize: 'calc(10px + .8vw)',
                                    heigth: 'calc(20px + 1vw)',
                                    borderBottom: 'solid #777',
                                    color: '#212529'
                                }}
                                onClick={() => this.changeTab(true)} />
                            <input type="button" className='col btn btn-disponibilidad' value='Usados'
                                style={{
                                    fontWeight: '600',
                                    fontSize: 'calc(10px + .8vw)',
                                    heigth: 'calc(20px + 1vw)',
                                    borderRadius: '0'
                                }} />
                            <div style={{ padding: 'calc(6px + .4vw)' }} />
                        </div>
                        {
                            this.state.QrCodeFullscreen &&
                            <div className="card" onClick={this.agrandaQrCode} id={this.state.QrCode}>
                                <QrGenerator codigo={createClientQrCode(
                                    this.state.DatosDelCliente.id,
                                    this.state.DatosDelCliente.CorreoElectronico,
                                    this.state.QrCode)} id={this.state.QrCode} />
                                <div style={{ fontSize: 'calc(12px + 2.2vw)' }} >
                                    Click en el código QR para alejar
                                </div>
                            </div>
                        }
                        {
                            !this.state.QrCodeFullscreen &&
                            <>
                                {
                                    this.state.Promociones.usadas.map((item) => {
                                        return (
                                            <div className="card" style={{ width: "90%", margin: "1vw", maxWidth: '600px' }}
                                                key={"Key_id_" + item.id}
                                                name="CardPromocion"
                                                id="CardPromocion">
                                                <div className="card row no-margin">
                                                    <div style={{ backgroundColor: "#FFF" }}>
                                                        <div className="card no-margin align-left" key={"Titulo_id_" + item.id}
                                                            style={{
                                                                fontSize: 'calc(12px + 1vw)',
                                                                fontWeight: "600",
                                                                borderRadius: ".25rem .25rem 0 0",
                                                                color: "#888",
                                                                padding: "1vw 0 1vw 3vw",
                                                                backgroundColor: "#D9D9D9"
                                                            }}>
                                                            {item.Titulo}
                                                        </div>
                                                        <div className="no-margin align-left"
                                                            key={"Descripcion_id_" + item.id}
                                                            style={{ fontSize: 'calc(8px + .8vw)', padding: "1vw 0 0 3vw", fontStyle: "italic", }}>
                                                            {item.Descripcion}
                                                        </div>
                                                        <div style={{ padding: 'calc(6px + .4vw)' }} />
                                                        {/* <input className='btn btn-outline-secondary btn-sm'
                                                            id={item.QrCode}
                                                            style={{
                                                                margin: '1vw',
                                                                height: 'calc(12px + 2vw)',
                                                                fontSize: 'calc(6px + 1vw)',
                                                                color: '#444',
                                                                padding: '4px 40px 4px 40px',
                                                                fontWeight: '500'
                                                            }}
                                                            onClick={this.agrandaQrCode}
                                                            type='button'
                                                            value='Mostrar código QR'>
                                                        </input> */}
                                                        {/* {
                                                            item.FechaFinal !== '-' &&
                                                            <div className="align-right row" >
                                                                <div htmlFor="FechaFinal"
                                                                    style={{ fontSize: 'calc(8px + 1vw)', fontWeight: "400", margin: "0 2em 0 0" }}
                                                                    key={"FechaFinal_id_" + item.id}>
                                                                    <i>{`Válido hasta ${item.FechaFinal}`}</i>
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            item.FechaFinal === '-' &&
                                                        } */}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </>
                        }
                    </div>
                }
                <div style={{ height: '80px' }} />
            </>
        );
    }
}

export default CardDePromocion;

const createClientQrCode = (id, CorreoElectronico, QrDePromocion) => {
    return (JSON.stringify({
        id: id,
        CE: CorreoElectronico,
        QR: QrDePromocion,
    }))
}

const prepararPromociones = async (promocionesAbertas, promocionesDelCliente) => {
    let promociones = { disponible: [], usadas: [] }
    for (let promocion of promocionesDelCliente) {
        promocion.available ? promociones.disponible.push(await getPromocionData(promocion.qrcode)) : promociones.usadas.push(await getPromocionData(promocion.qrcode))
    }
    for (let promocionAberta of promocionesAbertas) {
        let checkRepeating = false
        for (let promocionDelCliente of promocionesDelCliente) promocionDelCliente.qrcode === promocionAberta.QrCode ? checkRepeating = true : void 0
        !checkRepeating ? promociones.disponible.push(promocionAberta) : void 0
    }
    return promociones
}


const getPromocionData = async (QrCode) => {
    const dbName = "registro_de_promociones"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexPromocion.php";
    const promociones = await ConnectDB(CreateSQLRequest.SelectWhereLike('QrCode', QrCode, dbName), phpAddress, "object")
    return promociones[0]
}