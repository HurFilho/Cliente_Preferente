import React from 'react';
import Login from './Components/Login'
import Session from 'react-session-api'
import BottomHeader from './Components/BottomHeader'


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Login: true,
            SesionActiva: false,
            DatosDeSucursal: [],
        }
        returnToApp = returnToApp.bind(this)
    }

    render() {
        return (
            <>
                {
                    this.state.Login &&
                    <div className="card appScreen phoneScreen">
                        <Login />
                    </div>
                }
                {
                    this.state.SesionActiva &&
                    <BottomHeader style={{ width: "100%" }} />
                }

            </>
        )
    }
}

export default App

export async function returnToApp(data) {
    this.setState({ Login: false });
    this.setState({ SesionActiva: true })
    const fetchTableData = async () => {
        const DatosDeSucursal = data[0]
        Session.set("DatosDeSucursal", JSON.stringify(DatosDeSucursal));
        Session.set("isUserAuthenticated", true);
        Session.set("clientLoaded", false);
        this.setState({
            DatosDeSucursal
        })
    }
    fetchTableData()
}