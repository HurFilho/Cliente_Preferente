import React from "react";
import QrGenerator from "./QrGenerator"

// const initialData = {
//     Titulo: "",
//     Descripcion: "",
//     DiaInicio: "",
//     MesInicio: "",
//     AnoInicio: "",
//     DiaFinal: "",
//     MesFinal: "",
//     AnoFinal: "",
//     QrCode: "",
//     id: "",
//     isSubmitted: false,
//     Confirmacion: false,
// };


class CardDePromocion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Promociones: []
        };
    }

    componentDidMount() {
        const fetchTableData = async () => {
            const Promociones = await this.props.Promociones
            console.log(Promociones)
            this.setState({
                Promociones
            })
        }
        fetchTableData()
    }

    render() {
        return (
            <>
                <div className="align-mid row">
                    {
                        this.state.Promociones.map((item) => {
                            return (
                                <div style={{ width: "20%", border: "0", minWidth: "400px" }} key={"Key_id_" + item.id} name="CardPromocion" id="CardPromocion">
                                    <div className="card" style={{ padding: ".4em", backgroundColor: "#CCC", marginBottom: "1em" }}>
                                        <div className="card" style={{ fontSize: "1.5em", fontWeight: "500", marginBottom: ".4em", padding: ".4em", backgroundColor: "#444", color: "white" }} key={"Titulo_id_" + item.id}>{item.Titulo}</div>
                                        <div key={"Descripcion_id_" + item.id} style={{ padding: ".2em" }}>{item.Descripcion}</div>
                                        <div className="card">
                                            <div className="row" style={{ height: "200%", alignItems: "center", padding: "0", margin: "0" }}>
                                                <div className="col-6 align-mid" style={{ padding: "0" }} >
                                                    <label htmlFor="FechaDeInicio" style={{ fontSize: "1em", fontWeight: "500", marginTop: ".4em" }}>Fecha de Inicio</label>
                                                    <div name="FechaDeInicio" style={{ fontSize: "1.2em", fontWeight: "500" }} key={"FechaDeInicio_id_" + item.id}><i>{item.FechaDeInicio}</i></div>
                                                    <label htmlFor="FechaFinal" style={{ fontSize: "1em", fontWeight: "500", marginTop: "1em" }} className="col">Fecha Final</label>
                                                    <div name="FechaFinal" style={{ fontSize: "1.2em", fontWeight: "500" }} key={"FechaFinal_id_" + item.id}><i>{item.FechaFinal}</i></div>
                                                </div>
                                                <div className="col-6 align-mid" style={{ padding: "0" }}>
                                                    <QrGenerator key={"QrCode_id_" + item.id} codigo={item.QrCode} onclick="window.print();return false;" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                {/* 
                <div className="container-fluid card" style={{ padding: '1em' }}>
                    <h1 className="card card-title2 align-mid" style={{ borderRadius: "0 0 5px 5px" }}>{"promociones(this.props.Promociones)"}</h1>
                    <span className="card col" style={{ textAlign: 'left', padding: "0.4em 1em 0.4em 1em", marginTop: "1em" }} data-type="selectors">
                        <label className="form-label" htmlFor="Titulo">Título</label>

                        <div id="AyudaTitulo" className="form-text">Use un nombre que llame la atención de sus Clientes Preferentes.</div>
                    </span>
                </div> */}
            </>
        );
    }
}

export default CardDePromocion;