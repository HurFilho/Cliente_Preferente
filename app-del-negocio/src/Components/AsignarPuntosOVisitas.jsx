import React, { useEffect } from "react";
import LeerQrDeCliente from "./LeerQrDeCliente";
import { AsignarButton } from "./StyledComponents/Buttons";
import { HeaderContainer, HeaderCenterText } from './StyledComponents/Header'

class AsignarPuntosOVisitas extends React.Component {

    _isMounted = false

    constructor(props) {
        super(props);
        window.updatePage = this
        this.state = {
            // CargarPerfil: false,
            LeerCodigoQR: false,
            isLoading: true,
        };
        this.leerQR = this.leerQR.bind(this);
        this.reset = this.reset.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        returnHere = returnHere.bind(this)

    }

    leerQR(e = null) {
        console.log(e)
        e ? this.setState({ LeerCodigoQR: true }) : void 0
    }

    // loadProfile() {
    //     // this._isMounted = true;
    //     console.log(1)
    //     // this.componentDidMount()
    //     const fetchData = async () => {
    //         console.log(2)
    //         if (!this.state.isLoading) {
    //             console.log(3)
    //             // this.setState({ isLoading: false })
    //             this.setState({ LeerCodigoQR: false });
    //             this.setState({ CargarPerfil: true })
    //         } else fetchData()
    //     }
    //     fetchData()
    //     setTimeout(() => {
    //         // console.log(this.state.isLoading)
    //     }, 50);
    // }

    reset() {
        this.setState({ LeerCodigoQR: false, isLoading: true })
    }

    componentDidMount() {

        this._isMounted = true;

        if (this._isMounted) {
            this.setState({ isLoading: false })
        }
        // const fetchTableData = async () => {
        //     // var DatosDelCliente = await Session.items().DatosDelCliente
        //     // if (!DatosDelCliente) fetchTableData()
        //     // else {
        //     //     DatosDelCliente = await JSON.parse(DatosDelCliente)
        //     //     console.log(DatosDelCliente)
        //     //     let Promociones = await JSON.parse(DatosDelCliente.Promociones)
        //     //     this.setState({ Promociones, DatosDelCliente })
        //     //     this.setState({ VerCupones: Promociones.length > 0 ? true : false })
        //     // }
        // }
        // fetchTableData()
    }


    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <>
                <HeaderContainer>
                    <HeaderCenterText>Asignar Puntos o Visitas</HeaderCenterText>
                </HeaderContainer>
                {/* {
                    !this.state.LeerCodigoQR &&
                    <div className="align-mid">
                        <button className="btn card-button btn-secondary" style={{ margin: "5% 0 0", backgroundColor: "#3C6E71" }} type="button" id="VerCupones">
                            Asignar Puntos
                        </button>
                    </div>
                }
                {
                    !this.state.LeerCodigoQR &&
                    <div className="align-mid">
                        <button className="btn card-button btn-secondary" style={{ margin: "5% 0 0", backgroundColor: "#3C6E71" }} type="button" id="EscanearCodigoQr" onClick={this.handleClick}>
                            Asignar Visitas
                        </button>
                    </div>
                } */}
                {
                    !this.state.LeerCodigoQR &&
                    <>
                        <div className="row align-mid">
                            <div className="card align-mid info" style={{ width: "auto", margin: "1em", padding: "1em" }}>
                                Indique al cliente que abra su código QR de Cliente Preferente y apunte el lector de QR a este código.
                            </div>
                        </div>
                        <div className="align-mid">
                            <AsignarButton onClick={() => this.leerQR(true)}>Abrir lector de QR</AsignarButton>
                            {/* <AsignarButton onClick={e => this.leerQR(e)}>Abrir lector de QR</AsignarButton> */}
                        </div>
                    </>
                }
                {
                    this.state.LeerCodigoQR &&
                    <>
                        <div style={{ heigth: "50%" }}>
                            <LeerQrDeCliente />
                            <br />
                            <br />
                        </div>
                    </>

                }
            </>
        );
    }
}

export default AsignarPuntosOVisitas;

export async function returnHere() {
    this.reset()
}