import React, { Component } from "react";
import QrReader from 'react-qr-reader-es6';
import ConnectDB from "./ConnectDB/ConnectDB";
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";
import Session from 'react-session-api'
import CardDePromocion from './CardDePromocion'
import { returnHere } from './LeerCuponPromocional'

const loadPromocion = async (QrCodeOBJ) => {
    const dbName = "registro_de_promociones"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexPromocion.php";
    return (await ConnectDB(phpAddress, CreateSQLRequest.CheckQrCodePromotion(dbName, QrCodeOBJ.QR), "object"))
}

class QrContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: "Mantenga el código QR firme y claro para escanear",
            scanning: true,
            scanned: false,
            validQrCode: true,
            appliedCoupon: false,
            clientData: [],
        }
        this.handleScan = this.handleScan.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleScan(qrcode) {
        if (qrcode !== null) {
            const fetchData = async () => {
                const QrCodeOBJ = await getQrCode(qrcode)
                if (QrCodeOBJ) {
                    const promocion = await loadPromocion(QrCodeOBJ)
                    if (promocion) {
                        this.setState({ clientData: QrCodeOBJ })
                        await Session.set("promocionToLoad", promocion[0]);
                        this.setState({ scanning: false, scanned: true, validQrCode: true })
                    } else {
                        this.setState({ scanning: true, scanned: false, validQrCode: false })
                    }
                } else {
                    this.setState({ scanning: true, scanned: false, validQrCode: false })
                }
            }
            fetchData()
        } else {
            this.setState({ scanning: true, scanned: false, validQrCode: false })
        }
    }

    handleSubmit() {
        const fetchData = async () => {
            if (applyCoupon(this.state.clientData)) {
                this.setState({ appliedCoupon: true, scanned: false })
                setTimeout(() => {
                    returnHere()
                }, 3000);
            }
        }
        fetchData()
    }

    componentDidMount() {
        const fetchData = async () => {
            // var DatosDelCliente = await Session.items().DatosDelCliente
            // if (!DatosDelCliente) fetchData()
            // else {
            //     DatosDelCliente = await JSON.parse(DatosDelCliente)
            //     this.setState({
            //         DatosDelCliente
            //     })
            // }
        }
        fetchData()
    }

    handleError(err) {
        // console.log(err)
    }

    render() {
        const previewStyle = {
            height: "90vh",
            width: "90vh",
            display: 'flex',
            justifyContent: "center",
        }

        const camStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }

        const textStyle = {
            fontSize: "30px",
            textAlign: "center",
            marginTop: "-50px",
        }

        return (
            <>
                {this.state.scanning &&
                    <>
                        <div style={{ width: "100%" }} name="teste">
                            {/* <div name="teste"> */}
                            <div style={camStyle}>
                                <QrReader
                                    delay={100}
                                    style={previewStyle}
                                    onError={this.handleError}
                                    onScan={this.handleScan}
                                />
                            </div>
                        </div>
                    </>
                }
                {this.state.scanned &&
                    <>
                        <div className="align-mid" style={{ margin: "1em" }}>
                            <CardDePromocion />
                            <div className="card col-12 align-mid"
                                style={{
                                    width: "90%",
                                    maxWidth: '650px',
                                    margin: "4vw",
                                    padding: "1em",
                                    fontSize: 'calc(8px + 1vw)',
                                    backgroundColor: '#284B63',
                                    color: "#FFF"
                                }}>
                                <p><strong>¡La promoción es válida para este Cliente Preferente!</strong></p>
                                <p><strong>Aplique el descuento haciendo clic en el botón abajo:</strong></p>
                            </div>
                            <button className="btn btn-success"
                                style={{
                                    width: "calc(200px + 8vw)",
                                    height: "calc(40px + 3vw)",
                                    alignSelf: 'center',
                                    margin: '2vw',
                                    fontWeight: '500',
                                    fontSize: 'calc(10px + 2vw)'
                                }}
                                type="button"
                                id="buttonGuardar"
                                onClick={this.handleSubmit}
                                disabled={this.state.Guardar}>
                                Aplicar Cupón
                            </button>
                        </div>
                    </>
                }
                {
                    !this.state.validQrCode &&
                    <>
                        <div className="card align-mid" style={{ margin: "15%", fontSize: "100%" }}>
                            <h1 style={{ margin: "1em" }}>Este código QR no es un código QR promocional. Por favor, compruebe el código escaneado.</h1>
                        </div>
                    </>
                }
                {
                    this.state.appliedCoupon &&
                    <>
                        <div className="card align-mid" style={{ margin: "15%", fontSize: "100%", backgroundColor: "#a7d379", color: "#FFF" }}>
                            <h1 style={{ margin: "1em" }}>¡Cupón aplicado con éxito!</h1>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default QrContainer;


const getQrCode = async (qrcode) => {
    const QrCodeData = await validateAndParseJSON(qrcode)
    return await validateQrCode(QrCodeData) ? QrCodeData : false
}

const validateQrCode = async (QrCodeData) => {
    return QrCodeData.CE ? QrCodeData.QR ? QrCodeData.id ? true : false : false : false
}

const validateAndParseJSON = async (qrcode) => {
    try {
        const data = await JSON.parse(qrcode)
        return data
    }
    catch (err) {
        return false
    }
}

const getClientData = async (id, CorreoElectronico) => {
    const dbName = "registro_de_clientes_preferentes"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexCliente.php"
    return await ConnectDB(phpAddress, CreateSQLRequest.GetClientData(dbName, id, CorreoElectronico), "object")
}

const applyCoupon = async (clientCoupon) => {
    const ClientData = await getClientData(clientCoupon.id, clientCoupon.CE)
    const Promociones = await validateAndParseJSON(ClientData[0].Promociones)
    return await updatePromociones(await preparePromociones(Promociones, clientCoupon.QR), clientCoupon.id) ? true : false
}

const preparePromociones = async (promociones, qrcode) => {
    if (promociones.length > 0) {
        for (var i = 0; i < promociones.length; i++) {
            promociones[i].qrcode === qrcode ? promociones[i].available = false : promociones[i].available = promociones[i].available
        }
    }
    return JSON.stringify(promociones)
}

const updatePromociones = async (promociones, id) => {
    const dbName = "registro_de_clientes_preferentes"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexCliente.php"
    return (await ConnectDB(phpAddress, CreateSQLRequest.UpdatePromociones(dbName, promociones, id), "object"))
}
