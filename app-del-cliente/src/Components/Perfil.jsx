import React from "react";
import VerPerfil from './VerPerfil'
import Session from 'react-session-api'

class Perfil extends React.Component {


    render() {
        return (
            <>
                <div className="card" style={{ backgroundColor: "#66A0B7" }}>
                    <h1 className="card-title align-mid">Perfil</h1>
                </div>
                {/* <EditarPerfil /> */}
                <VerPerfil />
            </>
        );
    }
}

export default Perfil;
