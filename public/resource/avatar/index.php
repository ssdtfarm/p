<?php
/**
 * 程序运行标识
 */
if(defined('InShopNC')) {
	include(BasePath.DS.'config.ini.php');
	if(!empty($config) && is_array($config)){
		$site_url = $config['site_url'];
		$version = $config['version'];
		$setup_date = $config['setup_date'];
		$gip = $config['gip'];
		$dbtype = $config['dbdriver'];
		$dbcharset = $config['db'][1]['dbcharset'];
		$dbserver = $config['db'][1]['dbhost'];
		$dbserver_port = $config['db'][1]['dbport'];
		$dbname = $config['db'][1]['dbname'];
		$db_pre = $config['tablepre'];
		$dbuser = $config['db'][1]['dbuser'];
		$dbpasswd = $config['db'][1]['dbpwd'];
		$file_expire = $config['session_expire'];
		$lang_type = $config['lang_type'];
		$cookie_pre = $config['cookie_pre'];
		$tpl_name = $config['tpl_name'];
	}
	define('SITEURL', $site_url.'/');//网站地址
} else {
	define('InShopNC',true);
	include(dirname(dirname(dirname(dirname(__DIR__)))).'/src/config.ini.php');
	if(!empty($config) && is_array($config)){
		$site_url = $config['site_url'];
		$version = $config['version'];
		$setup_date = $config['setup_date'];
		$gip = $config['gip'];
		$dbtype = $config['dbdriver'];
		$dbcharset = $config['db'][1]['dbcharset'];
		$dbserver = $config['db'][1]['dbhost'];
		$dbserver_port = $config['db'][1]['dbport'];
		$dbname = $config['db'][1]['dbname'];
		$db_pre = $config['tablepre'];
		$dbuser = $config['db'][1]['dbuser'];
		$dbpasswd = $config['db'][1]['dbpwd'];
		$file_expire = $config['session_expire'];
		$lang_type = $config['lang_type'];
		$cookie_pre = $config['cookie_pre'];
		$tpl_name = $config['tpl_name'];
	}
	define('SITEURL', $site_url.'/');//网站地址
}

$conf= array(
	'dbhost' =>$dbserver,
	'dbname' =>$dbname,
	'dbport' =>$dbserver_port ,
	'dbuser' =>$dbuser,
	'dbpwd' =>$dbpasswd,
	'tablepre' =>$db_pre,
	'dbcharset'=>$dbcharset,
	 );
define('CONF', json_encode($conf));
define('ROOT', dirname(__FILE__).'/');
define('DATADIR', dirname(__FILE__).'/');//图片存放目录
define('DIR', '/resource/avatar/');//index.php所在目录
define('DATAURL', 'http://misc.jinhaimaimg.cn'.DIR);//图片地址
	function getgpc($k, $var='R') {
		switch($var) {
			case 'G': $var = &$_GET; break;
			case 'P': $var = &$_POST; break;
			case 'C': $var = &$_COOKIE; break;
			case 'R': $var = &$_REQUEST; break;
		}
		return isset($var[$k]) ? $var[$k] : NULL;
	}
	function api_input($data) {
		$s = urlencode($data.'&agent='.md5($_SERVER['HTTP_USER_AGENT'])."&time=".time());
		return $s;
	}
	function getavatarflash($uid, $type = 'virtual', $returnhtml = 1) {
		$uid = intval($uid);
		$input = api_input("uid=$uid");
		$avatarflash = MiscUrl.DIR.'camera.swf?inajax=1&appid=1&input='.$input.'&agent='.
		md5($_SERVER['HTTP_USER_AGENT']).'&ucapi='.
		urlencode(str_replace('http://', '', MiscUrl.DIR)).'&avatartype='.$type.'&uploadSize=1024';
		if($returnhtml) {
			return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="450" height="253" id="mycamera" align="middle">
				<param name="allowScriptAccess" value="always" />
				<param name="scale" value="exactfit" />
				<param name="wmode" value="transparent" />
				<param name="quality" value="high" />
				<param name="bgcolor" value="#ffffff" />
				<param name="movie" value="'.$avatarflash.'" />
				<param name="menu" value="false" />
				<embed src="'.$avatarflash.'" quality="high" bgcolor="#ffffff" width="450" height="253" name="mycamera" align="middle" allowScriptAccess="always" allowFullScreen="false" scale="exactfit"  wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
			</object>';
		}
	}
	function input($k) {
		return isset($_GET['input'][$k]) ? (is_array($_GET['input'][$k]) ? $_GET['input'][$k] : trim($_GET['input'][$k])) : NULL;
	}

	function init_input($getagent = '') {
		$input = getgpc('input', 'R');
		if($input) {
			$array_input = array();
			parse_str(urldecode($input), $array_input);
			$_GET['input'] = $array_input;
		}
	}
	function onuploadavatar() {
		@header("Expires: 0");
		@header("Cache-Control: private, post-check=0, pre-check=0, max-age=0", FALSE);
		@header("Pragma: no-cache");
		init_input(getgpc('agent', 'G'));
		$uid = input('uid');
		if(empty($uid)) {
			return -1;
		}
		if(empty($_FILES['Filedata'])) {
			return -3;
		}
		list($width, $height, $type, $attr) = getimagesize($_FILES['Filedata']['tmp_name']);
		$imgtype = array(1 => '.gif', 2 => '.jpg', 3 => '.png');
		$filetype = $imgtype[$type];
		if(!$filetype) $filetype = '.jpg';
		$tmpavatar = DATADIR.'upload'.$uid.$filetype;
		file_exists($tmpavatar) && @unlink($tmpavatar);
		
		if(move_uploaded_file($_FILES['Filedata']['tmp_name'], $tmpavatar))
		{
			@unlink($_FILES['Filedata']['tmp_name']);
			list($width, $height, $type, $attr) = getimagesize($tmpavatar);
			if($width < 10 || $height < 10 || $type == 4) {
				@unlink($tmpavatar);
				return -2;
			}
		}
		else{
			@unlink($_FILES['Filedata']['tmp_name']);
			return -4;
		}
		
		$avatarurl = DATAURL.'upload'.$uid.$filetype;
		return $avatarurl;
	}
	function get_avatar($uid, $size = 'big', $type = '') {
		$size = in_array($size, array('big', 'middle', 'small')) ? $size : 'big';
		$uid = abs(intval($uid));
		return "avatar_$uid.jpg";
	}
	function onrectavatar() {
		@header("Expires: 0");
		@header("Cache-Control: private, post-check=0, pre-check=0, max-age=0", FALSE);
		@header("Pragma: no-cache");
		header("Content-type: application/xml; charset=utf-8");
		init_input();
		$uid = input('uid');
		if(empty($uid)) {
			return '<root><message type="error" value="-1" /></root>';
		}

		$middleavatarfile = DATADIR.get_avatar($uid, 'middle');
		$middleavatar = flashdata_decode(getgpc('avatar2', 'P'));
		if(!$middleavatar) {
			return '<root><message type="error" value="-2" /></root>';
		}
		$success = 1;
		$fp = @fopen($middleavatarfile, 'wb');
		@fwrite($fp, $middleavatar);
		@fclose($fp);
		$middleinfo = @getimagesize($middleavatarfile);
		if(!$middleinfo || $middleinfo[2] == 4) {
			file_exists($middleavatarfile) && unlink($middleavatarfile);
			$success = 0;
		} 
		$filetype = '.jpg';
		//删除misc里面的临时文件
		@unlink(DATADIR.'upload'.$uid.$filetype);
		//上传到fastdfs
		if(!empty($middleavatarfile))
		{
			require(dirname(dirname(dirname(dirname(__DIR__)))).'/src/framework/libraries/Fastdfs.php');
				
			//上传到fastdfs目录下
			$fdfs= new fdfs();
			$result=$fdfs->upload_by_filename($middleavatarfile ,2);
			//根据uid存入数据库
			$conf= json_decode(CONF,true);
			if(is_array($conf))
			{
				$conn = mysql_connect($conf['dbhost'], $conf['dbuser'], $conf['dbpwd']);
				if (!$conn)
				{
					die('Could not connect: ' . mysql_error());
				}

				mysql_select_db($conf['dbname'], $conn);
				$member_avatar=$result;
				$sql= "UPDATE shopnc_member SET  member_avatar='$member_avatar' WHERE member_id =$uid";

				mysql_query($sql, $conn);
			}
			//删除临时目录文件
			unlink($middleavatarfile);
		}
		
		if($success) {
			return '<?xml version="1.0" ?><root><face success="1"/></root>';
		} else {
			return '<?xml version="1.0" ?><root><face success="0"/></root>';
		}
	}
	function flashdata_decode($s) {
		$r = '';
		$l = strlen($s);
		for($i=0; $i<$l; $i=$i+2) {
			$k1 = ord($s[$i]) - 48;
			$k1 -= $k1 > 9 ? 7 : 0;
			$k2 = ord($s[$i+1]) - 48;
			$k2 -= $k2 > 9 ? 7 : 0;
			$r .= chr($k1 << 4 | $k2);
		}
		return $r;
	}
	$a = getgpc('a');
	if(in_array($a, array('uploadavatar', 'rectavatar'))) {
		$method = 'on'.$a;
		$data = $method();
		echo $data;
	}
?>