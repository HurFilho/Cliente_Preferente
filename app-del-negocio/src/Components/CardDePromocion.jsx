import React from "react";
import Session from 'react-session-api'
import QrGenerator from "./QrGenerator"

class CardDePromocion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Promocion: [],

        };

    }

    componentDidMount() {
        const fetchTableData = async () => {
            let Promocion = await Session.items().promocionToLoad
            this.setState({ Promocion })
        }
        fetchTableData()
    }

    render() {

        return (
            <div className="card" style={{ width: "90%", margin: "1vw", maxWidth: '650px' }}
                key={"Key_id_" + this.state.Promocion.id}
                name="CardPromocion"
                id="CardPromocion">
                <div className="card row no-margin">
                    <div style={{ backgroundColor: "#FFF" }}>
                        <div className="card no-margin align-left" key={"Titulo_id_" + this.state.Promocion.id}
                            style={{
                                fontSize: 'calc(12px + 1vw)', fontWeight: "600", borderRadius: ".25rem .25rem 0 0",
                                color: "#FFF", padding: "1vw 0 1vw 3vw", backgroundColor: "#444"
                            }}>
                            {this.state.Promocion.Titulo}
                        </div>
                        <div className="row">

                            <div className="col no-margin align-left"
                                key={"Descripcion_id_" + this.state.Promocion.id}
                                style={{ fontSize: 'calc(8px + .8vw)', padding: "1vw 0 0 3vw", fontStyle: "italic", }}>
                                {this.state.Promocion.Descripcion}
                            </div>
                            <div style={{ width: 'calc(40px + 8vw)' }}>
                                <QrGenerator className='col'
                                    key={"QrCode_id_" + this.state.Promocion.id}
                                    codigo={this.state.Promocion.QrCode}
                                    id={this.state.Promocion.QrCode} />
                            </div>
                        </div>
                        {
                            this.state.Promocion.FechaFinal != '-' &&
                            <div className="align-right row" >
                                <div htmlFor="FechaFinal"
                                    style={{ fontSize: 'calc(8px + 1vw)', fontWeight: "400", margin: "0 2em 0 0" }}
                                    key={"FechaFinal_id_" + this.state.Promocion.id}>
                                    <i>{`Válido hasta ${this.state.Promocion.FechaFinal}`}</i>
                                </div>
                            </div>
                        }
                        {/* <div style={{ width: '50px' }}>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default CardDePromocion;