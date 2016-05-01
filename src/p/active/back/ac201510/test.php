<?php

	/*error_reporting(0);*/
	header("Content-type: application/json");
	$page =$_GET["page"];
	$callback = $_GET['callback'];
	$nrr =	array("status"=>"none");
	$arr1 = array("status"=>"succ",
		"data" =>array("artList"=>array(
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/test3.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
            array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
            ),
			"page"=>2,
			)
	);
	$arr2 = array("status"=>"succ",
		"data" =>array("artList"=>array(
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/test11.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
            array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
			array("imgHref"=>"http://misc.jjcdn.com/p/active/ac201506/pubuliu-info.html",
            "imgSrc"=>"http://misc.jjcdn.com/p/active/ac201506/img/pubuliu_data.jpg",
            "imgWidth"=>"369",
            "imgHeight"=>"345",
            "imgName"=>"小马迷迷",
            "imgContent"=>"用户使用心得内容用户使用心得内容心得内容心得内容心得内容心得内容用户使用心得内容用户使用心得内容用户使用心得"),
            ),
			"page"=>3,
			)
	);
	/*$arr = array("status"=>"succ","data" =>array("isYzmOvertime"=>"false"));
	$err = array("status"=>"succ","data" =>array("isYzmOvertime"=>"true"));
	if ($yzm == $yzm_data) {
		echo $callback.'('.json_encode($arr).')';
	}else{
		echo $callback.'('.json_encode($err).')';
	}*/

	switch ($page) {
		case 1:
			echo $callback.'('.json_encode($arr1).')';
			break;
		case 2:
			echo $callback.'('.json_encode($arr2).')';
			break;
		case 3:
			echo $callback.'('.json_encode($nrr).')';
			break;
	}
	
?>