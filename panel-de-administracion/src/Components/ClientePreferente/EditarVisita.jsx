import './EditarVisita.css'
import CurrencyInput from 'react-currency-input-field';
import { useState } from "react"

export const EditarVisita = (props) => {
    const [consumo, setConsumo] = useState(props.children.consumo)
    const [puntos, setPuntos] = useState(props.children.puntos)

    const updateConsumo = value => {
        setConsumo(value)
        // updatePuntos((value / 100 * 5).toFixed(0))
    }
    const updatePuntos = e => {
        const value = e.target.value
        setPuntos(value)
        // updateConsumo((value / 100 * 5).toFixed(0))
    }

    const confirmar = () => {
        // props.children.puntos = puntos
        // props.children.consumo = consumo
        props.confirmar(puntos, consumo)
    }

    return <>
        <h3 style={{ marginTop: "1em" }}><strong>Editar Visita</strong></h3>
        <div className="card edita-visita">
            <div className="row">
                <div className="col-6">
                    <h6><strong>Fecha de la visita</strong></h6>
                    <div className='form-control'>{props.children.fecha}</div>
                </div>
                <div className="col-3">
                    <h6><strong>Valor Consumado</strong></h6>
                    <CurrencyInput className="form-control" id="Puntos"
                        name="Puntos" placeholder="0.00" decimalsLimit={2}
                        prefix="$" defaultValue={consumo}
                        onValueChange={(value) => updateConsumo(value)} />
                </div>
                <div className="col-3">
                    <h6><strong>Puntos Agregados</strong></h6>
                    <input type="number" className='form-control' value={puntos} onChange={e => updatePuntos(e)} />
                </div>
            </div>
            <div className="row">
                <div className="col"></div>
                <input className="btn btn-secondary col" type="button" name="Cancelar" id="Cancelar" value="Cancelar" onClick={props.cancelar} />
                <input className="btn btn-success col" type="button" name="Confirmar" id="Confirmar" value="Confirmar" onClick={confirmar} />
                <div className="col"></div>
            </div>
        </div>
    </>
}