<?php

include("ClassConnection.php");

class ClassSelection extends ClassConnection{

    #select data on database
    public function queryDb( $MySQLCommand ){
        $Crud=$this->connectDB()->prepare( $MySQLCommand );
        $Crud->execute();

        $position=0;
        $receivedData=[];
        
        while($Fetch=$Crud->fetch(PDO::FETCH_ASSOC)){
            $receivedData[$position]=[
                "id"=>$Fetch['id'],
                "Nombre"=>$Fetch['Nombre'],
                "Numero"=>$Fetch['Numero'],
                "Telefono"=>$Fetch['Telefono'],
                "Direccion"=>$Fetch['Direccion'],
                "Usuario"=>$Fetch['Usuario'],
                "Contrasena"=>$Fetch['Contrasena'],
                "Puntos"=>$Fetch['Puntos'],
                "Visitas"=>$Fetch['Visitas'],
            ];
            $position++;
        }
        header("Access-Control-Allow-Origin: *");
        header("Content-type: application/json");
        // header('Access-Control-Allow-Origin', 'http://localhost:3000');
        header('Access-Control-Allow-Credentials', 'true');
        echo json_encode($receivedData);
    }
}



// <br />
// <b>Warning</b>:  Undefined array key "Modelo" in <b>C:\xampp\htdocs\ClientePreferente\src\api\ClassSelecao.php</b> on line <b>27</b><br />
// [{"Resposta":null}]