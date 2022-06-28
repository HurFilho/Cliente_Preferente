import { useState } from "react"
import { EditarVisita } from "./EditarVisita"

export const DetalhesDeVisita = (props) => {
    const [editaVisita, setEditaVisita] = useState(false)
    const [visita, setVisita] = useState({})
    const [visitas, setVisitas] = useState(props.children)
    const [chosenVisit, setChosenVisit] = useState()
    // const [puntos, setPuntos] = useState()

    const preparaPuntos = () => {
        const puntos = []
        visitas.map(item => { puntos.push(item) })
    }

    preparaPuntos()

    const editarVisita = (e) => {
        const id = e.target.id
        setChosenVisit(id)
        setVisita(props.children[id])
        editaVisita ? setEditaVisita(false) : setEditaVisita(true)
    }

    const cancelar = () => {
        editaVisita ? setEditaVisita(false) : setEditaVisita(true)
    }

    const confirmar = (puntos, consumo) => {
        let tempVisitas = visitas
        tempVisitas[chosenVisit].puntos = parseInt(puntos)
        tempVisitas[chosenVisit].consumo = consumo
        setVisitas(tempVisitas)
        editaVisita ? setEditaVisita(false) : setEditaVisita(true)
        props.edited(visitas)
    }

    return <>
        {
            editaVisita &&
            <EditarVisita confirmar={confirmar} cancelar={cancelar}>{visita}</EditarVisita>
        }
        {
            !editaVisita &&
            <>
                <h3 style={{ marginTop: "1em" }}><strong>Registro de Visitas</strong></h3>
                <table className='table table-responsiv e table-striped' style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th scope="col">Fecha de la visita</th>

                            <th scope="col">Valor consumado</th>
                            <th scope="col"> Puntos agregados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.children.map((item, index) => {
                                return (
                                    <tr key={"tr_id_" + index} >
                                        <td key={"fecha_" + index}>{item.fecha}</td>
                                        <td key={"valor_" + index} style={{ textAlign: "left", textIndent: "30%" }}>{MexicanPeso.format(item.consumo)}</td>
                                        <td key={"puntos_" + index}>{item.puntos}</td>
                                        <td key={"button_" + index}>
                                            <input type="button" className="btn btn-secondary" id={index.toString()}
                                                name="Editar" value="Editar Visita" onClick={(e) => editarVisita(e)} />
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </>
        }

    </>
}

const MexicanPeso = Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
});