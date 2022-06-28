import React from "react";
import Session from 'react-session-api'
import { NavLink } from 'react-router-dom'
import { LeerCuponButton, AsignarButton } from "./StyledComponents/Buttons";
import { HeaderContainer, HeaderLeftText } from './StyledComponents/Header'

class Inicio extends React.Component {

    _isMounted = false

    constructor(props) {
        super(props);
        window.updatePage = this
        this.state = {
            DatosDeSucursal: [],
            ViewButtons: true,
            isLoading: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    updatePage() {
        const fetchData = async () => {
            !this.state.isLoading ? this.setState({ ViewButtons: true }) : fetchData()
        }
        fetchData()

    }

    handleClick(event) {
        switch (event.target.id) {
            case "EscanearCodigoQr":
                this.setState({ ViewButtons: false })
                break;
            default:
                break;
        }
        setTimeout(() => {
            // console.log(this.state)
        }, 50);
        document.getElementById(event.target.id).setCustomValidity("")
        document.getElementById(event.target.id).reportValidity()
    }

    componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
            this.setState({ isLoading: false })
        }
        const fetchTableData = async () => {
            var DatosDeSucursal = await Session.items().DatosDeSucursal
            if (!DatosDeSucursal) fetchTableData()
            else {
                // console.log(DatosDeSucursal)
                DatosDeSucursal = await JSON.parse(DatosDeSucursal)
                // console.log(DatosDeSucursal)
                //     let Promociones = await JSON.parse(DatosDeSucursal.Promociones)
                this.setState({ DatosDeSucursal })
                //     this.setState({ VerCupones: Promociones.length > 0 ? true : false })
            }
        }
        fetchTableData()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                {
                    this.state.ViewButtons &&
                    <HeaderContainer>
                        <HeaderLeftText>
                            Hola, {this.state.DatosDeSucursal.Nombre} {this.state.DatosDeSucursal.Apellido}
                        </HeaderLeftText>
                    </HeaderContainer>
                }
                {
                    this.state.ViewButtons &&
                    <div className="align-mid">
                        <NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/leer-cupon-promocional`}>
                            <LeerCuponButton primary>Abonar cupón promocional del Cliente</LeerCuponButton>
                        </NavLink>
                    </div>
                }
                {
                    this.state.ViewButtons &&
                    <div className="align-mid">
                        <NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/asignar-puntos-o-visitas`}>
                            <AsignarButton>Asignar puntos o visitas a Cliente Preferente</AsignarButton>
                        </NavLink>
                    </div>
                }
            </>
        );
    }
}

export default Inicio;

export async function returnHome() {
}