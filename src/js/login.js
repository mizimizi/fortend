(function () {
    var apiUrl = "http://127.0.0.1:3456/Login/login";
    $(".loginbtn").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        console.log(username!=="",password!=="");
        if(username!==""&&password!==""){
            $.ajax({
                type: "POST",
                url: apiUrl,
                cache: false, //禁用缓存
                data: {"username":username,"password":password}, //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //异常判断与处理
                    if (result.status!==1) {
                        alert(result.message);
                    }
                    window.location.href ="/views/index.html?optuser="+result.data.username;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    layer.msg("请求失败", {
                        time: 1000,
                    });
                }
        
            });
        }else{
            alert("请输入用户名和密码");
        }
    });
})();