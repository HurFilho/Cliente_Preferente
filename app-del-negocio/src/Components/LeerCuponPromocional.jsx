import React, { useEffect } from "react";
import LeerQrDePromocion from "./LeerQrDePromocion";
import { LeerCuponButton } from "./StyledComponents/Buttons";
import { HeaderContainer, HeaderCenterText } from './StyledComponents/Header'

class LeerCuponPromocional extends React.Component {

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
                    <HeaderCenterText>Leer Cupon Promocional</HeaderCenterText>
                </HeaderContainer>
                {
                    !this.state.LeerCodigoQR &&
                    <>
                        <div className="row align-mid">
                            <div className="card align-mid info" style={{ width: "auto", margin: "1em", padding: "1em" }}>
                                Indique al cliente que abra su código QR proomocional y apunte el lector de QR a este código.
                            </div>
                        </div>
                        <div className="align-mid">
                            <LeerCuponButton onClick={() => this.leerQR(true)}>Abrir lector de QR</LeerCuponButton>
                        </div>
                    </>
                }
                {
                    this.state.LeerCodigoQR &&
                    <>
                        <div style={{ heigth: "50%" }}>
                            <LeerQrDePromocion />
                            <br />
                            <br />
                        </div>
                    </>

                }
            </>
        );
    }
}

export default LeerCuponPromocional;

export async function returnHere() {
    this.reset()
}