import React from "react";
import ConnectDB from "../ConnectDB/ConnectDB";
import CreateSQLRequest from "../ConnectDB/CreateSQLRequest";
import QrGenerator from "../QrGenerator"

const dbName = "registro_de_clientes_preferentes"

const phpAddress = "http://" + document.location.hostname + "/src/api/indexCliente.php";
// const phpAddress = "http://" + document.location.hostname + "/ClientePreferente/src/api/indexCliente.php";
const initialData = {
    Nombre: "",
    Apellido: "",
    Dia: "",
    Mes: "",
    Ano: "",
    Telefono: "",
    Genero: "",
    CorreoElectronico: "",
    isSubmitted: false,
    Confirmacion: false,
};


class RegistrarClientePreferente extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialData;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.name) {
            case "Nombre":
                this.setState({ Nombre: event.target.value });
                break;
            case "Apellido":
                this.setState({ Apellido: event.target.value });
                break;
            case "Dia":
                this.setState({ Dia: event.target.value });
                break;
            case "Mes":
                this.setState({ Mes: event.target.value });
                break;
            case "Ano":
                this.setState({ Ano: event.target.value });
                break;
            case "CorreoElectronico":
                this.setState({ CorreoElectronico: event.target.value });
                break;
            case "Telefono":
                this.setState({ Telefono: formatToPhone(event.target.value) });
                break;
            case "Genero":
                this.setState({ Genero: event.target.value });
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
        this.setState({ Telefono: formatToPhone(this.state.Telefono) });
    }

    handleSubmit(event) {
        const fetchTableData = async () => {
            if (await checkFields(this.state)) {
                if (await RegisterData([{
                    "N": this.state.Nombre,
                    "A": this.state.Apellido,
                    "G": this.state.Genero,
                    "F": this.state.Ano + - + this.state.Mes + - + this.state.Dia,
                    "C": this.state.CorreoElectronico,
                    "T": this.state.Telefono,

                    // if (await RegisterData([{
                    //     "columnName": "Nombre",
                    //     "value": this.state.Nombre
                    // },
                    // {
                    //     "columnName": "Genero",
                    //     "value": this.state.Genero
                    // },
                    // {
                    //     "columnName": "FechaDeNacimiento",
                    //     "value": this.state.FechaDeNacimiento
                    // },
                    // {
                    //     "columnName": "CorreoElectronico",
                    //     "value": this.state.CorreoElectronico
                    // },
                    // {
                    //     "columnName": "Telefono",
                    //     "value": this.state.Telefono
                },])
                ) {
                    this.setState({ isSubmitted: true })
                    this.setState({ Confirmacion: true })
                    this.setState({ Nombre: "" });
                    this.setState({ Apellido: "" });
                    this.setState({ Genero: "" });
                    this.setState({ FechaDeNacimiento: "" });
                    this.setState({ CorreoElectronico: "" });
                    this.setState({ Telefono: "" });
                    // document.getElementById("Telefono").blur()
                    setTimeout(() => {
                        this.setState({ Confirmacion: false })
                        // document.getElementById("Nombre").focus()
                    }, 8000)
                }
            }
        }
        fetchTableData()
        event.preventDefault();
    }

    render() {
        return (
            <>
                {
                    !this.state.isSubmitted &&
                    <div className="card" style={{ padding: '1.5em', backgroundColor: "#EEE", maxWidth: "700px" }}>
                        <h1 className="card-title2 align-mid" style={{ margin: '.6em' }} >Registrar Cliente Preferente</h1>
                        <div id="FormRegistrarSucursal" >
                            <form onSubmit={this.handleSubmit}>
                                <div className="row" style={{ marginBottom: "1em" }}>
                                    <div className="col-5">
                                        <input type="text" placeholder="Nombre" className="form-control col" id="Nombre" name="Nombre" onChange={this.handleChange} value={this.state.Nombre} required autoFocus />
                                    </div>
                                    <div className="col-7">
                                        <input type="text" placeholder="Apellido" className="form-control col" id="Apellido" name="Apellido" onChange={this.handleChange} value={this.state.Apellido} required />
                                    </div>
                                </div>
                                <div className="card container" style={{ padding: ".3em" }} data-type="selectors" name="FechaDeNacimiento" id="FechaDeNacimiento" >
                                    <label htmlFor="Dia" className="label">Fecha de nacimiento</label>
                                    <div className="row" style={{ padding: "1em" }}>
                                        <select className="btn col-3 card" style={{ margin: "0 .4em 0 0" }} aria-label="D??a" name="Dia" id="Dia" title="D??a" value={this.state.Dia} onChange={this.handleChange} required>
                                            <option value="">D??a</option>
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

                                        <select className="btn col card" style={{ margin: "0 .4em 0 0" }} aria-label="Mes" name="Mes" id="Mes" title="Mes" value={this.state.Mes} onChange={this.handleChange} required>
                                            <option value="">Mes</option>
                                            <option value="01">Enero</option><option value="02">Febrero</option><option value="03">Marzo</option><option value="04">Abril</option><option value="05">Mayo</option><option value="06">Junio</option><option value="07">Julio</option><option value="08">Agosto</option><option value="09">Septiembre</option><option value="10">Octubre</option><option value="11">Noviembre</option><option value="12">Diciembre</option>
                                        </select>
                                        <select className="btn col-3 card" aria-label="A??o" name="Ano" id="Ano" title="A??o" value={this.state.Ano} onChange={this.handleChange} required>
                                            <option value="">A??o</option>
                                            <option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <span className="col">
                                        <div className="input-group">
                                            <input type="tel" placeholder="Tel??fono" className="form-control" id="Telefono" name="Telefono" value={formatToPhone(this.state.Telefono)} onChange={this.handleChange} pattern="[(]{1}[0-9]{3}[)]{1} [0-9]{3} - [0-9]{4}" maxLength="16" required />
                                        </div>
                                    </span>
                                    <span className="col-5">
                                        <div className="input-group">
                                            <select className="form-select" value={this.state.Genero} onChange={this.handleChange} lang="es" name="Genero" id="Genero" required>
                                                <option value="">G??nero</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                    </span>
                                </div>

                                <span className="col">
                                    <div className="input-group">
                                        <input type="email" placeholder="Correo Electronico" className="form-control" id="CorreoElectronico" name="CorreoElectronico" onChange={this.handleChange} value={this.state.CorreoElectronico} required />
                                    </div>
                                </span>
                                <span className="col-4">
                                    <input type="submit" id="Registrar" name="Registrar" value="Registrar" className="btn btn-primary " style={{ margin: '1em 0 0 0', width: "100%" }} onSubmit={this.handleSubmit.bind(this)} required />
                                    <button onClick={this.props.addClient} className="btn btn-secondary" style={{ margin: '1em 0 0 0', width: "100%" }} >Cancelar</button>
                                </span>
                            </form >
                        </div >
                    </div>
                }

                {
                    this.state.isSubmitted &&
                    <>
                        <div className="" style={{ marginTop: "2em", marginBottom: "2em" }}>
                            <h6>
                                <span className="alert alert-success align-items-center alert-dismissible fade show" role="alert">
                                    Cliente Preferente a??adido con ??xito!
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </span>
                            </h6>
                            <br />
                        </div>
                        <div className="container-fluid card" style={{ padding: "1em" }}>
                            <div className="container-fluid card card-title3">
                                Imprima este c??digo QR y use el lector en la aplicaci??n del Cliente Preferente para finalizar su registro.
                            </div>
                            <div className="container-fluid card">
                                <div>
                                    <QrGenerator codigo={qrMessage} onclick="window.print();return false;" />

                                    {/* <button onClick={this.handleChange.bind(this)} className="btn btn-outline-secondary no-print" id="imprimirCodigoQR" name="imprimirCodigoQR" value="Imprimir Codigo QR" style={{ width: "14em", marginBottom: "1em" }} ><i className="bi bi-printer-fill" />&emsp;Imprimir C??digo QR</button> */}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
        );
    }
}

export default RegistrarClientePreferente;

const formatToPhone = (telefono) => {
    const input = telefono.replace(/\D/g, '').substring(0, 10);
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) { telefono = `(${zip}) ${middle} - ${last}`; }
    else if (input.length > 3) { telefono = `(${zip}) ${middle}`; }
    else if (input.length > 0) { telefono = `(${zip}`; }
    return telefono
};

const checkFields = async (state) => {
    let columnsToCheck = [
        ["Telefono", state.Telefono],
        ["CorreoElectronico", state.CorreoElectronico]
    ]
    let validity = true
    for (let column of columnsToCheck) {
        if ((await ConnectDB(phpAddress, CreateSQLRequest.SelectWhereLike(dbName, column[0], column[1]), "object")).length) {
            let errorMessage = "El " + column[0].toLowerCase() + " que ingres?? ya ha sido registrado, por favor cheque este " + column[0].toLowerCase()
            document.getElementById(column[0]).setCustomValidity(errorMessage)
            document.getElementById(column[0]).reportValidity()
            validity = false
        }
    }
    return validity
}

let qrMessage = ""
async function RegisterData(dataToAdd) {
    // console.log(JSON.stringify(dataToAdd))
    qrMessage = JSON.stringify(dataToAdd)
    // return (await ConnectDB(phpAddress, CreateSQLRequest.Insert(dbName, dataToAdd), "boolean"))
    return true
}