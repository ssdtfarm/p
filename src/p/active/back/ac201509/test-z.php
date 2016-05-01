<?php
     /*error_reporting(0);*/
     header("Content-type: application/json");
     $test = 7;
     $res =$_GET["checkIn"];
     $callback = $_GET['callback'];
     $arr1 = array("result"=>"1","times"=>"0","type"=>1);
     $arr2 = array("result"=>"-1","times"=>"0","type"=>1);
     $arr3 = array("result"=>"1","times"=>"1","type"=>1);
     $arr4 = array("result"=>"-1","times"=>"1","type"=>1);
     $arr5 = array("result"=>"1","times"=>"2","type"=>1);
     $arr6 = array("result"=>"-1","times"=>"2","type"=>1);
     $arr7 = array("result"=>"1","times"=>"3","type"=>1);
     $arr8 = array("result"=>"-1","times"=>"3","type"=>1);
     switch ($test) {
          case 1:
               echo $callback.'('.json_encode($arr1).')';
               break;
          case 2:
               echo $callback.'('.json_encode($arr2).')';
               break;
          case 3:
               echo $callback.'('.json_encode($arr3).')';
               break; 
          case 4:
               echo $callback.'('.json_encode($arr4).')';
               break;    
          case 5:
               echo $callback.'('.json_encode($arr5).')';
               break;    
          case 6:
               echo $callback.'('.json_encode($arr6).')';
               break;
          case 7:
               echo $callback.'('.json_encode($arr7).')';
               break;    
          case 8:
               echo $callback.'('.json_encode($arr8).')';
               break;                   
     }
?>