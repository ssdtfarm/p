<?php 
	$code = rand(9999,1000);
	$data = array("status"=>"succ","data"=>$code);
	echo json_encode($data);
 ?>