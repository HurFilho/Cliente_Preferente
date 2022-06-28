<?php

include("ClassSelection.php");

$Selection=new ClassSelection();
$MySqlParameter=json_decode(file_get_contents("php://input"),true);
$Selection->queryDb($MySqlParameter['Parameter']);



// if($Campo == null){
//     // $Selecao->selecao(null, null);
//     $Selecao->selecao(null);
// }else{
//     $Selecao->selecao($Campo['Parameter']);
// }