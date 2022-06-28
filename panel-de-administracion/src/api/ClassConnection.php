<?php

abstract class ClassConnection {

    #database connection
    protected function connectDB()
    {
        try{
            $Connection=new PDO("mysql:host=localhost;dbname=cliente_preferente","root","");
            // $Connection=new PDO("mysql:host=localhost;dbname=react","root","");
            $Connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $Connection;
        }catch (PDOException $Error){
            return $Error->getMessage();
        }
    }
}