(function () {
    var optuser =window.parent.optuser;
    $("#ajaxSubmit").click(function () {
        var formval4 = $.trim($("#branchcode").val()),
            formval8 = $("#themonthe").val(),
            formval6 = $.trim($("#info").val()),
            formval7 = $.trim($("#phonenum").val()),
            formval9 = optuser,
           formval10 = $.trim($("#committeecode").val());
        if(formval4 !=="" && formval6 !=="" && formval8!=="" && formval7!=="" && formval9!==""  && formval10!=="" ){
            var param = $("form").serialize().replace(/\+/g," ");
            $.ajax({
                type: "POST",
                url: window.parent.getApi()+"/org/standard/api/withdraw",
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