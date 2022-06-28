import React from 'react';
import Session from 'react-session-api'
import QrGenerator from "./QrGenerator"


class VerPerfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            DatosDelCliente: [],
            QrCodeFullscreen: false,
        };
        this.agrandaQrCode = this.agrandaQrCode.bind(this);
    }

    agrandaQrCode(event) {
        this.setState({ QrCodeFullscreen: this.state.QrCodeFullscreen ? false : true })
        setTimeout(() => {
            console.log(this.state.QrCodeFullscreen)
        }, 50);
    }

    componentDidMount() {
        const fetchTableData = async () => {
            var DatosDelCliente = await Session.items().DatosDelCliente
            if (!DatosDelCliente) fetchTableData()
            else {
                DatosDelCliente = await JSON.parse(DatosDelCliente)
                this.setState({
                    DatosDelCliente
                })
            }
        }
        fetchTableData()
    }

    render() {
        return (
            <div>
                {
                    this.state.QrCodeFullscreen &&
                    <div className="card" onClick={this.agrandaQrCode}>
                        <QrGenerator codigo={createClientQrCode(this.state.DatosDelCliente.id, this.state.DatosDelCliente.CorreoElectronico)} id="QrCode" />
                        <div style={{ fontSize: "200%" }} >Click en el código QR para alejar</div>
                    </div>
                }
                {
                    !this.state.QrCodeFullscreen &&
                    <div>
                        <div className='align-mid' style={{ margin: "5%" }}>
                            <div className='row' style={{ margin: ".2em 1em .2em 1em" }}>
                                <div className='col-6 card align-mid'>
                                    <div style={{ alignItems: "baseline", backgroundColor: '#F0F0F0', margin: '.4vw' }}>
                                        <label htmlFor='Nombre'>Nombre</label>
                                        <h5 id='Nombre' className='col' >{this.state.DatosDelCliente.Nombre} {this.state.DatosDelCliente.Apellido}</h5>
                                    </div>
                                    <div style={{ alignItems: "baseline", backgroundColor: '#F0F0F0', margin: '.4vw' }}>
                                        <label htmlFor='FechaDeNacimiento'>Fecha de Nacimiento</label>
                                        <h5 id='FechaDeNacimiento' className='col' >{this.state.DatosDelCliente.FechaDeNacimiento}</h5>
                                    </div>
                                    <div style={{ alignItems: "baseline", backgroundColor: '#F0F0F0', margin: '.4vw' }}>
                                        <label htmlFor='Genero'>Género</label>
                                        <h5 id='Genero' className='col' >{this.state.DatosDelCliente.Genero}</h5>
                                    </div>
                                    <div style={{ alignItems: "baseline", backgroundColor: '#F0F0F0', margin: '.4vw' }}>
                                        <label htmlFor='CorreoElectronico'>Correo Electronico</label>
                                        <h5 id='CorreoElectronico' className='col' >{this.state.DatosDelCliente.CorreoElectronico}</h5>
                                    </div>
                                    <div style={{ alignItems: "baseline", backgroundColor: '#F0F0F0', margin: '.4vw' }}>
                                        <label htmlFor='Genero'>Teléfono</label>
                                        <h5 id='Genero' className='col' >{this.state.DatosDelCliente.Telefono}</h5>
                                    </div>
                                </div>
                                <div className='col-2 align-mid' />
                                <div className='col-4 align-mid'>
                                    <br />
                                    <div className='card' onClick={this.agrandaQrCode}>
                                        <QrGenerator codigo={createClientQrCode(this.state.DatosDelCliente.id, this.state.DatosDelCliente.CorreoElectronico)} id="QrCode" />
                                        <div style={{ fontSize: "80%" }} >Click en el código QR para agrandar</div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                }
            </div>
        );
    }

}

export default VerPerfil

const createClientQrCode = (id, CorreoElectronico) => {
    return (JSON.stringify({
        id: id,
        CorreoElectronico: CorreoElectronico
    }))
}