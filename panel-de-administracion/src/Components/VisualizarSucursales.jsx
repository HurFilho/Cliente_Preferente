import React, { Component } from 'react';
import ConnectDB from './ConnectDB/ConnectDB'
import CreateSQLRequest from './ConnectDB/CreateSQLRequest';

const dbName = "registro_de_sucursales"
const phpAddress = "http://" + document.location.hostname + "/src/api/indexSucursal.php";
// const phpAddress = "http://" + document.location.hostname + "/ClientePreferente/src/api/indexSucursal.php";

const dataTypeToRequest = "object"

class VisualizarSucursales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            test: "",
            tableData: []
        };
    }

    componentDidMount() {
        const fetchTableData = async () => {
            const tableData = await addID(await ConnectDB(phpAddress, CreateSQLRequest.SelectAll(dbName), dataTypeToRequest))
            this.setState({
                tableData
            })
        }
        fetchTableData()
    }

    render() {
        return (
            <>
                <div className="container-fluid" style={{ padding: "5px", backgroundColor: '#F5F3F4', borderRadius: '5px', display: "table" }}>
                    <h1 style={{ backgroundColor: '#DFDFDF', borderRadius: '5px', }}>Sucursales</h1>
                    <table className='table table-responsive table-striped'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Numero</th>
                                <th>Direccion</th>
                                <th>Usuario</th>
                                <th>Contrasena</th>
                                <th>Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tableData.map((item) => {
                                    return (
                                        <tr key={"tr_id_" + item.id}>
                                            <td key={"Nombre_id_" + item.id}>{item.Nombre}</td>
                                            <td key={"Numero_id_" + item.id}>{item.Numero}</td>
                                            <td key={"Direccion_id_" + item.id}>{item.Direccion}</td>
                                            <td key={"Usuario_id_" + item.id}>{item.Usuario}</td>
                                            <td key={"Contrasena_id_" + item.id}>{item.Contrasena}</td>
                                            <td key={"Telefono_id_" + item.id}>{item.Telefono}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

}
export default VisualizarSucursales

const addID = async (data) => {
    for (let id = 0; id < data.length; id++) {
        data[id].id = id.toString()
    }
    return await data
}