function showAuDialog(mod)
{
    $.getJSON('index.php?act=login&op=checkLogin', function(data) {
        if (data['code'] == 'error') {
           window.location.href = 'index.php?act=login';
           return;
        } else {
            $(window).resize();
            var obj_addUsers_wrapper = $('.addUsers_wrapper');
            obj_addUsers_wrapper.css({'left':($(window).width() - obj_addUsers_wrapper.width())/2});
            // if (mod == 0) $('.submit_info form')[0].reset();
            if (mod == 0) {
              $('input.member').val('');
              showHint({status: 1});
            }
            $('.success, .fail').hide();
            $('#addUsers, .submit_info').show(300);
        }
    });
}

function closeAuDialog()
{
  // $('.submit_info form')[0].reset();
  // $('.submit_info').show();
  // $('.success, .fail').hide();
  $('#addUsers').hide(300);
}

function submitUsers()
{
  var data_input = '';
  var obj_input = $('#addUsers form input');
  obj_input.each(function(){
    var input_name = $(this).attr('name');
    var input_value = $(this).val();
    data_input += input_name + ':"' + input_value + '",';
  });
  data_input = '{' + data_input + '}';
  data_input = eval("("+ data_input +")");
  if (!checkData(data_input)) return false;
  $.getJSON('index.php?act=add_users&op=save', data_input, function(result) {
    showHint(result);
    result.status = parseInt(result.status);
    if (result.status == 1) {
      // $('.submit_info').hide();
      // $('.fail_why').html(result.msg);
      // $('.fail').show();

      $('.submit_info').hide();
      for(x in data_input){
        $('.success_' + x).html(data_input[x]);
      }
      $('.success').show();
    };
  });
}

function checkData(data)
{
    var check_result = {};
    for(x in data) {
        data[x] = data[x].replace(/(^\s*)|(\s*$)/g, "");
    }
    //检查用户名
    if (data['uname'] == '') {
        check_result = {name: "uname", status: 0, msg: '请填写姓名'};
        showHint(check_result);
        return false;
    } else {
        check_result = {name: "uname", status: 1, msg: ''};
        showHint(check_result);
    };
    //检查手机号
    var tel_len = data['tel'].length;
    var tel_match = data['tel'].match(/^1\d{10}$/);
    if (tel_len != 11 || tel_match == null) {
        check_result = {name: "tel", status: 0, msg: '请填写正确手机号'};
        showHint(check_result);
        return false;
    } else {
        check_result = {name: "tel", status: 1, msg: ''};
        showHint(check_result);
    };
    //检查会员卡号
    var vip_num = parseInt(data['vip']);
    if (data['vip'] != '' && (vip_num < 800001 || vip_num > 805000 || isNaN(data['vip']))) {
        check_result = {name: "vip", status: 0, msg: '请填写正确会员卡号'};
        showHint(check_result);
        return false;
    } else {
        check_result = {name: "vip", status: 1, msg: ''};
        showHint(check_result);
    };

    return true;
}

function showHint(check_result)
{
    if (check_result.status == 1) {
        $('input.member').css({ border:'1px solid #888', background: '#fff' });
        $('.error_tips').hide();
    } else{
        $('input[name="'+ check_result.name +'"]').css({ border:'1px solid red', background: '#fef37f' });
        $('.error_tips').html(check_result.msg);
        $('.error_tips').css('display', 'inline-block');
    };
}

