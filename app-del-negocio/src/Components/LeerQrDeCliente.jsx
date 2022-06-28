import React, { Component } from "react";
import QrReader from 'react-qr-reader-es6';
import ConnectDB from "./ConnectDB/ConnectDB";
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";
import Session from 'react-session-api'
import PerfilDeClientePreferente from './PerfilDeClientePreferente'


class QrContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: "Mantenga el código QR firme y claro para escanear",
            scanning: true,
            scanned: false,
            validQrCode: true,
        }
        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(qrcode) {
        // qrcode = JSON.stringify({ "id": "0000000000002", "CorreoElectronico": "hur.filho@gmail.com" }) // comentar antes de compilar!!!!!!
        if (qrcode !== null) {
            const fetchData = async () => {
                if (await validateQrCode(qrcode)) {
                    Session.set("clientLoaded", true);
                    const DatosDelCliente = await getClientData(qrcode)
                    Session.set("DatosDelCliente", JSON.stringify(DatosDelCliente[0]));
                    this.setState({ scanning: false, scanned: true })
                } else {
                    this.setState({ validQrCode: false, scanning: false, scanned: false })
                }
            }
            fetchData()
        }
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
                        <PerfilDeClientePreferente />
                    </>
                }
                {!this.state.validQrCode &&
                    <>
                        <div className="card align-mid" style={{ margin: "15%", fontSize: "100%" }}>
                            <h1 style={{ margin: "1em" }}>Este código QR no es un código QR de Cliente Preferente. Por favor, compruebe el código escaneado.</h1>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default QrContainer;


const validateQrCode = async (qrcode) => {
    const QrCodeData = await validateAndParseJSON(qrcode)
    return QrCodeData.CorreoElectronico ? QrCodeData.id ? true : false : false
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

const getClientData = async (qrcode) => {
    const dbName = "registro_de_clientes_preferentes"
    const clientID = await validateAndParseJSON(qrcode)
    const phpAddress = "http://" + document.location.hostname + "/src/api/indexCliente.php"
    return await ConnectDB(phpAddress, CreateSQLRequest.GetClientData(dbName, clientID.id, clientID.CorreoElectronico), "object")
}

const updateSession = async (userId) => {
    Session.set("DatosDelCliente", JSON.stringify(getClientData(userId)));
    Session.set("isUserAuthenticated", true);
}