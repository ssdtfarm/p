<?php
	$callback = $_GET["callback"];
	$t = 1200;
	$str = array("status"=>"suc","time"=>$t);
	echo $callback.'('.json_encode($str).')';
?>