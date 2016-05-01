<?php
$arr = array("status"=>"succ","data"=>array(
	"applyType"=>"1",
	"applyTypeText"=>"退货退款",
	"applyReason"=>"1",
	"applyReasonText"=>"商品质量有问题",
	"applyAmount"=>"1800.00",
	"applyNote"=>"这里是备注的内容",
	"pictures"=>array(
			array(
				"thumbPic" => "http://misc.jjcdn.com/p/kindeditor/attached/image/20150316/20150316141248_30952.gif",
				"bigPic" => "http://misc.jjcdn.com/p/kindeditor/attached/image/20150316/20150316141248_30952.gif",
			),
			array(
				"thumbPic" => "http://misc.jjcdn.com/p/kindeditor/attached/image/20150316/20150316141248_30952.gif",
				"bigPic" => "http://misc.jjcdn.com/p/kindeditor/attached/image/20150316/20150316141248_30952.gif",
			)
		)
	));
echo json_encode($arr);
?>