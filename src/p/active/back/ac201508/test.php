<?php
     /*error_reporting(0);*/
     header("Content-type: application/json");
     $test = 4;
     $res =$_GET["setOff"];
     $callback = $_GET['callback'];
     $arr1 = array("status"=>"1","data"=>array("prize"=>0,"remainder"=>7),"msg"=>"success");
     $arr2 = array("status"=>"1","data"=>array("prize"=>4,"remainder"=>5),"msg"=>"success");
     $trr =  array("status"=>"-1");
     $nrr =  array("status"=>"-4");
     switch ($test) {
          case 1:
               echo $callback.'('.json_encode($arr1).')';
               break;
          case 2:
               echo $callback.'('.json_encode($arr2).')';
               break;
          case 3:
               echo $callback.'('.json_encode($trr).')';
               break;
          case 4:
               echo $callback.'('.json_encode($nrr).')';
               break;     
     }
?>