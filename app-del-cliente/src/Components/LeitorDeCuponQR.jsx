import React, { Component } from "react";
import QrReader from 'react-qr-reader-es6';
import ConnectDB from "./ConnectDB/ConnectDB";
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";
import Session from 'react-session-api'

const checkValidQrCode = async (qrcode) => {
    const dbName = "registro_de_promociones"
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexPromocion.php";
    return (await ConnectDB(CreateSQLRequest.CheckQrCodePromotion(dbName, qrcode), phpAddress, "boolean"))
}

const checkNewQrCode = async (qrcode, promocionesDelCliente) => {
    let answer = false
    if (promocionesDelCliente.length === 0) return true
    else {
        for (let promocion of promocionesDelCliente) {
            if (promocion.qrcode === qrcode) {
                answer = false
            } else answer = true
        }
        return answer
    }
}

const addCupon = async (promociones, id) => {
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexClienteAPP.php";
    return (await ConnectDB(CreateSQLRequest.AddQrCode(await promociones, id), phpAddress, "object"))
}

const prepareData = async (qrcode, data) => {
    var promociones = []
    if (data.length > 0) {
        for (let promocion of data) {
            promociones.push(promocion)
        }
    }
    promociones.push({ qrcode: qrcode, available: true })
    return [{
        "columnName": "Promociones",
        "value": promociones
    }]
}

const confirmAddedQrCode = async (qrcode, userId) => {
    const clientData = await getClientData(userId)
    var answer = true
    const promociones = await JSON.parse(clientData[0].Promociones)
    for (let promocion of promociones) {
        if (promocion.qrcode === qrcode) {
            answer = true
        } else answer = false
    }
    return answer
}

const getClientData = async (userId) => {
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexClienteAPP.php"
    // console.log(await ConnectDB(CreateSQLRequest.GetUserData(userId), phpAddress, "object"))
    return await ConnectDB(CreateSQLRequest.GetUserData(userId), phpAddress, "object")
}

const updateSession = async (userId) => {
    const datosDelCliente = await getClientData(userId)
    const datosDelClienteJSON = JSON.stringify(datosDelCliente[0])
    console.log(datosDelClienteJSON)
    Session.set("DatosDelCliente", datosDelClienteJSON);
    Session.set("isUserAuthenticated", true);
}

class QrContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: "Mantenga el código QR firme y claro para escanear",
            scanning: true,
            scanned: false,
            validQrCode: true,
            newQrCode: true,
            DatosDelCliente: [],
        }
        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(qrcode) {
        if (qrcode !== null) {
            const userId = this.state.DatosDelCliente.id
            const promociones = this.state.DatosDelCliente.Promociones
            const fetchData = async () => {
                if (await checkValidQrCode(qrcode)) {
                    if (await checkNewQrCode(qrcode, JSON.parse(promociones))) {
                        await addCupon(await prepareData(qrcode, await JSON.parse(promociones)), userId)
                        if (await confirmAddedQrCode(qrcode, userId)) {
                            await updateSession(userId)
                            this.setState({ scanning: false, scanned: true, validQrCode: true, nuevoQrCode: true })
                        }
                    } else {
                        this.setState({ newQrCode: false, scanning: false, scanned: false })
                    }
                } else {
                    this.setState({ validQrCode: false, scanning: false, scanned: false })
                }
            }
            fetchData()
        }
    }

    componentDidMount() {
        const fetchData = async () => {
            var DatosDelCliente = await Session.items().DatosDelCliente
            if (!DatosDelCliente) fetchData()
            else {
                DatosDelCliente = await JSON.parse(DatosDelCliente)
                this.setState({
                    DatosDelCliente
                })
            }
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
            // height: "150vh",
            // height: "inherit",
            // width: "100%",
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
                        <div className="card align-mid" style={{ margin: "15%", fontSize: "150%" }}>
                            <h1 style={{ margin: "1em" }}>¡Cupón añadido con éxito!</h1>
                        </div>
                    </>
                }
                {!this.state.newQrCode &&
                    <>
                        <div className="card align-mid" style={{ margin: "15%", fontSize: "100%" }}>
                            <h1 style={{ margin: "1em" }}>El código QR de este cupón se ha agregado anteriormente, un cupón solo se puede agregar una vez.</h1>
                        </div>
                    </>
                }
                {!this.state.validQrCode &&
                    <>
                        <div className="card align-mid" style={{ margin: "15%", fontSize: "100%" }}>
                            <h1 style={{ margin: "1em" }}>Este código QR no es un cupón válido, solo se aceptan cupones proporcionados por el restaurante asociado.</h1>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default QrContainer;





