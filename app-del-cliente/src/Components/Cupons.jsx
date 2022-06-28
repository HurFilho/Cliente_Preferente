import React from "react";
import Session from 'react-session-api'
import CardDePromocion from './CardDePromocion/CardDePromocion'

class Coupons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            DatosDelCliente: [],
            HayCupons: false,
        };
    }


    componentDidMount() {
        const fetchTableData = async () => {
            var DatosDelCliente = await Session.items().DatosDelCliente
            const Promociones = await Session.items().Promociones
            if (!DatosDelCliente) fetchTableData()
            else {
                DatosDelCliente = await JSON.parse(DatosDelCliente)
                this.setState({ HayCupons: Promociones.length > 0 ? true : false, DatosDelCliente })
            }
        }
        fetchTableData()
    }

    render() {
        return (
            <>
                <div className="card" style={{ backgroundColor: "#2A9D8F" }}>
                    <h1 className="card-title align-mid">Coupons</h1>
                </div>
                {
                    this.state.HayCupons &&
                    <CardDePromocion />
                }
                {
                    !this.state.HayCupons &&
                    <>
                        <div>
                            <h2 className="align-mid" style={{ margin: "15% 0 15% 0" }}>No hay cupones disponibles.</h2>
                        </div>
                    </>
                }
            </>
        );
    }
}

export default Coupons;