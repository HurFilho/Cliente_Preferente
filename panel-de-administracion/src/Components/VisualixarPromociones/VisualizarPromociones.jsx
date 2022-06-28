import React from "react";
import ConnectDB from "../ConnectDB/ConnectDB";
import CreateSQLRequest from "../ConnectDB/CreateSQLRequest";
import CardDePromocion from "../CardDePromocion"
import QrGenerator from "../QrGenerator"
import './styles.css'


const dbName = "registro_de_promociones"

const phpAddress = "http://" + document.location.hostname + "/src/api/indexPromocion.php";

class VisualizarPromociones extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expandQrCode: false,
            chosenQrCode: "",
            Promociones: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.expandQrCode = this.expandQrCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    expandQrCode(event) {
        this.setState({ chosenQrCode: event.target.id })
        this.setState({ expandQrCode: this.state.expandQrCode ? false : true })
    }

    handleChange(event) {
        // switch (event.target.name) {
        //     case "Titulo":
        //         this.setState({ Titulo: event.target.value });
        //         break;
        //     case "Descripcion":
        //         this.setState({ Descripcion: event.target.value });
        //         break;
        //     case "DiaInicio":
        //         this.setState({ DiaInicio: event.target.value });
        //         break;
        //     case "MesInicio":
        //         this.setState({ MesInicio: event.target.value });
        //         break;
        //     case "AnoInicio":
        //         this.setState({ AnoInicio: event.target.value });
        //         break;
        //     case "DiaFinal":
        //         this.setState({ DiaFinal: event.target.value });
        //         break;
        //     case "MesFinal":
        //         this.setState({ MesFinal: event.target.value });
        //         break;
        //     case "AnoFinal":
        //         this.setState({ AnoFinal: event.target.value });
        //         break;
        //     case "CrearOtra":
        //         this.setState(initialData)
        //         // this.setState({ isSubmitted: false });
        //         break;
        //     case "imprimirCodigoQR":
        //         window.print()
        //         break;

        //     default:
        //         break;
        // }
        // console.log(this.state)
        // document.getElementById(event.target.name).setCustomValidity("")
        // document.getElementById(event.target.name).reportValidity()
    }

    componentDidMount() {
        const fetchPromociones = async () => {
            const promociones = await Promociones()
            this.setState({ Promociones: promociones });
        }
        fetchPromociones()
    }

    handleSubmit(event) {

    }

    render() {
        return (
            <>
                {
                    !this.state.expandQrCode &&
                    <div className="card" style={{ backgroundColor: "#EEE", padding: ".6em", minWidth: '390px' }}>
                        <h1 className="card-title2 align-mid col" style={{ margin: ".6em" }}>Promociones</h1>
                        <div className="align-mid row">
                            {
                                this.state.Promociones.map((item) => {
                                    return (
                                        <div className='col' style={{ border: "0", minWidth: "380px", maxWidth: '720px' }} key={"Key_id_" + item.id}>
                                            <div className="card" style={{ padding: ".4em", backgroundColor: "#CCC", marginBottom: "1em" }}>
                                                <div className="card"
                                                    key={"Titulo_id_" + item.id}
                                                    style={{
                                                        fontSize: "1.5em",
                                                        fontWeight: "500",
                                                        marginBottom: ".2em",
                                                        padding: ".4em",
                                                        backgroundColor: "#444", color: "white"
                                                    }}>
                                                    {item.Titulo}
                                                </div>
                                                <div className="card">
                                                    <div
                                                        key={"Descripcion_id_" + item.id}
                                                        style={{
                                                            backgroundColor: '#F8F8F8',
                                                            padding: "1vh 2vw",
                                                            textAlign: 'left',
                                                            fontSize: 'calc(8px + .6vw)'

                                                        }}>
                                                        {item.Descripcion}
                                                    </div>
                                                    <div className="row align-mid"
                                                        style={{ padding: "0", margin: "0" }}>
                                                        <input className='btn btn-outline-secondary btn-sm'
                                                            id={item.QrCode}
                                                            onClick={this.expandQrCode}
                                                            type='button'
                                                            value='Mostrar código QR'>
                                                        </input>
                                                        <div className="input-group mb-1" style={{ justifyContent: 'center' }}>
                                                            <div className="input-group-text">
                                                                <input className="form-check-input" type="checkbox"
                                                                    checked={item.Disponibilidad === 'TodosLosClientes' ? true : false}
                                                                    disabled name="Disponibilidad" />
                                                                {item.Disponibilidad === 'TodosLosClientes' &&
                                                                    <label htmlFor="Disponibilidad">
                                                                        Disponible para todos los clientes
                                                                    </label>
                                                                }
                                                                {item.Disponibilidad !== 'TodosLosClientes' &&
                                                                    <label htmlFor="Disponibilidad" style={{ color: '#888' }}>
                                                                        Disponible para todos los clientes
                                                                    </label>
                                                                }
                                                            </div>
                                                        </div>
                                                        {
                                                            item.FechaFinal !== '-' &&
                                                            <div className="align-right row" >
                                                                <div htmlFor="FechaFinal"
                                                                    style={{
                                                                        fontSize: 'calc(8px + .6vw)',
                                                                        fontWeight: "500",
                                                                        margin: "1vh",
                                                                    }}
                                                                    key={"FechaFinal_id_" + item.id}>
                                                                    <i>{`Promoción válida hasta ${item.FechaFinal}`}</i>
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
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
                {
                    this.state.expandQrCode &&
                    <div onClick={this.expandQrCode}>
                        <div style={{ fontSize: 'calc(12px + 2.2vw)' }} >
                            Click en el código QR para alejar
                            <QrGenerator id={this.state.chosenQrCode} codigo={this.state.chosenQrCode} />
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default VisualizarPromociones;


const Promociones = async () => {
    const promociones = await ConnectDB(phpAddress, CreateSQLRequest.SelectAll(dbName), "object")
    return promociones
}