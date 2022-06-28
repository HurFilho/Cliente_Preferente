import React from 'react';
import ConnectDB from '../ConnectDB/ConnectDB'
import CreateSQLRequest from '../ConnectDB/CreateSQLRequest';

const dbName = "registro_de_clientes_preferentes"
// const phpAddress = "http://" + document.location.hostname + "/ClientePreferente/src/api/indexCliente.php";
const phpAddress = "http://" + document.location.hostname + "/src/api/indexCliente.php";

export default class VisualizarClientesPreferentes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            test: "",
            tableData: []
        };
    }

    componentDidMount() {
        const fetchTableData = async () => {
            const tableData = await addID(await ConnectDB(phpAddress, CreateSQLRequest.SelectAll(dbName), "object"))
            // console.log(tableData)
            this.setState({
                tableData
            })
        }
        fetchTableData()
    }

    render() {
        return (
            <div>
                <div className="container-fluid" style={{ padding: "5px", backgroundColor: '#F5F3F4', borderRadius: '5px', display: "table" }}>
                    <h1 style={{ backgroundColor: '#DFDFDF', borderRadius: '5px', }}>Clientes preferentes</h1>
                    <table className='table-responsive table table-striped'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Género</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Correo Electronico</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tableData.map((item) => {
                                    return (
                                        <tr key={"tr_id_" + item.id}>
                                            <td key={"Nombre_id_" + item.id}>{item.Nombre}</td>
                                            <td key={"Apellido_id_" + item.id}>{item.Apellido}</td>
                                            <td key={"Genero_id_" + item.id}>{item.Genero}</td>
                                            <td key={"FechaDeNacimiento_id_" + item.id}>{item.FechaDeNacimiento}</td>
                                            <td key={"CorreoElectronico_id_" + item.id}>{item.CorreoElectronico}</td>
                                            <td key={"Telefono_id_" + item.id}>{item.Telefono}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const addID = async (data) => {
    for (let id = 0; id < data.length; id++) {
        data[id].id = id.toString()
    }
    return await data
}