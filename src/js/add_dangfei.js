(function () {
    $("#ajaxSubmit").click(function () {
        var formval1 = $("#committeename").val(),
            formval2 = $("#committeecode").val(),
            formval3 = $.trim($("#branchname").val()),
            formval4 = $.trim($("#branchcode").val()),
            formval5 = $.trim($("#username").val()),
            formval6 = $.trim($("#phonenum").val()),
            formval7 = $.trim($("#idnum").val()),
            formval8 = $("#themonthe").val(),
           formval9 = $("#canpayflag option:selected").val(),
           formval10 = $.trim($("#bzmsg").val());
        if(formval1 !=="" && formval2 !=="" && formval3!==""  && formval4 !=="" && formval5!==""  && formval6 !=="" && formval7!==""  && formval8!==""  && formval9!==""  && formval10!=="" ){
            if(!(/^1[3456789]\d{9}$/.test(formval6))){
                layer.msg('请输入正确的手机号查询', {
                    time: 1000,
                });
                return false;
            }
            if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(formval7))){
                layer.msg('请输入正确的身份证号查询', {
                    time: 1000,
                });
                return false;
            }
            var param = $("form").serialize().replace(/\+/g," ");
            $.ajax({
                type: "POST",
                url: window.parent.getApi()+"/dangfei/detail/api/addZeroFee",
                cache: false, //禁用缓存
                data: param, //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //异常判断与处理
                    if (result.status!==1) {
                        layer.msg(result.message, {
                            time: 1000,
                        });
                        return;
                    }
                    layer.open({
                        title: '添加',
                        content: '添加成功！'
                    });
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    layer.msg("请求失败", {
                        time: 1000,
                    });
                }
        
            });
      
            
        }else{
            layer.msg('请添全部信息', {
                time: 3000,
            });
        }
        
    });
})();