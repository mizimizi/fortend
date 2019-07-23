(function () {
    $("#ajaxSubmit").click(function () {
        var formval1 = $("#parentBranchcode").val(),
            formval2 = $("#branchcode").val(),
            formval3 = $.trim($("#branchname").val()),
            formval4 = $.trim($("#orgfull").val()),
            formval5 = $.trim($("#themonthe").val()),
            formval6 = $.trim($("#ishaveBankCard option:selected").val()),
            formval7 = $.trim($("#type option:selected").val());
        if(formval1 !=="" && formval2 !=="" && formval3!==""  && formval4 !=="" && formval5!==""  && formval6 !=="" && formval7!=="" ){
            var param = $("form").serialize().replace(/\+/g," ");
            $.ajax({
                type: "POST",
                url: window.parent.getApi()+"/org/fullpath/api/save",
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