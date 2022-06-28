import React from "react";
import ConnectDB from "./ConnectDB/ConnectDB";
import CreateSQLRequest from "./ConnectDB/CreateSQLRequest";
import QrGenerator from "./QrGenerator"

const dbName = "registro_de_promociones"

const phpAddress = "http://" + document.location.hostname + "/src/api/indexPromocion.php";

const initialData = {
    Titulo: "",
    Descripcion: "",
    DiaInicio: "",
    MesInicio: "",
    AnoInicio: "",
    DiaFinal: "",
    MesFinal: "",
    AnoFinal: "",
    QrCode: "",
    id: "",
    ConFechas: false,
    Disponible: true,
    isSubmitted: false,
    Confirmacion: false,
};


class CrearPromocion extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialData;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.name) {
            case "Titulo":
                this.setState({ Titulo: event.target.value });
                break;
            case "Descripcion":
                this.setState({ Descripcion: event.target.value });
                break;
            case "checkConFechas":
                this.setState({ ConFechas: (this.state.ConFechas) ? false : true });
                break;
            case "checkDisponible":
                this.setState({ Disponible: (this.state.Disponible) ? false : true });
                break;
            case "DiaInicio":
                this.setState({ DiaInicio: event.target.value });
                break;
            case "MesInicio":
                this.setState({ MesInicio: event.target.value });
                break;
            case "AnoInicio":
                this.setState({ AnoInicio: event.target.value });
                break;
            case "DiaFinal":
                this.setState({ DiaFinal: event.target.value });
                break;
            case "MesFinal":
                this.setState({ MesFinal: event.target.value });
                break;
            case "AnoFinal":
                this.setState({ AnoFinal: event.target.value });
                break;
            case "CrearOtra":
                this.setState(initialData)
                // this.setState({ isSubmitted: false });
                break;
            case "imprimirCodigoQR":
                window.print()
                break;

            default:
                break;
        }
        document.getElementById(event.target.name).setCustomValidity("")
        document.getElementById(event.target.name).reportValidity()
    }

    componentDidMount() {
        // this.setState({ Telefono: formatToPhone(this.state.Telefono) });
    }

    handleSubmit(event) {
        const fetchTableData = async () => {
            if (await RegisterData([{
                "columnName": "id",
                "value": await createId()
            },
            {
                "columnName": "Titulo",
                "value": this.state.Titulo
            },
            {
                "columnName": "Descripcion",
                "value": this.state.Descripcion
            },
            {
                "columnName": "FechaDeInicio",
                "value": (this.state.ConFechas ? (this.state.AnoInicio + "-" + this.state.MesInicio + "-" + this.state.DiaInicio) : "-")
            },
            {
                "columnName": "FechaFinal",
                "value": (this.state.ConFechas ? (this.state.AnoFinal + "-" + this.state.MesFinal + "-" + this.state.DiaFinal) : "-")
            },
            {
                "columnName": "Disponibilidad",
                "value": (this.state.Disponible ? 'TodosLosClientes' : 'ClientesSeleccionados')
            },
            {
                "columnName": "QrCode",
                "value": await qrCode()
            },
            ])
            ) {
                this.setState({ Confirmacion: true })
                this.setState({ isSubmitted: true });
                setTimeout(() => {
                    this.setState({ Confirmacion: false })
                }, 8000)
            }
            // }
        }
        fetchTableData()
        event.preventDefault();
    }

    render() {
        return (
            <>
                {
                    !this.state.isSubmitted &&
                    <div className="card" style={{ padding: '.6em', backgroundColor: "#EEE", maxWidth: "600px", minWidth: "450px" }}>
                        <h1 className="card-title2 align-mid" style={{ margin: '.6em' }} >Crear Nueva Promoción</h1>
                        <div id="FormCrearPromocion" >
                            <form onSubmit={this.handleSubmit}>
                                <span className="card col" style={{ textAlign: 'left', padding: "0.4em 1em 0.4em 1em" }} data-type="selectors">
                                    <label className="form-label" htmlFor="Titulo">Título</label>
                                    <input type="text" placeholder="Título de la promoción" className="form-control" id="Titulo" name="Titulo" onChange={this.handleChange} value={this.state.Titulo} required autoFocus />
                                    <div id="AyudaTitulo" className="form-text">Use un nombre que llame la atención de sus Clientes Preferentes.</div>
                                </span>
                                <span className="card col" style={{ textAlign: 'left', padding: "0.4em 1em 0.4em 1em", margin: "1em 0 1em 0" }} data-type="selectors">
                                    <label className="form-label" htmlFor="Descripcion">Descripción</label>
                                    <textarea type="text" placeholder="Descripción de la promoción" className="form-control" id="Descripcion" name="Descripcion" onChange={this.handleChange} value={this.state.Descripcion} style={{ height: "4.4em" }} required />
                                    <div id="AyudaDescripcion" className="form-text">Describir de manera que el cliente preferido comprenda fácilmente la promoción.</div>
                                </span>
                                <div className="form-check" style={{ textAlign: 'justify' }} >
                                    <label className="form-switch" htmlFor="checkDisponible">
                                        <input className="form-check-input" type="checkbox" checked={this.state.Disponible} id="checkDisponible" name="checkDisponible" onChange={this.handleChange} />
                                        ¿Promoción disponible para todos los clientes?
                                    </label>
                                </div>
                                {
                                    !this.state.Disponible &&
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <div id="AyudaDisponible" className="form-text" style={{
                                            width: '90%',
                                            background: '#ffe819a6',
                                            borderRadius: '0 10px 10px 10px',
                                            padding: '4px',
                                            color: '#222222'
                                        }}>
                                            Desmarcando esta opción el cliente preferente necesitará escanear este código para agregarlo y poder usarlo
                                        </div>
                                    </div>

                                }

                                <div className="form-check" style={{ marginTop: "1em", textAlign: 'justify' }} >
                                    <label className="form-switch" htmlFor="checkConFechas">
                                        <input className="form-check-input" type="checkbox" checked={this.state.ConFechas} id="checkConFechas" name="checkConFechas" onChange={this.handleChange} />
                                        ¿Promoción con fecha de inicio y de finalización?
                                    </label>
                                </div>
                                {
                                    this.state.ConFechas &&
                                    <>
                                        <div className="row">
                                            <span className="card col" style={{ textAlign: 'left', padding: "12px", marginTop: "1em" }} data-type="selectors" name="FechaDeInicio" id="FechaDeInicio" >
                                                <label htmlFor="DiaInicio" style={{ fontSize: "80%", fontWeight: "500" }} className="label">Fecha de inicio de la promoción</label>
                                                <span className="row">
                                                    <select className="btn col-3 card" style={{ margin: ".4em" }} aria-label="Día" name="DiaInicio" id="DiaInicio" title="Día" value={this.state.DiaInicio} onChange={this.handleChange} required>
                                                        <option value="">Día</option>
                                                        <option value="01">01</option><option value="02">02</option><option value="03">03</option>
                                                        <option value="04">04</option><option value="05">05</option><option value="06">06</option>
                                                        <option value="07">07</option><option value="08">08</option><option value="09">09</option>
                                                        <option value="10">10</option><option value="11">11</option>
                                                        <option value="12">12</option><option value="13">13</option>
                                                        <option value="14">14</option><option value="15">15</option>
                                                        <option value="16">16</option><option value="17">17</option>
                                                        <option value="18">18</option><option value="19">19</option>
                                                        <option value="20">20</option><option value="21">21</option>
                                                        <option value="22">22</option><option value="23">23</option>
                                                        <option value="24">24</option><option value="25">25</option>
                                                        <option value="26">26</option><option value="27">27</option>
                                                        <option value="28">28</option><option value="29">29</option>
                                                        <option value="30">30</option><option value="31">31</option>
                                                    </select>

                                                    <select className="btn col card" style={{ margin: ".4em" }} aria-label="MesInicio" name="MesInicio" id="MesInicio" title="MesInicio" value={this.state.MesInicio} onChange={this.handleChange} required>
                                                        <option value="">Mes</option>
                                                        <option value="01">Enero</option><option value="02">Febrero</option><option value="03">Marzo</option><option value="04">Abril</option><option value="05">Mayo</option><option value="06">Junio</option><option value="07">Julio</option><option value="08">Agosto</option><option value="09">Septiembre</option><option value="10">Octubre</option><option value="11">Noviembre</option><option value="12">Diciembre</option>
                                                    </select>
                                                    <select className="btn col-3 card" style={{ margin: ".4em" }} aria-label="Año" name="AnoInicio" id="AnoInicio" title="Año" value={this.state.AnoInicio} onChange={this.handleChange} required>
                                                        <option value="">Año</option>
                                                        <option value="2030">2030</option>
                                                        <option value="2029">2029</option>
                                                        <option value="2028">2028</option>
                                                        <option value="2027">2027</option>
                                                        <option value="2026">2026</option>
                                                        <option value="2025">2025</option>
                                                        <option value="2024">2024</option>
                                                        <option value="2023">2023</option>
                                                        <option value="2022">2022</option>                                                    </select>
                                                </span>
                                            </span>
                                        </div>

                                        <div className="row">
                                            <span className="card col" style={{ textAlign: 'left', padding: "12px", marginTop: "1em" }} data-type="selectors" name="FechaDeFinal" id="FechaDeFinal" >
                                                <label htmlFor="DiaFinal" style={{ fontSize: "80%", fontWeight: "500" }} className="label">Fecha final de la promoción</label>
                                                <span className="row">
                                                    <select className="btn col-3 card" style={{ margin: ".4em" }} aria-label="Día" name="DiaFinal" id="DiaFinal" title="Día" value={this.state.DiaFinal} onChange={this.handleChange} required>
                                                        <option value="">Día</option>
                                                        <option value="01">01</option><option value="02">02</option><option value="03">03</option>
                                                        <option value="04">04</option><option value="05">05</option><option value="06">06</option>
                                                        <option value="07">07</option><option value="08">08</option><option value="09">09</option>
                                                        <option value="10">10</option><option value="11">11</option>
                                                        <option value="12">12</option><option value="13">13</option>
                                                        <option value="14">14</option><option value="15">15</option>
                                                        <option value="16">16</option><option value="17">17</option>
                                                        <option value="18">18</option><option value="19">19</option>
                                                        <option value="20">20</option><option value="21">21</option>
                                                        <option value="22">22</option><option value="23">23</option>
                                                        <option value="24">24</option><option value="25">25</option>
                                                        <option value="26">26</option><option value="27">27</option>
                                                        <option value="28">28</option><option value="29">29</option>
                                                        <option value="30">30</option><option value="31">31</option>
                                                    </select>

                                                    <select className="btn col card" style={{ margin: ".4em" }} aria-label="MesFinal" name="MesFinal" id="MesFinal" title="MesFiNAL" value={this.state.MesFinal} onChange={this.handleChange} required>
                                                        <option value="">Mes</option>
                                                        <option value="01">Enero</option><option value="02">Febrero</option><option value="03">Marzo</option><option value="04">Abril</option><option value="05">Mayo</option><option value="06">Junio</option><option value="07">Julio</option><option value="08">Agosto</option><option value="09">Septiembre</option><option value="10">Octubre</option><option value="11">Noviembre</option><option value="12">Diciembre</option>
                                                    </select>
                                                    <select className="btn col-3 card" style={{ margin: ".4em" }} aria-label="Año" name="AnoFinal" id="AnoFinal" title="Año" value={this.state.AnoFinal} onChange={this.handleChange} required>
                                                        <option value="">Año</option>
                                                        <option value="2030">2030</option>
                                                        <option value="2029">2029</option>
                                                        <option value="2028">2028</option>
                                                        <option value="2027">2027</option>
                                                        <option value="2026">2026</option>
                                                        <option value="2025">2025</option>
                                                        <option value="2024">2024</option>
                                                        <option value="2023">2023</option>
                                                        <option value="2022">2022</option>
                                                    </select>
                                                </span>
                                            </span>
                                        </div>
                                    </>
                                }
                                <span className="col-4">
                                    <div className="input-group mb align-mid">
                                        <input type="submit" style={{ marginTop: "1em" }} id="Crear" name="Crear" value="Crear Promoción" className="btn btn-success" onSubmit={this.handleSubmit.bind(this)} required />
                                    </div>
                                </span>
                            </form >
                        </div >
                    </div >
                }

                {
                    this.state.Confirmacion &&

                    <div className="container-fluid align-mid" style={{ marginTop: "2em" }}>
                        <h6>
                            <span className="alert alert-success alert-dismissible fade show" role="alert">
                                Promoción creada con éxito!
                                <button type="button" className="btn btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </span>
                        </h6>
                        <br />
                    </div>
                }

                {
                    this.state.isSubmitted &&
                    <>
                        <div className="container card" style={{ padding: "1em" }}>
                            <h1 className="container card card-title2 align-mid" style={{ borderRadius: "0 0 5px 5px", marginBottom: "1em" }}>{this.state.Titulo}</h1>
                            <div className="container-fluid align-mid" style={{ fontWeight: "600", marginBottom: "1em", width: "90%" }}>{this.state.Descripcion}</div>

                            <div className="row" name="Fechas">
                                <div className="col">
                                    <span className="card col" style={{ textAlign: 'left', padding: "12px", marginTop: "1em" }}>
                                        <label className="align-mid" style={{ fontSize: "100%" }} htmlFor="FechaDeInicioText">Fecha de inicio de la promoción</label>
                                        <div className="col align-mid" style={{ fontSize: "150%", fontWeight: "600" }} name="FechaDeInicioText" id="FechaDeInicioText" >{this.state.AnoInicio + "/" + this.state.MesInicio + "/" + this.state.DiaInicio}</div>
                                    </span>
                                </div>
                                <div className="col">
                                    <span className="card col" style={{ textAlign: 'left', padding: "12px", marginTop: "1em" }}>
                                        <label className="align-mid" style={{ fontSize: "100%" }} htmlFor="FechaFinalText">Fecha final de la promoción</label>
                                        <div className="col align-mid" style={{ fontSize: "150%", fontWeight: "600" }} name="FechaDeFinalText" id="FechaDeFinalText" >{this.state.AnoFinal + "/" + this.state.MesFinal + "/" + this.state.DiaFinal}</div>
                                    </span>
                                </div>
                            </div>


                            <div className="container-fluid card" style={{ textAlign: 'left', padding: "12px", marginTop: "1em" }}>
                                <div>
                                    <QrGenerator codigo={"jsiiojsoijsios"} onclick="window.print();return false;" />

                                    {/* <button onClick={this.handleChange.bind(this)} className="btn btn-secondary no-print" id="imprimirCodigoQR" name="imprimirCodigoQR" value="Imprimir Codigo QR" style={{ width: "14em", marginBottom: "1em" }} ><i className="bi bi-printer-fill" />&emsp;Imprimir Código QR</button> */}
                                </div>
                            </div>
                        </div>
                        <span className="col-4">
                            <div className="input-group mb">
                                <input type="button" style={{ marginTop: "1em" }} id="CrearOtra" name="CrearOtra" value="Crear otra Promoción" className="btn btn-primary col-12" onClick={this.handleChange} required />
                            </div>
                        </span>
                    </>
                }
            </>
        );
    }
}

export default CrearPromocion;


const randomString = () => {
    return Math.random().toString(36).substring(2, 15)
}

const qrCode = async () => {
    const tempString = (randomString() + randomString() + randomString() + randomString())
    if (await checkFields(tempString)) {
        return (tempString)
    } else await qrCode()
}

const createId = async () => {
    const tempId_1 = await ConnectDB(phpAddress, CreateSQLRequest.SelectAll(dbName), "object")
    const tempId_2 = await addZeros(parseInt(tempId_1[tempId_1.length - 1].id) + 1)
    return await checkId(tempId_2) ? (tempId_2) : createId()
}

const checkFields = async (QrCode) => {
    const columnsToCheck = [
        ["QrCode", QrCode],
    ]
    for (let column of columnsToCheck) {
        if ((await ConnectDB(phpAddress, CreateSQLRequest.SelectWhereLike(dbName, column[0], column[1]), "object")).length) {
            return false
        } else return true
    }
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

async function RegisterData(dataToAdd) {
    // console.log(CreateSQLRequest.Insert(dbName, dataToAdd), "boolean")
    return (await ConnectDB(phpAddress, CreateSQLRequest.Insert(dbName, dataToAdd), "boolean"))
}